"use client"

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GroupsGrid, GroupsTable, GroupsHeader, Group } from "./components";

// Sample WhatsApp groups data
const waGroups: Group[] = [
  {
    id: "group_1",
    name: "Marketing Team",
    description: "Group for marketing team discussions",
    avatar: "/placeholder.jpg",
    memberCount: 18,
    isAdmin: true,
    status: "active",
    lastActivity: "2 hours ago",
    participants: [
      { name: "John Doe", isAdmin: true },
      { name: "Jane Smith", isAdmin: false },
      { name: "Mike Johnson", isAdmin: false }
    ]
  },
  {
    id: "group_2",
    name: "Customer Support",
    description: "Support group for customer queries",
    avatar: "/placeholder-logo.png",
    memberCount: 12,
    isAdmin: true,
    status: "active",
    lastActivity: "1 hour ago",
    participants: [
      { name: "Sarah Williams", isAdmin: true },
      { name: "Tom Brown", isAdmin: false }
    ]
  },
  {
    id: "group_3",
    name: "Product Development",
    description: "Discussion group for product team",
    avatar: "/placeholder-user.jpg",
    memberCount: 15,
    isAdmin: false,
    status: "active",
    lastActivity: "3 hours ago",
    participants: [
      { name: "Alex Lee", isAdmin: true },
      { name: "Emma Davis", isAdmin: false }
    ]
  },
  {
    id: "group_4",
    name: "Sales Team",
    description: "Sales team coordination group",
    avatar: "/placeholder-logo.svg",
    memberCount: 8,
    isAdmin: true,
    status: "active",
    lastActivity: "30 mins ago",
    participants: [
      { name: "David Wilson", isAdmin: true }
    ]
  },
  {
    id: "group_5",
    name: "Tech Community",
    description: "General technology discussion group",
    avatar: "/placeholder.jpg",
    memberCount: 156,
    isAdmin: false,
    status: "active",
    lastActivity: "1 day ago",
    participants: [
      { name: "Chris Taylor", isAdmin: true },
      { name: "Lisa Martinez", isAdmin: false }
    ]
  }
];

export default function GroupsPage() {
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  
  const filteredGroups = searchQuery
    ? waGroups.filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : waGroups;

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleRefresh = () => {
    // Implement refresh logic
    console.log("Refreshing groups...");
  };

  return (
    <div className="container mx-auto p-6">
      <GroupsHeader
        title="WhatsApp Groups"
        description="Manage your WhatsApp groups and participants"
        onSearch={handleSearch}
        onRefresh={handleRefresh}
      />

      <Tabs defaultValue="all" className="mb-6">
        <TabsList>
          <TabsTrigger value="all">All Groups</TabsTrigger>
          <TabsTrigger value="admin">Groups I Admin</TabsTrigger>
          <TabsTrigger value="member">Groups I'm In</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <GroupsGrid groups={filteredGroups} />
        </TabsContent>

        <TabsContent value="admin" className="mt-4">
          <GroupsGrid groups={filteredGroups.filter(group => group.isAdmin)} />
        </TabsContent>

        <TabsContent value="member" className="mt-4">
          <GroupsGrid groups={filteredGroups.filter(group => !group.isAdmin)} />
        </TabsContent>
      </Tabs>

      <GroupsTable groups={filteredGroups} />
    </div>
  );
} 