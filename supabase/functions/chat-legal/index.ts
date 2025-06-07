
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LEGAL_SYSTEM_PROMPT = `Eres LexIA, un asistente legal inteligente especializado en derecho. Tu función es proporcionar análisis jurídico, interpretar normativa legal y asistir con consultas legales de manera profesional y precisa.

ESPECIALIDADES:
- Derecho Civil y Comercial
- Derecho Laboral
- Derecho Penal
- Derecho Administrativo
- Derecho Constitucional
- Análisis de contratos y documentos legales
- Interpretación de normativa y jurisprudencia

INSTRUCCIONES DE RESPUESTA:
1. Proporciona análisis jurídico fundamentado en la normativa aplicable
2. Cita artículos específicos de leyes cuando sea relevante
3. Estructura tus respuestas de forma clara y profesional
4. Incluye consideraciones prácticas y recomendaciones
5. Distingue entre opiniones jurídicas y hechos establecidos

IMPORTANTES LIMITACIONES:
- No substituyes la consulta con un abogado especializado
- Tus respuestas son orientativas y no constituyen asesoramiento legal formal
- Siempre recomienda consultar con un profesional para casos específicos
- No puedes representar legalmente a ninguna persona

FORMATO DE RESPUESTA:
- Análisis inicial del tema
- Marco legal aplicable
- Consideraciones importantes
- Recomendaciones prácticas
- Disclaimer sobre consulta profesional cuando sea necesario

Responde siempre en español y mantén un tono profesional pero accesible.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    console.log('Procesando consulta legal:', message);

    const messages = [
      { role: 'system', content: LEGAL_SYSTEM_PROMPT },
      ...conversationHistory.map(msg => ({
        role: msg.isUser ? 'user' : 'assistant',
        content: msg.text
      })),
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: messages,
        temperature: 0.3,
        max_tokens: 1500,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Respuesta de IA generada exitosamente');

    return new Response(JSON.stringify({ 
      response: aiResponse,
      success: true 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error en chat-legal function:', error);
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
