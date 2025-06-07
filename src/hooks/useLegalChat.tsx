
import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const useLegalChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! Soy LexIA, tu asistente legal inteligente. Estoy aquí para ayudarte con consultas jurídicas, análisis de documentos, interpretación de normativa y mucho más. ¿En qué puedo asistirte hoy?',
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setLoading(true);

    try {
      console.log('Enviando mensaje a LexIA:', messageText);
      
      const { data, error } = await supabase.functions.invoke('chat-legal', {
        body: {
          message: messageText,
          conversationHistory: messages.slice(-10) // Últimos 10 mensajes para contexto
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
      console.log('Respuesta de LexIA recibida exitosamente');

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

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        text: '¡Hola! Soy LexIA, tu asistente legal inteligente. Estoy aquí para ayudarte con consultas jurídicas, análisis de documentos, interpretación de normativa y mucho más. ¿En qué puedo asistirte hoy?',
        isUser: false,
        timestamp: new Date(),
      }
    ]);
  };

  return {
    messages,
    loading,
    sendMessage,
    clearChat
  };
};
