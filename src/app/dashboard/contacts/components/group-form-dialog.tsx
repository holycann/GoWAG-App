"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ContactGroup } from "./contact-form-dialog";
import { Contact } from "./contact-list";

interface GroupFormDialogProps {
  group?: ContactGroup;
  contacts: Contact[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (group: Partial<ContactGroup>, selectedContactIds: string[]) => void;
  trigger?: React.ReactNode;
}

export function GroupFormDialog({
  group,
  contacts,
  open,
  onOpenChange,
  onSave,
  trigger,
}: GroupFormDialogProps) {
  const [formData, setFormData] = React.useState<Partial<ContactGroup>>(
    group || {
      name: "",
      description: "",
    }
  );

  const [selectedContactIds, setSelectedContactIds] = React.useState<string[]>([]);
  const [showAllContacts, setShowAllContacts] = React.useState(false);
  
  React.useEffect(() => {
    if (group) {
      setFormData(group);
      // In a real app, you would fetch the contacts in this group
      setSelectedContactIds([]);
    } else {
      setFormData({
        name: "",
        description: "",
      });
      setSelectedContactIds([]);
    }
  }, [group, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleContactToggle = (contactId: string, checked: boolean) => {
    if (checked) {
      setSelectedContactIds((prev) => [...prev, contactId]);
    } else {
      setSelectedContactIds((prev) => prev.filter((id) => id !== contactId));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData, selectedContactIds);
  };

  const title = group ? "Edit Contact Group" : "Create Contact Group";
  const description = group
    ? "Edit group information"
    : "Create a new group to organize your contacts";
  
  const displayedContacts = showAllContacts ? contacts : contacts.slice(0, 3);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div>
              <Label htmlFor="name">Group Name</Label>
              <Input 
                id="name" 
                placeholder="e.g., VIP Customers" 
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Input 
                id="description" 
                placeholder="Group description" 
                value={formData.description || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <Label>Add Contacts</Label>
              <div className="bg-muted p-2 rounded-md mt-1 max-h-[200px] overflow-y-auto">
                {displayedContacts.map((contact) => (
                  <div
                    key={contact.id}
                    className="flex items-center justify-between py-2 px-1 border-b last:border-0"
                  >
                    <div className="flex items-center">
                      <Checkbox 
                        id={`contact-${contact.id}`} 
                        checked={selectedContactIds.includes(contact.id)}
                        onCheckedChange={(checked) => 
                          handleContactToggle(contact.id, checked as boolean)
                        }
                      />
                      <Label
                        htmlFor={`contact-${contact.id}`}
                        className="ml-2 flex items-center gap-2 cursor-pointer"
                      >
                        <Avatar className="h-7 w-7">
                          <AvatarFallback>
                            {contact.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-sm font-medium">{contact.name}</div>
                          <div className="text-xs text-muted-foreground">{contact.phoneNumber}</div>
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
                {contacts.length > 3 && !showAllContacts && (
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="mt-2"
                    onClick={() => setShowAllContacts(true)}
                  >
                    Show more contacts
                  </Button>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {group ? "Save Changes" : "Create Group"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 