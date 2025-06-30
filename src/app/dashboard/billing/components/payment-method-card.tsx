import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface PaymentMethod {
  id: string
  type: string
  lastFour: string
  expiryDate: string
  isDefault: boolean
  name: string
}

interface PaymentMethodCardProps {
  paymentMethod: PaymentMethod
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onSetDefault: (id: string) => void
}

export function PaymentMethodCard({ 
  paymentMethod, 
  onEdit, 
  onDelete, 
  onSetDefault 
}: PaymentMethodCardProps) {
  const getCardIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'visa':
        return (
          <div className="bg-blue-600 text-white font-bold text-xs p-1 rounded w-10 text-center">
            VISA
          </div>
        )
      case 'mastercard':
        return (
          <div className="bg-red-600 text-white font-bold text-xs p-1 rounded w-10 text-center">
            MC
          </div>
        )
      case 'amex':
        return (
          <div className="bg-blue-800 text-white font-bold text-xs p-1 rounded w-10 text-center">
            AMEX
          </div>
        )
      default:
        return (
          <div className="bg-gray-600 text-white font-bold text-xs p-1 rounded w-10 text-center">
            CARD
          </div>
        )
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {getCardIcon(paymentMethod.type)}
            <div>
              <div className="font-medium">
                •••• {paymentMethod.lastFour}
                {paymentMethod.isDefault && (
                  <Badge className="ml-2 bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/20 dark:text-green-400">
                    Default
                  </Badge>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Expires {paymentMethod.expiryDate} • {paymentMethod.name}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {!paymentMethod.isDefault && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => onSetDefault(paymentMethod.id)}
              >
                Set Default
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEdit(paymentMethod.id)}
            >
              Edit
            </Button>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onDelete(paymentMethod.id)}
            >
              Delete
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 