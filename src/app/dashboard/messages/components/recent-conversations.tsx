import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Users } from "lucide-react"

interface Contact {
  id: string
  name: string
  phoneNumber: string
  initials: string
}

interface RecentConversationsProps {
  contacts: Contact[]
  onSelectContact: (contact: Contact) => void
  onViewAllContacts: () => void
}

export function RecentConversations({ contacts, onSelectContact, onViewAllContacts }: RecentConversationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Conversations</CardTitle>
        <CardDescription>
          Recent contacts to quickly send messages
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No recent conversations
          </div>
        ) : (
          contacts.map((contact) => (
            <div 
              key={contact.id} 
              className="flex items-center p-2 hover:bg-muted rounded-md cursor-pointer"
              onClick={() => onSelectContact(contact)}
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center mr-3">
                <span className="text-primary font-medium">{contact.initials}</span>
              </div>
              <div className="flex-1">
                <div className="font-medium">{contact.name}</div>
                <div className="text-sm text-muted-foreground">{contact.phoneNumber}</div>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectContact(contact)
                }}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          ))
        )}
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onViewAllContacts}>
          <Users className="mr-2 h-4 w-4" /> View All Contacts
        </Button>
      </CardFooter>
    </Card>
  )
} 