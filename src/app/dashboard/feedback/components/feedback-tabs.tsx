import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter } from "lucide-react";
import { FeedbackCard } from "./feedback-card";

interface FeedbackItem {
  id: string;
  type: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  user: {
    name: string;
    email: string;
    avatar: string | null;
  };
  responses: Array<{
    id: string;
    content: string;
    createdAt: string;
    isStaff: boolean;
    user: {
      name: string;
      avatar: string | null;
    };
  }>;
}

interface FeedbackTabsProps {
  feedbackItems: FeedbackItem[];
  onViewFeedback: (id: string) => void;
}

export function FeedbackTabs({ feedbackItems, onViewFeedback }: FeedbackTabsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const filterFeedbackItems = (type: string) => {
    let filtered = feedbackItems;
    
    // Filter by type
    if (type !== "all") {
      filtered = filtered.filter(item => item.type === type);
    }
    
    // Filter by search term
    if (searchTerm) {
      const lowerSearchTerm = searchTerm.toLowerCase();
      filtered = filtered.filter(item => 
        item.title.toLowerCase().includes(lowerSearchTerm) ||
        item.description.toLowerCase().includes(lowerSearchTerm) ||
        item.category.toLowerCase().includes(lowerSearchTerm)
      );
    }
    
    // Sort items
    return [...filtered].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "oldest") {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      } else if (sortBy === "priority") {
        const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder];
      } else if (sortBy === "status") {
        const statusOrder = { open: 0, "in-progress": 1, "under-review": 2, planned: 3, resolved: 4 };
        return statusOrder[a.status as keyof typeof statusOrder] - statusOrder[b.status as keyof typeof statusOrder];
      }
      return 0;
    });
  };

  return (
    <Tabs defaultValue="all" className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <TabsList>
          <TabsTrigger value="all">All Issues</TabsTrigger>
          <TabsTrigger value="bugs">Bugs</TabsTrigger>
          <TabsTrigger value="features">Feature Requests</TabsTrigger>
          <TabsTrigger value="feedback">General Feedback</TabsTrigger>
        </TabsList>
        
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search issues..." 
              className="pl-9 w-[200px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="priority">Priority</SelectItem>
              <SelectItem value="status">Status</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <TabsContent value="all" className="mt-4 grid gap-4">
        {filterFeedbackItems("all").map(item => (
          <FeedbackCard key={item.id} item={item} onView={() => onViewFeedback(item.id)} />
        ))}
      </TabsContent>
      
      <TabsContent value="bugs" className="mt-4 grid gap-4">
        {filterFeedbackItems("bug").map(item => (
          <FeedbackCard key={item.id} item={item} onView={() => onViewFeedback(item.id)} />
        ))}
      </TabsContent>
      
      <TabsContent value="features" className="mt-4 grid gap-4">
        {filterFeedbackItems("feature").map(item => (
          <FeedbackCard key={item.id} item={item} onView={() => onViewFeedback(item.id)} />
        ))}
      </TabsContent>
      
      <TabsContent value="feedback" className="mt-4 grid gap-4">
        {filterFeedbackItems("feedback").map(item => (
          <FeedbackCard key={item.id} item={item} onView={() => onViewFeedback(item.id)} />
        ))}
      </TabsContent>
    </Tabs>
  );
}
