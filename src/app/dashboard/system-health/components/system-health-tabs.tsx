import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ServiceStatusCard } from "./service-status-card"
import { ResourceChart } from "./resource-chart"
import { DeviceCard } from "./device-card"
import { IncidentCard } from "./incident-card"
import { LucideIcon } from "lucide-react"

interface Service {
  name: string
  status: "operational" | "degraded" | "outage"
  description: string
  icon: LucideIcon
  uptime: string
  lastIncident: string
}

interface Device {
  id: string
  name: string
  phoneNumber: string
  status: "connected" | "disconnected" | "connecting"
  battery?: number
  batteryUnknown?: boolean
  messagesPerDay: number
  connectedSince?: string
  lastSeen?: string
  isMainDevice?: boolean
}

interface Incident {
  id: string
  title: string
  description: string
  startedAt: string
  severity: "warning" | "critical"
}

interface ResourceData {
  cpuData: { time: string; usage: number }[]
  memoryData: { time: string; usage: number }[]
  diskData: { time: string; usage: number }[]
  networkData: { time: string; inbound: number; outbound: number }[]
}

interface SystemHealthTabsProps {
  services: Service[]
  devices: Device[]
  incidents: Incident[]
  resourceData: ResourceData
  logs?: { timestamp: string; level: string; message: string }[]
  onViewServiceDetails: (serviceId: string) => void
  onReconnectDevice: (deviceId: string) => void
  onDisconnectDevice: (deviceId: string) => void
  onViewDeviceDetails: (deviceId: string) => void
  onViewIncidentDetails: (incidentId: string) => void
}

export function SystemHealthTabs({
  services,
  devices,
  incidents,
  resourceData,
  logs = [],
  onViewServiceDetails,
  onReconnectDevice,
  onDisconnectDevice,
  onViewDeviceDetails,
  onViewIncidentDetails
}: SystemHealthTabsProps) {
  return (
    <Tabs defaultValue="services">
      <TabsList className="mb-4">
        <TabsTrigger value="services">Services</TabsTrigger>
        <TabsTrigger value="resources">System Resources</TabsTrigger>
        <TabsTrigger value="devices">WhatsApp Devices</TabsTrigger>
        <TabsTrigger value="logs">System Logs</TabsTrigger>
      </TabsList>

      <TabsContent value="services">
        <Card>
          <CardHeader>
            <CardTitle>Service Status</CardTitle>
            <CardDescription>
              Status of critical system services and components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {services.map((service, index) => (
                  <ServiceStatusCard
                    key={index}
                    name={service.name}
                    status={service.status}
                    description={service.description}
                    icon={service.icon}
                    uptime={service.uptime}
                    lastIncident={service.lastIncident}
                    onViewDetails={() => onViewServiceDetails(service.name)}
                  />
                ))}
              </div>

              {incidents.length > 0 && (
                <div className="mt-4">
                  <h3 className="font-medium mb-2">Incident Details</h3>
                  {incidents.map((incident, index) => (
                    <IncidentCard
                      key={index}
                      title={incident.title}
                      description={incident.description}
                      startedAt={incident.startedAt}
                      severity={incident.severity}
                      onViewDetails={() => onViewIncidentDetails(incident.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="resources">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <ResourceChart
            title="CPU Usage"
            description="Processor utilization over time"
            data={resourceData.cpuData}
            dataKey="CPU"
            color="#3b82f6"
            unit="%"
          />
          
          <ResourceChart
            title="Memory Usage"
            description="RAM utilization over time"
            data={resourceData.memoryData}
            dataKey="Memory"
            color="#10b981"
            unit="%"
          />

          <ResourceChart
            title="Disk Usage"
            description="Storage utilization over time"
            data={resourceData.diskData}
            dataKey="Disk"
            color="#6366f1"
            unit="%"
          />

          <Card className="col-span-1 md:col-span-4">
            <CardHeader>
              <CardTitle>Network Traffic</CardTitle>
              <CardDescription>Inbound and outbound network traffic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResourceChart
                  title=""
                  description=""
                  data={resourceData.networkData}
                  dataKey="Network"
                  color="#f59e0b"
                  unit=" KB/s"
                  height={250}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      <TabsContent value="devices">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              name={device.name}
              phoneNumber={device.phoneNumber}
              status={device.status}
              battery={device.battery}
              batteryUnknown={device.batteryUnknown}
              messagesPerDay={device.messagesPerDay}
              connectedSince={device.connectedSince}
              lastSeen={device.lastSeen}
              isMainDevice={device.isMainDevice}
              onReconnect={() => onReconnectDevice(device.id)}
              onDisconnect={() => onDisconnectDevice(device.id)}
              onViewDetails={() => onViewDeviceDetails(device.id)}
            />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="logs">
        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>
              Recent system logs and error messages
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2 font-medium text-sm">Timestamp</th>
                    <th className="text-left py-2 px-2 font-medium text-sm">Level</th>
                    <th className="text-left py-2 px-2 font-medium text-sm">Message</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4 text-muted-foreground">
                        No logs available
                      </td>
                    </tr>
                  ) : (
                    logs.map((log, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 px-2 text-sm font-mono">{log.timestamp}</td>
                        <td className="py-2 px-2">
                          <span className={`
                            inline-block px-2 py-0.5 rounded text-xs
                            ${log.level === 'ERROR' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' : ''}
                            ${log.level === 'WARN' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' : ''}
                            ${log.level === 'INFO' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : ''}
                            ${log.level === 'DEBUG' ? 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300' : ''}
                          `}>
                            {log.level}
                          </span>
                        </td>
                        <td className="py-2 px-2 text-sm">{log.message}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 