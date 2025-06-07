
import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  updatedAt: Date;
}

export const useLegalChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Cargar conversaciones del usuario
  const loadConversations = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Agrupar mensajes por conversación (usando la fecha como agrupador simple)
      const conversationMap = new Map<string, any[]>();
      
      data?.forEach(msg => {
        const dateKey = new Date(msg.created_at).toDateString();
        if (!conversationMap.has(dateKey)) {
          conversationMap.set(dateKey, []);
        }
        conversationMap.get(dateKey)?.push(msg);
      });

      const convs: Conversation[] = Array.from(conversationMap.entries()).map(([dateKey, msgs]) => {
        const lastMsg = msgs[0];
        const firstUserMsg = msgs.find(m => m.role === 'user');
        return {
          id: dateKey,
          title: firstUserMsg?.content.slice(0, 50) + '...' || 'Nueva conversación',
          lastMessage: lastMsg.content.slice(0, 100) + '...',
          updatedAt: new Date(lastMsg.created_at)
        };
      });

      setConversations(convs);
    } catch (error) {
      console.error('Error cargando conversaciones:', error);
    }
  };

  // Cargar mensajes de una conversación específica
  const loadConversationMessages = async (conversationId: string) => {
    if (!user) return;

    try {
      const targetDate = new Date(conversationId);
      const nextDay = new Date(targetDate);
      nextDay.setDate(nextDay.getDate() + 1);

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .gte('created_at', targetDate.toISOString())
        .lt('created_at', nextDay.toISOString())
        .order('created_at', { ascending: true });

      if (error) throw error;

      const msgs: Message[] = data?.map(msg => ({
        id: msg.id,
        text: msg.content,
        isUser: msg.role === 'user',
        timestamp: new Date(msg.created_at)
      })) || [];

      setMessages(msgs);
      setCurrentConversationId(conversationId);
    } catch (error) {
      console.error('Error cargando mensajes:', error);
    }
  };

  // Inicializar con mensaje de bienvenida
  const initializeChat = () => {
    const welcomeMessage: Message = {
      id: 'welcome',
      text: '¡Hola! Soy LexIA, tu asistente jurídico especializado en Derecho español y europeo. Estoy aquí para ayudarte con consultas jurídicas, análisis de documentos, interpretación de normativa y mucho más. ¿En qué puedo asistirte hoy?',
      isUser: false,
      timestamp: new Date(),
    };
    setMessages([welcomeMessage]);
    setCurrentConversationId(null);
  };

  // Enviar mensaje
  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || !user) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      // Guardar mensaje del usuario en la base de datos
      const { error: userMsgError } = await supabase
        .from('messages')
        .insert({
          user_id: user.id,
          role: 'user',
          content: messageText
        });

      if (userMsgError) throw userMsgError;

      console.log('Enviando mensaje a LexIA:', messageText);
      
      // Obtener historial para contexto
      const conversationHistory = messages.slice(-10);
      
      const { data, error } = await supabase.functions.invoke('chat-legal', {
        body: {
          message: messageText,
          conversationHistory: conversationHistory
        }
      });

      if (error) {
        throw new Error(`Error en función: ${error.message}`);
      }

      if (!data.success) {
        throw new Error(data.error || 'Error desconocido');
      }

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiResponse]);

      // Guardar respuesta de la IA en la base de datos
      await supabase
        .from('messages')
        .insert({
          user_id: user.id,
          role: 'assistant',
          content: data.response
        });

      console.log('Respuesta de LexIA recibida y guardada exitosamente');
      
      // Recargar conversaciones
      await loadConversations();

    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Lo siento, ha ocurrido un error al procesar tu consulta: ${error.message}. Por favor, intenta nuevamente.`,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  // Crear nueva conversación
  const newConversation = () => {
    initializeChat();
  };

  // Efectos
  useEffect(() => {
    if (user) {
      loadConversations();
      initializeChat();
    }
  }, [user]);

  return {
    messages,
    conversations,
    currentConversationId,
    loading,
    sendMessage,
    newConversation,
    loadConversationMessages
  };
};
