
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLegalChat } from '@/hooks/useLegalChat';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Scale, Send } from 'lucide-react';
import ChatSidebar from '@/components/ChatSidebar';

const Chat = () => {
  const { user } = useAuth();
  const { 
    messages, 
    conversations, 
    currentConversationId, 
    loading, 
    sendMessage, 
    newConversation,
    loadConversationMessages 
  } = useLegalChat();
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const messageToSend = inputMessage;
    setInputMessage(''); // Clear input immediately for better UX
    
    await sendMessage(messageToSend);
  };

  const handleSelectConversation = (conversationId: string) => {
    loadConversationMessages(conversationId);
  };

  return (
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        currentConversationId={currentConversationId}
        onNewConversation={newConversation}
        onSelectConversation={handleSelectConversation}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <Scale className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">LexIA</h1>
              <p className="text-sm text-gray-600">
                Asistente Jurídico Especializado en Derecho Español y Europeo
              </p>
            </div>
          </div>
        </header>

        {/* Messages Area with Scroll */}
        <div className="flex-1 overflow-hidden">
          <div className="h-full p-6">
            <Card className="h-full flex flex-col">
              <CardContent className="flex-1 flex flex-col p-0 min-h-0">
                {/* Messages Container with Scroll */}
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
                  style={{ 
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#cbd5e1 #f1f5f9'
                  }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-2xl px-6 py-4 rounded-2xl ${
                          message.isUser
                            ? 'bg-blue-600 text-white ml-12'
                            : 'bg-white text-gray-900 border border-gray-200 mr-12 shadow-sm'
                        }`}
                      >
                        <div className="whitespace-pre-wrap leading-relaxed">
                          {message.text}
                        </div>
                        <div 
                          className={`text-xs mt-3 ${
                            message.isUser ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString('es-ES', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Loading indicator */}
                  {loading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-900 max-w-2xl px-6 py-4 rounded-2xl border border-gray-200 mr-12 shadow-sm">
                        <div className="text-sm">LexIA está analizando tu consulta jurídica...</div>
                        <div className="flex space-x-1 mt-3">
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Auto-scroll anchor */}
                  <div ref={messagesEndRef} />
                </div>

                {/* Fixed Input Form - Always Visible */}
                <div className="border-t border-gray-200 p-6 flex-shrink-0 bg-white">
                  <form onSubmit={handleSendMessage} className="flex space-x-4">
                    <Input
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder="Escribe tu consulta jurídica aquí... (ej: '¿Cuáles son mis derechos como trabajador según el Estatuto de los Trabajadores?')"
                      disabled={loading}
                      className="flex-1 h-12 px-4 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      autoFocus
                    />
                    <Button 
                      type="submit" 
                      disabled={loading || !inputMessage.trim()}
                      className="h-12 px-8 bg-blue-600 hover:bg-blue-700 flex-shrink-0"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
