"use client"

import React from "react"
import { 
  AutoReplyHeader, 
  AutoReplyTabs 
} from "./components"

// Sample data for auto-reply rules
const activeRules = [
  {
    id: "1",
    name: "Welcome Message",
    keywords: ["hi", "hello", "halo"],
    triggerType: "keyword" as const,
    responsePreview: "Hai, terima kasih telah menghubungi kami. Ada yang bisa kami bantu?",
    session: "All",
    schedule: { type: "24/7" as const },
    active: true
  },
  {
    id: "2",
    name: "Order Status",
    keywords: ["order", "status"],
    triggerType: "keyword" as const,
    responsePreview: "Untuk cek status pesanan Anda, silahkan berikan nomor order Anda",
    session: "Support",
    schedule: { 
      type: "custom" as const,
      time: "08:00-17:00" 
    },
    active: true
  },
  {
    id: "3",
    name: "First Timer",
    triggerType: "first-time" as const,
    responsePreview: "Hai {name}, selamat datang! Ini adalah pesan otomatis.",
    session: "Primary",
    schedule: { type: "24/7" as const },
    active: true
  }
]

const inactiveRules = [
  {
    id: "4",
    name: "Promotional Message",
    keywords: ["promo", "diskon", "discount"],
    triggerType: "keyword" as const,
    responsePreview: "Dapatkan diskon 20% untuk pembelian pertama Anda. Gunakan kode: WELCOME20",
    session: "Marketing",
    schedule: { type: "24/7" as const },
    active: false
  }
]

// Sample analytics data
const analyticsData = {
  rules: [
    { id: "1", name: "Welcome Message", triggers: 145, responses: 142, ratio: 0.98, status: "active" as const },
    { id: "2", name: "Order Status", triggers: 78, responses: 76, ratio: 0.97, status: "active" as const },
    { id: "3", name: "First Timer", triggers: 53, responses: 53, ratio: 1.0, status: "active" as const },
    { id: "4", name: "Promotional Message", triggers: 0, responses: 0, ratio: 0, status: "inactive" as const }
  ],
  dailyStats: [
    { date: "Mon", triggers: 45, responses: 43 },
    { date: "Tue", triggers: 52, responses: 50 },
    { date: "Wed", triggers: 61, responses: 60 },
    { date: "Thu", triggers: 48, responses: 47 },
    { date: "Fri", triggers: 38, responses: 38 },
    { date: "Sat", triggers: 27, responses: 26 },
    { date: "Sun", triggers: 15, responses: 14 }
  ]
}

export default function AutoReplyPage() {
  // Functions to handle user actions
  const handleCreateRule = (data: any) => {
    console.log("Create rule:", data)
  }
  
  const handleEditRule = (id: string) => {
    console.log("Edit rule:", id)
  }
  
  const handleDeleteRule = (id: string) => {
    console.log("Delete rule:", id)
  }

  return (
    <div className="container mx-auto p-6">
      <AutoReplyHeader 
        title="Auto-Reply Rules" 
        description="Kelola aturan auto-reply untuk pesan masuk"
        onCreateRule={handleCreateRule} 
      />
      
      <AutoReplyTabs 
        activeRules={activeRules}
        inactiveRules={inactiveRules}
        analyticsData={analyticsData}
        onEditRule={handleEditRule}
        onDeleteRule={handleDeleteRule}
      />
    </div>
  )
} 