"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UserPlus } from "lucide-react";
import { Contact } from "./contact-list";

export interface ContactGroup {
  id: string;
  name: string;
  description: string;
  count: number;
  createdAt: string;
  updatedAt: string;
}

interface ContactFormDialogProps {
  contact?: Contact;
  groups: ContactGroup[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (contact: Partial<Contact>) => void;
  trigger?: React.ReactNode;
}

export function ContactFormDialog({
  contact,
  groups,
  open,
  onOpenChange,
  onSave,
  trigger,
}: ContactFormDialogProps) {
  const [formData, setFormData] = React.useState<Partial<Contact>>(
    contact || {
      name: "",
      phoneNumber: "",
      email: "",
      tags: [],
      notes: "",
    }
  );

  const [selectedGroup, setSelectedGroup] = React.useState<string>("none");
  const [tagsInput, setTagsInput] = React.useState<string>(formData.tags?.join(", ") || "");

  React.useEffect(() => {
    if (contact) {
      setFormData(contact);
      setTagsInput(contact.tags.join(", "));
    } else {
      setFormData({
        name: "",
        phoneNumber: "",
        email: "",
        tags: [],
        notes: "",
      });
      setTagsInput("");
    }
  }, [contact, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagsInput(e.target.value);
    const tags = e.target.value.split(",").map((tag) => tag.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const title = contact ? "Edit Contact" : "Add Contact";
  const description = contact
    ? "Edit contact information"
    : "Add a new contact to your database";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Full name" 
                value={formData.name} 
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="phoneNumber">WhatsApp Number</Label>
              <Input 
                id="phoneNumber" 
                placeholder="+62 812-3456-7890" 
                value={formData.phoneNumber} 
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                Include country code with + prefix
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="email">Email Address (Optional)</Label>
              <Input 
                id="email" 
                placeholder="email@example.com" 
                type="email" 
                value={formData.email || ""} 
                onChange={handleChange}
              />
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="tags">Tags</Label>
              <Input 
                id="tags" 
                placeholder="customer, lead, etc..." 
                value={tagsInput} 
                onChange={handleTagsChange}
              />
              <p className="text-xs text-muted-foreground">
                Separate tags with commas
              </p>
            </div>
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Input 
                id="notes" 
                placeholder="Add any notes about this contact" 
                value={formData.notes || ""} 
                onChange={handleChange}
              />
            </div>
            <div>
              <Label htmlFor="group">Add to Group (Optional)</Label>
              <Select value={selectedGroup} onValueChange={setSelectedGroup}>
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None</SelectItem>
                  {groups.map((group) => (
                    <SelectItem key={group.id} value={group.id}>
                      {group.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Contact</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 