
import { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const ApiStatus = () => {
  const [apiKey, setApiKey] = useState('');
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    const key = localStorage.getItem('openai_api_key') || '';
    setApiKey(key);
    setShowConfig(!key);
  }, []);

  const handleSaveApiKey = (key: string) => {
    localStorage.setItem('openai_api_key', key);
    setApiKey(key);
    setShowConfig(false);
  };

  const isConfigured = !!apiKey;

  if (showConfig && !isConfigured) {
    return (
      <Card className="mb-4 border-amber-200 bg-amber-50">
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <span className="text-sm text-amber-800 font-medium">
                Configura tu API Key de OpenAI para usar LexIA
              </span>
            </div>
            <div className="flex space-x-2">
              <input
                type="password"
                placeholder="sk-..."
                className="flex-1 px-3 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                onChange={(e) => {
                  if (e.target.value.trim()) {
                    handleSaveApiKey(e.target.value.trim());
                  }
                }}
              />
            </div>
            <p className="text-xs text-amber-700">
              Tu API Key se almacena localmente y se envía directamente a OpenAI.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-4 border-green-200 bg-green-50">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <span className="text-sm text-green-800 font-medium">
              LexIA está configurado y listo para consultas jurídicas
            </span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowConfig(true)}
            className="border-green-300 text-green-700 hover:bg-green-100"
          >
            <Settings className="h-4 w-4 mr-2" />
            Configurar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiStatus;
