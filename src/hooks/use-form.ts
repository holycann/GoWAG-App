import { useState, useCallback, ChangeEvent, FormEvent } from 'react';

type ValidationFunction<T> = (values: T) => Partial<Record<keyof T, string>>;

interface UseFormOptions<T> {
  initialValues: T;
  onSubmit: (values: T) => void | Promise<void>;
  validate?: ValidationFunction<T>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
  validate
}: UseFormOptions<T>) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  // Handle input change
  const handleChange = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    // Handle different input types
    const finalValue = type === 'checkbox' 
      ? (e.target as HTMLInputElement).checked 
      : value;
    
    setValues((prev) => ({
      ...prev,
      [name]: finalValue
    }));
    
    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
  }, []);
  
  // Handle blur event to validate field
  const handleBlur = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name } = e.target;
    
    // Mark field as touched
    setTouched((prev) => ({
      ...prev,
      [name]: true
    }));
    
    // Validate field if validation function is provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prev) => ({
        ...prev,
        [name]: validationErrors[name as keyof T] || ''
      }));
    }
  }, [values, validate]);
  
  // Set field value programmatically
  const setFieldValue = useCallback((name: keyof T, value: any) => {
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  // Set field error programmatically
  const setFieldError = useCallback((name: keyof T, error: string) => {
    setErrors((prev) => ({
      ...prev,
      [name]: error
    }));
  }, []);
  
  // Reset form to initial values
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
  }, [initialValues]);
  
  // Handle form submission
  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate all fields if validation function is provided
    if (validate) {
      const validationErrors = validate(values);
      setErrors(validationErrors);
      
      // Mark all fields as touched
      const allTouched = Object.keys(values).reduce((acc, key) => {
        acc[key as keyof T] = true;
        return acc;
      }, {} as Record<keyof T, boolean>);
      
      setTouched(allTouched);
      
      // If there are validation errors, don't submit
      if (Object.keys(validationErrors).length > 0) {
        return;
      }
    }
    
    try {
      setIsSubmitting(true);
      await onSubmit(values);
    } finally {
      setIsSubmitting(false);
    }
  }, [values, validate, onSubmit]);
  
  return {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    setFieldError,
    resetForm
  };
} 