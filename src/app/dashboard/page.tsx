"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatCard } from "./components/stat-card"
import { QRCard } from "./components/qr-card"
import { ArrowUpCircle, ArrowDownCircle, UserCircle, Fingerprint } from "lucide-react"
import { useAuth } from "@/context/auth-context"

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="flex-1 space-y-6 p-4 md:p-6 lg:p-8">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="rounded-xl shadow-md lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-700">Account Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center">
              <UserCircle className="h-5 w-5 text-brandDarkBlue mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium text-gray-800">{user?.email}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Fingerprint className="h-5 w-5 text-brandDarkBlue mr-3" />
              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="font-medium text-gray-800">{user?.id}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <QRCard initialIsConnected={false} />

        <StatCard title="Messages Sent Today" value="150" icon={ArrowUpCircle} description="20% more than yesterday" />
        <StatCard title="Messages Received Today" value="80" icon={ArrowDownCircle} description="5 new conversations" />
      </div>

      {/* Placeholder for more content */}
      <div className="grid gap-6">
        <Card className="rounded-xl shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-gray-700">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">No recent activity to display.</p>
            {/* In a real app, this would be a list or table of recent messages/events */}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
