import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Puzzle } from "lucide-react";
import { useState } from "react";

interface AvailableIntegration {
  id: string;
  name: string;
  description: string;
  icon: string | null;
  category: string;
  popular: boolean;
}

interface AvailableIntegrationsProps {
  integrations: AvailableIntegration[];
  onConnect: (integrationId: string) => void;
}

export function AvailableIntegrations({ integrations, onConnect }: AvailableIntegrationsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredIntegrations = searchQuery
    ? integrations.filter(integration =>
        integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : integrations;

  const popularIntegrations = filteredIntegrations.filter(integration => integration.popular);
  const otherIntegrations = filteredIntegrations.filter(integration => !integration.popular);

  const IntegrationCard = ({ integration }: { integration: AvailableIntegration }) => (
    <Card key={integration.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded overflow-hidden bg-muted flex items-center justify-center">
            {integration.icon ? (
              <img 
                src={integration.icon} 
                alt={integration.name} 
                className="w-full h-full object-contain" 
              />
            ) : (
              <Puzzle className="h-6 w-6 text-primary opacity-70" />
            )}
          </div>
          <div>
            <CardTitle className="text-lg">{integration.name}</CardTitle>
            <Badge 
              variant="outline" 
              className={integration.popular 
                ? "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400"
                : ""}
            >
              {integration.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {integration.description}
        </p>
      </CardContent>
      <CardFooter className="pt-0">
        <Button 
          className="w-full"
          variant={integration.popular ? "default" : "outline"}
          onClick={() => onConnect(integration.id)}
        >
          Connect
        </Button>
      </CardFooter>
    </Card>
  );

  return (
    <div>
      <div className="mb-4 relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search integrations..."
          className="pl-9 w-full max-w-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {popularIntegrations.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-4">Popular Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
            {popularIntegrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </>
      )}

      {otherIntegrations.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-4">More Integrations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {otherIntegrations.map((integration) => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </>
      )}

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No integrations found matching your search.</p>
        </div>
      )}
    </div>
  );
} 