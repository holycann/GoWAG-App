import React from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { InvoicesTable } from "./invoices-table"
import { PlanCard } from "./plan-card"
import { PaymentMethodCard } from "./payment-method-card"
import { Plus, CreditCard, Receipt, Calendar, FileText } from "lucide-react"

interface Plan {
  id: string
  name: string
  price: number
  billingCycle: string
  features: string[]
  popular?: boolean
}

interface Invoice {
  id: string
  date: string
  amount: number
  status: "paid" | "pending" | "failed"
  paymentMethod: string
}

interface PaymentMethod {
  id: string
  type: string
  lastFour: string
  expiryDate: string
  isDefault: boolean
  name: string
}

interface BillingTabsProps {
  currentPlanId: string
  availablePlans: Plan[]
  invoices: Invoice[]
  paymentMethods: PaymentMethod[]
  onSelectPlan: (planId: string) => void
  onDownloadInvoice: (invoiceId: string) => void
  onAddPaymentMethod: () => void
  onEditPaymentMethod: (id: string) => void
  onDeletePaymentMethod: (id: string) => void
  onSetDefaultPaymentMethod: (id: string) => void
}

export function BillingTabs({
  currentPlanId,
  availablePlans,
  invoices,
  paymentMethods,
  onSelectPlan,
  onDownloadInvoice,
  onAddPaymentMethod,
  onEditPaymentMethod,
  onDeletePaymentMethod,
  onSetDefaultPaymentMethod
}: BillingTabsProps) {
  return (
    <Tabs defaultValue="plans" className="space-y-6">
      <TabsList>
        <TabsTrigger value="plans">Plans</TabsTrigger>
        <TabsTrigger value="payment">Payment Methods</TabsTrigger>
        <TabsTrigger value="history">Billing History</TabsTrigger>
      </TabsList>
      
      <TabsContent value="plans">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {availablePlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              isCurrentPlan={plan.id === currentPlanId}
              onSelect={onSelectPlan}
            />
          ))}
        </div>
      </TabsContent>
      
      <TabsContent value="payment">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Payment Methods</h3>
            <Button onClick={onAddPaymentMethod}>
              <Plus className="mr-2 h-4 w-4" /> Add Payment Method
            </Button>
          </div>
          
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <PaymentMethodCard
                key={method.id}
                paymentMethod={method}
                onEdit={onEditPaymentMethod}
                onDelete={onDeletePaymentMethod}
                onSetDefault={onSetDefaultPaymentMethod}
              />
            ))}
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
              <CardDescription>
                Update your billing details and address
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Enter your name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" placeholder="Enter your company name (optional)" />
                </div>
                
                <div>
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" placeholder="Enter your address" />
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input id="city" placeholder="City" />
                  </div>
                  <div>
                    <Label htmlFor="state">State / Province</Label>
                    <Input id="state" placeholder="State / Province" />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP / Postal Code</Label>
                    <Input id="zip" placeholder="ZIP / Postal Code" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select>
                    <SelectTrigger id="country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="id">Indonesia</SelectItem>
                      <SelectItem value="sg">Singapore</SelectItem>
                      <SelectItem value="my">Malaysia</SelectItem>
                      <SelectItem value="th">Thailand</SelectItem>
                      <SelectItem value="ph">Philippines</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full">Save Information</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </TabsContent>
      
      <TabsContent value="history">
        <Card>
          <CardHeader>
            <CardTitle>Billing History</CardTitle>
            <CardDescription>
              View and download your past invoices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InvoicesTable 
              invoices={invoices} 
              onDownload={onDownloadInvoice} 
            />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
} 