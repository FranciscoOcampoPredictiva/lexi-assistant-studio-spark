
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLegalChat } from '@/hooks/useLegalChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scale, Send, LogOut, RefreshCw } from 'lucide-react';
import ApiStatus from '@/components/ApiStatus';

const Chat = () => {
  const { user, signOut } = useAuth();
  const { messages, loading, sendMessage, clearChat } = useLegalChat();
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    await sendMessage(inputMessage);
    setInputMessage('');
  };

  const handleClearChat = () => {
    clearChat();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-2">
            <Scale className="h-6 w-6 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">LexIA</span>
            <span className="text-sm text-gray-500 bg-blue-50 px-2 py-1 rounded">
              Asistente Legal IA
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={handleClearChat}>
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Interface */}
      <div className="max-w-4xl mx-auto p-4">
        <ApiStatus isConfigured={true} />
        
        <Card className="h-[calc(100vh-200px)] flex flex-col">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Scale className="h-5 w-5 text-blue-600" />
              <span>LexIA - Asistente Legal Inteligente</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-lg ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900 border border-gray-200'
                    }`}
                  >
                    <div className="text-sm whitespace-pre-wrap">{message.text}</div>
                    <div className="text-xs opacity-70 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 text-gray-900 max-w-xs lg:max-w-md px-4 py-3 rounded-lg border border-gray-200">
                    <div className="text-sm">LexIA está analizando tu consulta...</div>
                    <div className="flex space-x-1 mt-2">
                      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSendMessage} className="flex space-x-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Escribe tu consulta legal aquí... (ej: '¿Cuáles son mis derechos como trabajador?')"
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading || !inputMessage.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Chat;
