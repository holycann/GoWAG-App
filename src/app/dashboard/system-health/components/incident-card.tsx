import React from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, XCircle } from "lucide-react"

interface IncidentCardProps {
  title: string
  description: string
  startedAt: string
  severity: "warning" | "critical"
  onViewDetails?: () => void
}

export function IncidentCard({ 
  title, 
  description, 
  startedAt, 
  severity,
  onViewDetails 
}: IncidentCardProps) {
  const getSeverityStyles = () => {
    if (severity === "critical") {
      return {
        bgColor: "bg-red-50 dark:bg-red-900/10",
        borderColor: "border-red-200 dark:border-red-900/50",
        titleColor: "text-red-800 dark:text-red-300",
        textColor: "text-red-700 dark:text-red-200",
        icon: <XCircle className="h-4 w-4 mr-2" />,
        buttonColor: "text-red-700 dark:text-red-300"
      }
    }
    
    return {
      bgColor: "bg-yellow-50 dark:bg-yellow-900/10",
      borderColor: "border-yellow-200 dark:border-yellow-900/50",
      titleColor: "text-yellow-800 dark:text-yellow-300",
      textColor: "text-yellow-700 dark:text-yellow-200",
      icon: <AlertTriangle className="h-4 w-4 mr-2" />,
      buttonColor: "text-yellow-700 dark:text-yellow-300"
    }
  }

  const styles = getSeverityStyles()

  return (
    <Card className={`${styles.bgColor} ${styles.borderColor}`}>
      <CardHeader className="p-3">
        <CardTitle className={`text-sm font-medium ${styles.titleColor} flex items-center`}>
          {styles.icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0">
        <div className={styles.textColor}>
          <p>{description}</p>
          <div className="mt-2 text-xs">
            <span className="font-medium">Started:</span> {startedAt}
          </div>
        </div>
      </CardContent>
      {onViewDetails && (
        <CardFooter className="p-3 pt-0 flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className={styles.buttonColor}
            onClick={onViewDetails}
          >
            View Details
          </Button>
        </CardFooter>
      )}
    </Card>
  )
} 