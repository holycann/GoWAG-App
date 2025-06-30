import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { WebhookTable } from "./webhook-table"
import { WebhookForm } from "./webhook-form"
import { WebhookLogs } from "./webhook-logs"
import { WebhookSecurity } from "./webhook-security"
import { WebhookTester } from "./webhook-tester"

interface Webhook {
  id: string
  name: string
  url: string
  events: string[]
  status: 'active' | 'paused' | 'disabled'
}

interface WebhookLog {
  id: string
  timestamp: string
  event: string
  webhook: string
  status: 'success' | 'failed' | 'pending'
  responseCode?: number
  responseTime?: number
}

interface WebhookTabsProps {
  webhooks: Webhook[]
  logs: WebhookLog[]
  selectedWebhook?: Webhook | null
  showForm?: boolean
  onEditWebhook?: (id: string) => void
  onEnableDisableWebhook?: (id: string, currentStatus: 'active' | 'paused' | 'disabled') => void
  onSaveWebhook?: (data: any) => void
  onCancelWebhook?: () => void
  onRefreshLogs?: () => void
  onFilterLogs?: (status: string) => void
  onViewLogDetails?: (id: string) => void
  onRetryDelivery?: (id: string) => void
  onRegenerateSecret?: () => void
  onTestWebhook?: (data: any) => void
}

export function WebhookTabs({
  webhooks,
  logs,
  selectedWebhook,
  showForm = false,
  onEditWebhook,
  onEnableDisableWebhook,
  onSaveWebhook,
  onCancelWebhook,
  onRefreshLogs,
  onFilterLogs,
  onViewLogDetails,
  onRetryDelivery,
  onRegenerateSecret,
  onTestWebhook
}: WebhookTabsProps) {
  return (
    <Tabs defaultValue="webhooks">
      <TabsList className="mb-4">
        <TabsTrigger value="webhooks">Webhook Endpoints</TabsTrigger>
        <TabsTrigger value="logs">Delivery Logs</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="test">Test Webhook</TabsTrigger>
      </TabsList>
      
      <TabsContent value="webhooks">
        <div className="space-y-6">
          <WebhookTable
            title="Active Webhook Endpoints"
            description="Notifications will be sent to these URLs when events occur"
            webhooks={webhooks}
            onEdit={onEditWebhook}
            onEnableDisable={onEnableDisableWebhook}
          />
          
          {showForm && (
            <WebhookForm
              initialData={selectedWebhook || undefined}
              onSave={onSaveWebhook}
              onCancel={onCancelWebhook}
            />
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="logs">
        <WebhookLogs
          logs={logs}
          onRefresh={onRefreshLogs}
          onFilterChange={onFilterLogs}
          onViewDetails={onViewLogDetails}
          onRetry={onRetryDelivery}
        />
      </TabsContent>
      
      <TabsContent value="security">
        <WebhookSecurity onRegenerateSecret={onRegenerateSecret} />
      </TabsContent>
      
      <TabsContent value="test">
        <WebhookTester onTest={onTestWebhook} />
      </TabsContent>
    </Tabs>
  )
} 