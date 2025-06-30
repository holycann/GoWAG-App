import React from "react"

interface MessagesHeaderProps {
  title: string
  description: string
}

export function MessagesHeader({ title, description }: MessagesHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  )
} 