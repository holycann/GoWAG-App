"use client"

import React from "react"
import {
  BillingHeader,
  CurrentPlanCard,
  UsageCard,
  BillingTabs
} from "./components"

// Sample billing data
const currentPlan = {
  name: "Business",
  price: 49.99,
  billingCycle: "monthly",
  status: "active",
  nextBillingDate: "2023-08-15T00:00:00",
  features: [
    "Unlimited contacts",
    "50,000 messages/month",
    "All WhatsApp features",
    "5 team members",
    "Advanced analytics",
    "API access",
    "Priority support"
  ]
}

const usage = {
  messages: {
    used: 32500,
    total: 50000,
    percentage: 65
  },
  contacts: {
    used: 3250,
    total: "Unlimited",
    percentage: 0
  },
  storage: {
    used: 8.2,
    total: 20,
    percentage: 41
  },
  teamMembers: {
    used: 4,
    total: 5,
    percentage: 80
  }
}

const invoices = [
  {
    id: "INV-2023-0106",
    date: "2023-07-15T00:00:00",
    amount: 49.99,
    status: "paid",
    paymentMethod: "Credit Card (•••• 4242)"
  },
  {
    id: "INV-2023-0105",
    date: "2023-06-15T00:00:00",
    amount: 49.99,
    status: "paid",
    paymentMethod: "Credit Card (•••• 4242)"
  },
  {
    id: "INV-2023-0104",
    date: "2023-05-15T00:00:00",
    amount: 49.99,
    status: "paid",
    paymentMethod: "Credit Card (•••• 4242)"
  },
  {
    id: "INV-2023-0103",
    date: "2023-04-15T00:00:00",
    amount: 39.99,
    status: "paid",
    paymentMethod: "Credit Card (•••• 4242)"
  },
  {
    id: "INV-2023-0102",
    date: "2023-03-15T00:00:00",
    amount: 39.99,
    status: "paid",
    paymentMethod: "Credit Card (•••• 4242)"
  },
]

const availablePlans = [
  {
    id: "starter",
    name: "Starter",
    price: 19.99,
    billingCycle: "monthly",
    features: [
      "1,000 contacts",
      "10,000 messages/month",
      "Basic WhatsApp features",
      "1 team member",
      "Basic analytics",
      "Email support"
    ],
    popular: false
  },
  {
    id: "professional",
    name: "Professional",
    price: 39.99,
    billingCycle: "monthly",
    features: [
      "10,000 contacts",
      "30,000 messages/month",
      "All WhatsApp features",
      "3 team members",
      "Standard analytics",
      "API access",
      "Email & chat support"
    ],
    popular: true
  },
  {
    id: "business",
    name: "Business",
    price: 49.99,
    billingCycle: "monthly",
    features: [
      "Unlimited contacts",
      "50,000 messages/month",
      "All WhatsApp features",
      "5 team members",
      "Advanced analytics",
      "API access",
      "Priority support"
    ],
    popular: false
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 99.99,
    billingCycle: "monthly",
    features: [
      "Unlimited contacts",
      "100,000 messages/month",
      "All WhatsApp features",
      "Unlimited team members",
      "Custom analytics",
      "Full API access",
      "Dedicated support",
      "Custom integration"
    ],
    popular: false
  }
]

const paymentMethods = [
  {
    id: "pm_1",
    type: "visa",
    lastFour: "4242",
    expiryDate: "04/25",
    isDefault: true,
    name: "Ahmad Setiawan"
  },
  {
    id: "pm_2",
    type: "mastercard",
    lastFour: "8888",
    expiryDate: "07/24",
    isDefault: false,
    name: "Ahmad Setiawan"
  }
]

export default function BillingPage() {
  const handleUpgrade = () => {
    console.log("Opening upgrade plan dialog")
  }

  const handleSelectPlan = (planId: string) => {
    console.log(`Selected plan: ${planId}`)
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    console.log(`Downloading invoice: ${invoiceId}`)
  }

  const handleAddPaymentMethod = () => {
    console.log("Adding new payment method")
  }

  const handleEditPaymentMethod = (id: string) => {
    console.log(`Editing payment method: ${id}`)
  }

  const handleDeletePaymentMethod = (id: string) => {
    console.log(`Deleting payment method: ${id}`)
  }

  const handleSetDefaultPaymentMethod = (id: string) => {
    console.log(`Setting payment method as default: ${id}`)
  }

  return (
    <div className="container mx-auto p-6">
      <BillingHeader
        title="Billing & Subscription"
        description="Manage your subscription, payment methods, and billing history"
        onUpgrade={handleUpgrade}
      />

      <div className="grid grid-cols-3 gap-6 mb-6">
        <CurrentPlanCard plan={currentPlan} />
        <UsageCard usageData={usage} />
      </div>

      <BillingTabs
        currentPlanId="business"
        availablePlans={availablePlans}
        invoices={invoices}
        paymentMethods={paymentMethods}
        onSelectPlan={handleSelectPlan}
        onDownloadInvoice={handleDownloadInvoice}
        onAddPaymentMethod={handleAddPaymentMethod}
        onEditPaymentMethod={handleEditPaymentMethod}
        onDeletePaymentMethod={handleDeletePaymentMethod}
        onSetDefaultPaymentMethod={handleSetDefaultPaymentMethod}
      />
    </div>
  )
} 