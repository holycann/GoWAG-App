"use client"

import React from "react"
import { ApiKeysHeader, ApiKeysTabs, SecurityAlert, ApiUsageCard } from "./components"

// Sample API keys
const apiKeys = [
  {
    id: "key_12345",
    name: "Production API Key",
    prefix: "pk_live_",
    key: "••••••••••••••••••••••1234",
    created: "2023-05-15T10:30:00",
    lastUsed: "2023-06-27T08:15:10",
    expiry: "2024-05-15T10:30:00",
    status: "active",
    permissions: ["messages.read", "messages.send", "sessions.read", "sessions.manage"],
  },
  {
    id: "key_67890",
    name: "Development API Key",
    prefix: "pk_test_",
    key: "••••••••••••••••••••••5678",
    created: "2023-05-20T14:45:00",
    lastUsed: "2023-06-26T16:22:30",
    expiry: "2024-05-20T14:45:00",
    status: "active",
    permissions: ["messages.read", "messages.send", "sessions.read"],
  },
  {
    id: "key_24680",
    name: "Marketing Integration",
    prefix: "pk_live_",
    key: "••••••••••••••••••••••9012",
    created: "2023-04-10T09:15:00",
    lastUsed: "2023-06-15T11:30:45",
    expiry: "2023-12-31T23:59:59",
    status: "active",
    permissions: ["messages.send"],
  },
  {
    id: "key_13579",
    name: "Legacy Integration",
    prefix: "pk_live_",
    key: "••••••••••••••••••••••3456",
    created: "2022-11-05T08:20:00",
    lastUsed: "2023-05-30T14:25:10",
    expiry: "2023-07-01T00:00:00",
    status: "expiring-soon",
    permissions: ["messages.read", "messages.send", "sessions.read", "sessions.manage", "webhooks.manage"],
  },
  {
    id: "key_97531",
    name: "Temporary Access",
    prefix: "pk_test_",
    key: "••••••••••••••••••••••7890",
    created: "2023-06-01T16:40:00",
    lastUsed: null,
    expiry: "2023-06-15T16:40:00",
    status: "expired",
    permissions: ["messages.read"],
  },
];

// API usage examples
const apiUsageExamples = [
  {
    title: "Authentication",
    description: "Use your API key to authenticate requests to the WhatsApp Gateway API. Include your API key in the Authorization header of your requests.",
    code: "Authorization: Bearer YOUR_API_KEY"
  },
  {
    title: "Example Request",
    description: "Here's a simple example of sending a message using the API:",
    code: `fetch('https://api.gowag.app/v1/messages', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    session_id: 'primary',
    to: '+6281234567890',
    text: 'Hello from the WhatsApp API!'
  })
})`
  },
  {
    title: "Rate Limiting",
    description: "API requests are rate limited based on your subscription plan. Check the response headers for your current rate limit status.",
    code: `X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1625097600`
  }
];

export default function ApiKeysPage() {
  const handleCopyKey = (keyId: string) => {
    console.log(`Copying key: ${keyId}`)
    // Implementation would copy the key to clipboard
  }

  const handleRevokeKey = (keyId: string) => {
    console.log(`Revoking key: ${keyId}`)
    // Implementation would revoke the key
  }

  const handleRegenerateKey = (keyId: string) => {
    console.log(`Regenerating key: ${keyId}`)
    // Implementation would regenerate the key
  }

  const handleGenerateKey = (data: any) => {
    console.log("Generating new key:", data)
    // Implementation would generate a new key
  }

  return (
    <div className="container mx-auto p-6">
      <ApiKeysHeader 
        title="API Keys" 
        description="Kelola API keys untuk akses eksternal ke Gateway"
        onGenerateKey={handleGenerateKey} 
      />

      <SecurityAlert
        title="Security Notice"
        description="API keys provide full access to your WhatsApp Gateway account. Keep them secure and don't expose them in client-side code or public repositories."
      />

      <ApiKeysTabs 
        keys={apiKeys}
        onCopyKey={handleCopyKey}
        onRevokeKey={handleRevokeKey}
        onRegenerateKey={handleRegenerateKey}
      />

      <ApiUsageCard
        title="API Usage"
        description="How to use your API keys to access the WhatsApp Gateway"
        examples={apiUsageExamples}
      />
    </div>
  )
} 