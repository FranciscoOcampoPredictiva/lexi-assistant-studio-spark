
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, Plus, Settings, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: Date;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  currentConversationId: string | null;
  onNewConversation: () => void;
  onSelectConversation: (id: string) => void;
}

const ChatSidebar = ({ 
  conversations, 
  currentConversationId, 
  onNewConversation, 
  onSelectConversation 
}: ChatSidebarProps) => {
  const { user, signOut } = useAuth();
  const [apiKey, setApiKey] = useState(localStorage.getItem('openai_api_key') || '');
  const [showApiKeyInput, setShowApiKeyInput] = useState(!apiKey);

  const handleSaveApiKey = () => {
    localStorage.setItem('openai_api_key', apiKey);
    setShowApiKeyInput(false);
  };

  return (
    <div className="w-80 bg-gray-900 text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold">LexIA Chat</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onNewConversation}
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* API Key Configuration */}
        {showApiKeyInput ? (
          <div className="space-y-2">
            <label className="text-xs text-gray-400">API Key de OpenAI</label>
            <div className="flex space-x-2">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
                className="flex-1 px-2 py-1 text-xs bg-gray-800 border border-gray-600 rounded focus:border-blue-400 focus:outline-none"
              />
              <Button
                size="sm"
                onClick={handleSaveApiKey}
                className="bg-blue-600 hover:bg-blue-700 text-xs"
              >
                Guardar
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-gray-400">
            <span>API Key configurada</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowApiKeyInput(true)}
              className="text-gray-400 hover:text-white p-1"
            >
              <Settings className="h-3 w-3" />
            </Button>
          </div>
        )}
      </div>

      {/* Conversations */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Historial</h3>
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => onSelectConversation(conversation.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                currentConversationId === conversation.id
                  ? 'bg-gray-700 border border-gray-600'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="text-sm font-medium text-white mb-1 truncate">
                {conversation.title}
              </div>
              <div className="text-xs text-gray-400 truncate">
                {conversation.lastMessage}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {conversation.updatedAt.toLocaleDateString()}
              </div>
            </button>
          ))}
          {conversations.length === 0 && (
            <div className="text-sm text-gray-500 text-center py-8">
              No hay conversaciones aún.
              <br />
              ¡Inicia una nueva consulta!
            </div>
          )}
        </div>
      </ScrollArea>

      {/* User Info */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-gray-400" />
            <span className="text-sm text-gray-300 truncate">
              {user?.email}
            </span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={signOut}
            className="text-gray-400 hover:text-white"
          >
            Salir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
