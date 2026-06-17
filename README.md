# Restaurante El Lago

Página web profesional para Restaurante El Lago, especializado en pescados y mariscos en Cúcuta, Norte de Santander.

## Tecnologías

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Firebase Firestore
- Framer Motion
- React Icons

## Instalación

```bash
npm install
cp .env.example .env.local
npm run dev
```

La app quedará disponible en `http://localhost:3000`.

## Variables de entorno

Configura `.env.local` con los datos de tu app web de Firebase:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

NEXT_PUBLIC_MENU_URL=/menu/carta-el-lago-final.pdf
```

El enlace del PDF también está centralizado en `src/config/site.ts`:

```ts
export const MENU_URL =
  process.env.NEXT_PUBLIC_MENU_URL || "/menu/carta-el-lago-final.pdf";
```

El PDF no se incrusta en la página. El botón `Ver Menú` abre `NEXT_PUBLIC_MENU_URL` en una pestaña nueva.

## Firebase Firestore

Activa Firestore en modo nativo dentro de Firebase Console.

Colección `reservations`:

- `name`: string
- `phone`: string
- `email`: string
- `people`: number
- `date`: string
- `time`: string
- `comments`: string
- `status`: `pending`
- `createdAt`: server timestamp

Colección `reviews`:

- `name`: string
- `rating`: number, de 1 a 5
- `comment`: string
- `approved`: boolean
- `createdAt`: server timestamp

Las reseñas nuevas se guardan con `approved: false`. Para mostrarlas en la web, cambia `approved` a `true` desde Firebase Console o desde un panel administrativo futuro.

## Reglas e índices

El proyecto incluye:

- `firestore.rules`
- `firestore.indexes.json`
- `firebase.json`

Para desplegar reglas e índices con Firebase CLI:

```bash
npm install -g firebase-tools
firebase login
firebase use your_project_id
firebase deploy --only firestore:rules,firestore:indexes
```

## Despliegue en Vercel

1. Sube el proyecto a GitHub, GitLab o Bitbucket.
2. En Vercel, crea un proyecto nuevo e importa el repositorio.
3. Usa estos comandos:
   - Install Command: `npm install`
   - Build Command: `npm run build`
   - Output Directory: `.next`
4. Agrega las variables de entorno de `.env.example` en Project Settings > Environment Variables.
5. Haz deploy.
6. En Settings > Domains, conecta tu dominio y sigue las instrucciones DNS de Vercel.

## Personalización

- Logo: reemplaza `public/logo-el-lago.svg` por el logo oficial si lo tienes.
- Banner: reemplaza `public/images/el-lago-hero.png` por la imagen promocional oficial si lo prefieres.
- Datos del negocio, redes, WhatsApp, mapa y teléfono: edita `src/config/site.ts`.
- SEO: edita `src/app/layout.tsx`.

## Notas

- La página principal no muestra platos ni lista de menú.
- El menú vive únicamente como PDF externo mediante el botón `Ver Menú`.
- El botón flotante de WhatsApp usa el mensaje: `Hola, deseo obtener información sobre Restaurante El Lago.`
