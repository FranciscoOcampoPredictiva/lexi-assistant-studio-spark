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




## Project info

**URL**: https://lovable.dev/projects/c4f8646e-6cf6-41e8-9242-1ba13b572851

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/c4f8646e-6cf6-41e8-9242-1ba13b572851) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <https://github.com/FranciscoOcampoPredictiva/lexi-assistant-studio-spark.git>

# Step 2: Navigate to the project directory.
cd <lexi-assistant-studio-spark>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/c4f8646e-6cf6-41e8-9242-1ba13b572851) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
