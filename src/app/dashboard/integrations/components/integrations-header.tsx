import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface IntegrationsHeaderProps {
  onAddIntegration: () => void;
}

export function IntegrationsHeader({ onAddIntegration }: IntegrationsHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="text-muted-foreground">
          Connect and manage third-party services
        </p>
      </div>
      <Button onClick={onAddIntegration}>
        <Plus className="mr-2 h-4 w-4" /> Add Integration
      </Button>
    </div>
  );
} 