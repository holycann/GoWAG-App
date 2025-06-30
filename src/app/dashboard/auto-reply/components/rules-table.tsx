import React from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Clock } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface Rule {
  id: string
  name: string
  keywords?: string[]
  triggerType: 'keyword' | 'all' | 'first-time'
  responsePreview: string
  session: string
  schedule: {
    type: '24/7' | 'custom'
    time?: string
  }
  active: boolean
}

interface RulesTableProps {
  title: string
  description: string
  rules: Rule[]
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function RulesTable({
  title,
  description,
  rules,
  onEdit,
  onDelete
}: RulesTableProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {rules.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No rules found
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[250px]">Rule Name</TableHead>
                <TableHead>Trigger</TableHead>
                <TableHead>Response Preview</TableHead>
                <TableHead className="w-[100px]">Session</TableHead>
                <TableHead className="w-[100px]">Schedule</TableHead>
                <TableHead className="w-[100px] text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map((rule) => (
                <TableRow key={rule.id}>
                  <TableCell className="font-medium">{rule.name}</TableCell>
                  <TableCell>
                    {rule.triggerType === 'keyword' && rule.keywords?.map((keyword) => (
                      <Badge key={keyword} variant="outline" className="mr-1">{keyword}</Badge>
                    ))}
                    {rule.triggerType === 'first-time' && (
                      <Badge variant="secondary">First message</Badge>
                    )}
                    {rule.triggerType === 'all' && (
                      <Badge variant="secondary">All messages</Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    {rule.responsePreview}
                  </TableCell>
                  <TableCell>
                    <Badge variant={rule.session === "All" ? "default" : "primary"}>
                      {rule.session}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      {rule.schedule.type === '24/7' ? '24/7' : rule.schedule.time}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onEdit?.(rule.id)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onDelete?.(rule.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  )
} 