import React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

interface DashboardHeaderProps {
  title: string
  description: string
  buttonText?: string
  buttonHref?: string
}

export function DashboardHeader({
  title,
  description,
  buttonText,
  buttonHref,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        <p className="text-muted-foreground mt-1">{description}</p>
      </div>
      {buttonText && buttonHref && (
        <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={buttonHref} className="flex items-center">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      )}
    </div>
  )
} 