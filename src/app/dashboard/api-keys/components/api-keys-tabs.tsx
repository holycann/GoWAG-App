import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ApiKeysTable } from "./api-keys-table"

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

interface ApiKeysTabsProps {
  keys: ApiKey[]
  onCopyKey: (keyId: string) => void
  onRevokeKey: (keyId: string) => void
  onRegenerateKey: (keyId: string) => void
}

export function ApiKeysTabs({ 
  keys, 
  onCopyKey, 
  onRevokeKey, 
  onRegenerateKey 
}: ApiKeysTabsProps) {
  const liveKeys = keys.filter(key => key.prefix.includes('live'))
  const testKeys = keys.filter(key => key.prefix.includes('test'))
  
  return (
    <Tabs defaultValue="all" className="mb-6">
      <TabsList>
        <TabsTrigger value="all">All Keys</TabsTrigger>
        <TabsTrigger value="live">Live</TabsTrigger>
        <TabsTrigger value="test">Test</TabsTrigger>
      </TabsList>
      
      <TabsContent value="all" className="mt-4">
        <ApiKeysTable 
          keys={keys} 
          onCopyKey={onCopyKey}
          onRevokeKey={onRevokeKey}
          onRegenerateKey={onRegenerateKey}
        />
      </TabsContent>
      
      <TabsContent value="live" className="mt-4">
        <ApiKeysTable 
          keys={liveKeys} 
          onCopyKey={onCopyKey}
          onRevokeKey={onRevokeKey}
          onRegenerateKey={onRegenerateKey}
        />
      </TabsContent>
      
      <TabsContent value="test" className="mt-4">
        <ApiKeysTable 
          keys={testKeys} 
          onCopyKey={onCopyKey}
          onRevokeKey={onRevokeKey}
          onRegenerateKey={onRegenerateKey}
        />
      </TabsContent>
    </Tabs>
  )
} 