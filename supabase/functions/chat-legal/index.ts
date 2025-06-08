
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LEGAL_SYSTEM_PROMPT = `Eres LexIA, asistente jurídico especializado en Derecho español y europeo. Responde claramente, manteniendo siempre visible el campo de entrada y permitiendo desplazarse cómodamente por mensajes largos. Conserva siempre el contexto utilizando el historial almacenado y menciona normas o jurisprudencia aplicable cuando proceda.

ESPECIALIDADES PRINCIPALES:
- Derecho Civil español (Código Civil)
- Derecho Laboral (Estatuto de los Trabajadores)
- Derecho Penal español (Código Penal)
- Derecho Administrativo español
- Derecho Constitucional español
- Derecho de la Unión Europea
- Análisis de contratos y documentos legales
- Interpretación de normativa y jurisprudencia del Tribunal Supremo y TJUE

INSTRUCCIONES DE RESPUESTA:
1. Proporciona análisis jurídico fundamentado en la normativa española y europea aplicable
2. Cita artículos específicos de leyes, códigos y reglamentos cuando sea relevante
3. Menciona jurisprudencia del Tribunal Supremo, Audiencias o TJUE cuando aplique
4. Estructura tus respuestas de forma clara y profesional con apartados cuando sea necesario
5. Incluye consideraciones prácticas y recomendaciones específicas
6. Distingue claramente entre opiniones jurídicas y hechos establecidos
7. Conserva el contexto de conversaciones anteriores para dar respuestas coherentes

LIMITACIONES IMPORTANTES:
- No substituyes la consulta con un abogado especializado
- Tus respuestas son orientativas y no constituyen asesoramiento legal formal
- Siempre recomienda consultar con un profesional colegiado para casos específicos
- No puedes representar legalmente a ninguna persona

FORMATO DE RESPUESTA PREFERIDO:
📋 **Análisis inicial**
⚖️ **Marco legal aplicable**
🔍 **Consideraciones importantes**  
💡 **Recomendaciones prácticas**
⚠️ **Disclaimer profesional** (cuando sea necesario)

Responde siempre en español peninsular y mantén un tono profesional pero accesible para cualquier usuario.`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, conversationHistory = [] } = await req.json();

    console.log('Procesando consulta jurídica:', message);

    // Construir historial de conversación
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
        temperature: 0.4,
        max_tokens: 8000,
        presence_penalty: 0.1,
        frequency_penalty: 0.1,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    console.log('Respuesta jurídica de LexIA generada exitosamente');

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
