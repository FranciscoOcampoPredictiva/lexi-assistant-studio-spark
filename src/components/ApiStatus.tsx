
import { CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ApiStatusProps {
  isConfigured: boolean;
  onConfigure?: () => void;
}

const ApiStatus = ({ isConfigured, onConfigure }: ApiStatusProps) => {
  return (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {isConfigured ? (
              <>
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  ChatGPT configurado - LexIA está listo
                </span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5 text-amber-600" />
                <span className="text-sm text-amber-700 font-medium">
                  Usando respuestas simuladas - Configura ChatGPT para obtener respuestas de IA real
                </span>
              </>
            )}
          </div>
          {!isConfigured && onConfigure && (
            <Button variant="outline" size="sm" onClick={onConfigure}>
              <Settings className="h-4 w-4 mr-2" />
              Configurar
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiStatus;
