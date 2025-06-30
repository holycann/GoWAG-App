import React, { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Copy, Eye, EyeOff } from "lucide-react"

interface ApiKey {
  id: string
  name: string
  prefix: string
  key: string
  created: string
  lastUsed: string | null
  expiry: string
  status: "active" | "expiring-soon" | "expired"
  permissions: string[]
}

interface ApiKeysTableProps {
  keys: ApiKey[]
  onCopyKey?: (keyId: string) => void
  onRevokeKey?: (keyId: string) => void
  onRegenerateKey?: (keyId: string) => void
}

export function ApiKeysTable({ 
  keys, 
  onCopyKey, 
  onRevokeKey, 
  onRegenerateKey 
}: ApiKeysTableProps) {
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({})

  const toggleKeyVisibility = (keyId: string) => {
    setVisibleKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }))
  }
  
  const handleCopyKey = (keyId: string) => {
    if (onCopyKey) {
      onCopyKey(keyId)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Never"
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-600">Active</Badge>
      case "expiring-soon":
        return <Badge className="bg-amber-500">Expiring Soon</Badge>
      case "expired":
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>API Key</TableHead>
            <TableHead>Permissions</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Used</TableHead>
            <TableHead>Expires</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {keys.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No API keys found
              </TableCell>
            </TableRow>
          ) : (
            keys.map((apiKey) => (
              <TableRow key={apiKey.id}>
                <TableCell className="font-medium">{apiKey.name}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-sm">
                      {apiKey.prefix}
                      {visibleKeys[apiKey.id] 
                        ? apiKey.key.replace(/•+/, "abcdefghijklmnopqrstuvwx") 
                        : apiKey.key}
                    </span>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => toggleKeyVisibility(apiKey.id)}
                    >
                      {visibleKeys[apiKey.id] ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleCopyKey(apiKey.id)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {apiKey.permissions.map((perm, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{formatDate(apiKey.created)}</TableCell>
                <TableCell>{formatDate(apiKey.lastUsed)}</TableCell>
                <TableCell>{formatDate(apiKey.expiry)}</TableCell>
                <TableCell>{getStatusBadge(apiKey.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => onRegenerateKey?.(apiKey.id)}
                    >
                      Regenerate
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => onRevokeKey?.(apiKey.id)}
                    >
                      Revoke
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
} 