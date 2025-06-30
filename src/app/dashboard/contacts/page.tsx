"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, UserPlus, Upload, Filter, Download } from "lucide-react";
import { PageHeader } from "../components/page-header";
import { 
  ContactList, 
  ContactFormDialog, 
  ImportContactsDialog, 
  ContactGroups, 
  GroupFormDialog,
  Contact,
  ContactGroup
} from "./components";

// Sample contacts data
const contacts: Contact[] = [
  {
    id: "contact_1",
    name: "Ahmad Setiawan",
    phoneNumber: "+62 812-3456-7890",
    email: "ahmad@example.com",
    tags: ["customer", "priority"],
    createdAt: "2023-05-15T10:30:00",
    lastContactedAt: "2023-06-26T14:22:10",
    notes: "Frequent customer, prefers to be contacted in the morning",
    avatar: "/placeholder-user.jpg",
  },
  {
    id: "contact_2",
    name: "Dewi Lestari",
    phoneNumber: "+62 813-9876-5432",
    email: "dewi@example.com",
    tags: ["customer"],
    createdAt: "2023-05-20T14:45:00",
    lastContactedAt: "2023-06-25T11:15:30",
    notes: "New customer, interested in premium products",
    avatar: null,
  },
  {
    id: "contact_3",
    name: "Budi Santoso",
    phoneNumber: "+62 877-1234-5678",
    email: "budi@example.com",
    tags: ["prospect"],
    createdAt: "2023-04-10T09:15:00",
    lastContactedAt: "2023-06-20T13:45:22",
    notes: "Requested product catalog",
    avatar: null,
  },
  {
    id: "contact_4",
    name: "Siti Nuraini",
    phoneNumber: "+62 856-7890-1234",
    email: "siti@example.com",
    tags: ["customer", "VIP"],
    createdAt: "2023-03-05T11:30:00",
    lastContactedAt: "2023-06-27T10:05:18",
    notes: "Premium customer, always purchase in bulk",
    avatar: null,
  },
  {
    id: "contact_5",
    name: "Ricky Hartono",
    phoneNumber: "+62 821-0987-6543",
    email: "ricky@example.com",
    tags: ["lead"],
    createdAt: "2023-06-01T16:40:00",
    lastContactedAt: null,
    notes: "Marketing campaign lead",
    avatar: null,
  },
  {
    id: "contact_6",
    name: "Lina Wijaya",
    phoneNumber: "+62 878-6543-2109",
    email: "lina@example.com",
    tags: ["customer", "inactive"],
    createdAt: "2023-02-15T13:20:00",
    lastContactedAt: "2023-04-10T09:30:45",
    notes: "Hasn't made a purchase in 2+ months",
    avatar: null,
  },
];

// Sample contact groups
const contactGroups: ContactGroup[] = [
  {
    id: "group_1",
    name: "All Customers",
    description: "All active customers",
    count: 48,
    createdAt: "2023-03-10T09:00:00",
    updatedAt: "2023-06-27T10:15:30",
  },
  {
    id: "group_2",
    name: "VIP Customers",
    description: "High-value customers",
    count: 12,
    createdAt: "2023-03-15T11:30:00",
    updatedAt: "2023-06-25T14:40:22",
  },
  {
    id: "group_3",
    name: "New Leads",
    description: "Recent marketing leads",
    count: 31,
    createdAt: "2023-06-01T08:45:00",
    updatedAt: "2023-06-26T16:20:15",
  },
  {
    id: "group_4",
    name: "Newsletter Subscribers",
    description: "Subscribers for weekly newsletter",
    count: 156,
    createdAt: "2023-01-20T15:10:00",
    updatedAt: "2023-06-27T08:30:40",
  },
  {
    id: "group_5",
    name: "Inactive Customers",
    description: "Customers with no activity in 60+ days",
    count: 27,
    createdAt: "2023-04-05T10:25:00",
    updatedAt: "2023-06-20T11:15:30",
  },
];

export default function ContactsPage() {
  const [activeTab, setActiveTab] = React.useState("contacts");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState("all");
  const [contactFormOpen, setContactFormOpen] = React.useState(false);
  const [importDialogOpen, setImportDialogOpen] = React.useState(false);
  const [groupFormOpen, setGroupFormOpen] = React.useState(false);
  const [editingContact, setEditingContact] = React.useState<Contact | undefined>(undefined);
  const [editingGroup, setEditingGroup] = React.useState<ContactGroup | undefined>(undefined);

  const handleAddContact = () => {
    setEditingContact(undefined);
    setContactFormOpen(true);
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setContactFormOpen(true);
  };

  const handleSaveContact = (contact: Partial<Contact>) => {
    console.log("Saving contact:", contact);
    setContactFormOpen(false);
  };

  const handleDeleteContact = (contact: Contact) => {
    console.log("Deleting contact:", contact);
  };

  const handleSendMessage = (contact: Contact) => {
    console.log("Sending message to:", contact);
  };

  const handleManageTags = (contact: Contact) => {
    console.log("Managing tags for:", contact);
  };

  const handleImportContacts = (file: File, hasHeaders: boolean) => {
    console.log("Importing contacts:", file.name, "Has headers:", hasHeaders);
  };

  const handleCreateGroup = () => {
    setEditingGroup(undefined);
    setGroupFormOpen(true);
  };

  const handleEditGroup = (group: ContactGroup) => {
    setEditingGroup(group);
    setGroupFormOpen(true);
  };

  const handleViewGroup = (group: ContactGroup) => {
    console.log("Viewing group:", group);
  };

  const handleDeleteGroup = (group: ContactGroup) => {
    console.log("Deleting group:", group);
  };

  const handleSaveGroup = (group: Partial<ContactGroup>, selectedContactIds: string[]) => {
    console.log("Saving group:", group, "Selected contacts:", selectedContactIds);
    setGroupFormOpen(false);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <PageHeader
          title="Contacts"
          description="Manage contacts and contact groups"
        />
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setImportDialogOpen(true)}>
            <Upload className="mr-2 h-4 w-4" /> Import
          </Button>
          <Button onClick={handleAddContact}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Contact
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList>
          <TabsTrigger value="contacts">Contacts</TabsTrigger>
          <TabsTrigger value="groups">Groups</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="mt-4">
          <Card>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>All Contacts</CardTitle>
                  <CardDescription>
                    Manage and organize your contacts
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Search contacts..." 
                      className="pl-9 w-[250px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                  <Select value={selectedTag} onValueChange={setSelectedTag}>
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="All Tags" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Tags</SelectItem>
                      <SelectItem value="customer">Customer</SelectItem>
                      <SelectItem value="lead">Lead</SelectItem>
                      <SelectItem value="priority">Priority</SelectItem>
                      <SelectItem value="vip">VIP</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <ContactList 
                contacts={contacts}
                onEdit={handleEditContact}
                onDelete={handleDeleteContact}
                onSendMessage={handleSendMessage}
                onManageTags={handleManageTags}
              />
            </CardContent>
            <CardFooter className="p-4 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                Showing {contacts.length} out of 104 contacts
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="mr-1.5 h-3.5 w-3.5" /> Export
                </Button>
                <Select defaultValue="10">
                  <SelectTrigger className="w-[70px]">
                    <SelectValue placeholder="10" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex">
                  <Button variant="outline" size="sm" className="rounded-r-none">
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-l-none">
                    Next
                  </Button>
                </div>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="groups" className="mt-4">
          <ContactGroups
            groups={contactGroups}
            onViewGroup={handleViewGroup}
            onEditGroup={handleEditGroup}
            onDeleteGroup={handleDeleteGroup}
            onCreateGroup={handleCreateGroup}
          />
        </TabsContent>
      </Tabs>

      <ContactFormDialog
        contact={editingContact}
        groups={contactGroups}
        open={contactFormOpen}
        onOpenChange={setContactFormOpen}
        onSave={handleSaveContact}
      />

      <ImportContactsDialog
        open={importDialogOpen}
        onOpenChange={setImportDialogOpen}
        onImport={handleImportContacts}
      />

      <GroupFormDialog
        group={editingGroup}
        contacts={contacts}
        open={groupFormOpen}
        onOpenChange={setGroupFormOpen}
        onSave={handleSaveGroup}
      />
    </div>
  );
} 