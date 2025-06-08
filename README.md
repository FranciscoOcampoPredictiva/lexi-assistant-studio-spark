 LexIA – Asistente Jurídico con Supabase y OpenAI

**LexIA** es una aplicación web especializada que funciona como asistente jurídico inteligente. Fue diseñada para facilitar el acceso a información legal mediante inteligencia artificial, ofreciendo respuestas claras y contextualizadas sobre derecho español y europeo.

El sistema permite a los usuarios iniciar sesión con su correo electrónico, mantener un historial completo de sus conversaciones, y obtener respuestas jurídicas estructuradas gracias a la integración con **OpenAI GPT**. Todo el backend y la persistencia están gestionados con **Supabase**, incluyendo políticas de seguridad personalizadas (RLS).

---

## 🧠 Funcionalidades principales

- ✅ Ingreso mediante email/contraseña usando Supabase Auth
- ✅ Chat legal responsivo y profesional
- ✅ Historial de conversaciones por usuario, almacenado en la tabla `messages`
- ✅ Sidebar que permite navegar fácilmente entre fechas y mensajes anteriores
- ✅ Integración de clave API para el uso privado de OpenAI
- ✅ Prompt legal especializado en derecho español y europeo
- ✅ Seguridad robusta: Políticas RLS activas y gestión de roles
- ✅ Proyecto 100% desplegable, preparado para uso real en entornos legales

---

## 🔧 Tecnologías utilizadas

- **Vite** (entorno de desarrollo rápido)
- **React** + **TypeScript** (frontend moderno y tipado)
- **Tailwind CSS** + **shadcn-ui** (estilos profesionales y reutilizables)
- **Supabase** (autenticación, base de datos, RLS)
- **OpenAI** (motor de lenguaje jurídico a través de GPT-4o)


⚠️ Aclaraciones al promp del sistema:
- No puedes ejercer como abogado ni dar asesoría vinculante
- Siempre invita al usuario a verificar la información con fuentes oficiales
- Mantén un lenguaje profesional, claro y empático

▶️ ¿Cómo correr el proyecto?

Clona el repositorio:

git clone https://github.com/FranciscoOcampoPredictiva/lexi-assistant-studio-spark.git
cd lexi-assistant-studio-spark

Instala las dependencias:

npm install

Configura tu archivo .env y luego ejecuta:

npm run dev


🌐 Proyecto online
Tu app está desplegada en:

🔗 https://lovable.dev/projects/c4f8646e-6cf6-41e8-9242-1ba13b572851

📦 Despliegue y dominio personalizado
Puedes publicar fácilmente desde Lovable haciendo clic en Share -> Publish.
Para conectar tu dominio personalizado, ve a: Project > Settings > Domains > Connect Domain.

👤 Desarrollado por
Francisco Ocampo Economista con maestria en ingenieria con enfasis en analitica de datos que cuenta con certificacion internacional de microsft como azure data scientist associate y AI engineer associate  

📄 Licencia
Proyecto bajo licencia MIT. Uso permitido para fines académicos o de desarrollo.
No sustituye la consulta con un abogado profesional.
"""

🧾 Tabla messages en Supabase
La tabla debe tener esta estructura:

Campo    	     Tipo
id	          UUID (PK)
user_id     	UUID (relación con auth.users)
role	        TEXT (user o assistant)
content	      TEXT
created_at	  TIMESTAMP
updated_at	  TIMESTAMP


## 🏗️ Estructura del proyecto

src/
├── components/ # Componentes visuales como ChatBox, Sidebar
├── lib/
│ └── supabase.ts # Cliente y configuración de Supabase
├── integrations/
│ └── supabase/
│ └── client.ts # Lógica de persistencia de mensajes
├── pages/
│ ├── index.tsx # Página principal del chat
│ └── auth.tsx # Página de login/registro
└── utils/
└── openai.ts # Función para llamada a OpenAI con el prompt legal


🔄 Cambiar entre ChatGPT y Gemini

La integración por defecto utiliza OpenAI GPT. Para cambiar entre ChatGPT y Gemini debes:

1. Abrir el archivo:
src/utils/openai.ts

2. Reemplazar la función de llamada a OpenAI por la de Gemini, por ejemplo:

Original: 

// ChatGPT (por defecto)
const response = await openai.chat.completions.create({ ... })

Ajuste a gemini
const response = await gemini.generateContent({ prompt })


🚧 Mejoras pendientes
 Implementar scroll automático en el historial largo de chat

 Permitir edición y eliminación de mensajes del usuario

 Añadir resumen automático de cada conversación

 Añadir selector para elegir entre ChatGPT y Gemini desde la interfaz

 Internacionalización (i18n) para soporte multilingüe

 Validaciones de seguridad adicionales en Supabase RLS



🛠️ ¿Cómo puedo editar este código?
Existen varias formas de editar tu aplicación:

🔧 Usar Lovable
Simplemente visita el proyecto en Lovable y comienza a interactuar mediante prompts.

Todos los cambios realizados desde Lovable se guardarán automáticamente en este repositorio.

💻 Usar tu IDE preferido (de forma local)
Si prefieres trabajar de forma local en tu entorno de desarrollo (VS Code, WebStorm, etc.), puedes clonar el repositorio, hacer tus cambios y subirlos.
Los cambios también se reflejarán en Lovable.

El único requisito es tener instalado Node.js y npm.
Puedes instalarlo fácilmente con nvm:
👉 Guía de instalación de nvm

Pasos:

```sh
# Paso 1: Clona el repositorio utilizando la URL del proyecto
git clone https://github.com/FranciscoOcampoPredictiva/lexi-assistant-studio-spark.git

# Paso 2: Accede al directorio del proyecto
cd lexi-assistant-studio-spark

# Paso 3: Instala las dependencias necesarias
npm install

# Paso 4: Inicia el servidor de desarrollo con recarga automática
npm run dev

```

✏️ Editar un archivo directamente en GitHub
Navega hasta el archivo que deseas modificar.

Haz clic en el botón "Editar" (ícono de lápiz) en la esquina superior derecha de la vista del archivo.

Realiza tus cambios y haz clic en "Commit changes" para guardarlos.

💻 Usar GitHub Codespaces
Ve a la página principal de tu repositorio en GitHub.

Haz clic en el botón verde "Code" en la parte superior derecha.

Selecciona la pestaña "Codespaces".

Haz clic en "New codespace" para lanzar un nuevo entorno de desarrollo.

Desde allí, puedes editar los archivos directamente, y luego confirmar (commit) y enviar (push) tus cambios al repositorio.

⚙️ ¿Qué tecnologías se utilizan en este proyecto?
Este proyecto está desarrollado con:

Vite (entorno de desarrollo rápido)

TypeScript

React

shadcn-ui (componentes UI modernos)

Tailwind CSS (estilización eficiente con utilidades)

🚀 ¿Cómo puedo desplegar este proyecto?
Simplemente abre Lovable y haz clic en Share → Publish para publicarlo fácilmente.

