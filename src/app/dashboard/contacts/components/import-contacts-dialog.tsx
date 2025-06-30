"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Download, Upload } from "lucide-react";

interface ImportContactsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onImport: (file: File, hasHeaders: boolean) => void;
  trigger?: React.ReactNode;
}

export function ImportContactsDialog({
  open,
  onOpenChange,
  onImport,
  trigger,
}: ImportContactsDialogProps) {
  const [file, setFile] = React.useState<File | null>(null);
  const [hasHeaders, setHasHeaders] = React.useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onImport(file, hasHeaders);
      onOpenChange(false);
    }
  };

  const handleDownloadTemplate = () => {
    // In a real application, this would download a template file
    console.log("Downloading template file");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import Contacts</DialogTitle>
          <DialogDescription>
            Upload a CSV or Excel file with your contacts
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="file">File</Label>
              <Input 
                id="file" 
                type="file" 
                accept=".csv,.xlsx,.xls" 
                onChange={handleFileChange}
                required
              />
              <p className="text-sm text-muted-foreground">
                Files should be in CSV or XLSX format
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="headers" 
                checked={hasHeaders} 
                onCheckedChange={(checked) => setHasHeaders(checked as boolean)} 
              />
              <Label htmlFor="headers" className="cursor-pointer">File contains headers</Label>
            </div>
            <div>
              <Label>Sample Template</Label>
              <Button 
                type="button"
                variant="link" 
                className="p-0 h-auto text-primary"
                onClick={handleDownloadTemplate}
              >
                <Download className="h-3.5 w-3.5 mr-1" /> Download template
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!file}>
              <Upload className="mr-2 h-4 w-4" /> Upload
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 