# Restaurante El Lago

Página web profesional para Restaurante El Lago, especializado en pescados y mariscos en Cúcuta, Norte de Santander.

## Tecnologías

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Firebase Firestore
- MySQL
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

Configura `.env.local` con los datos de Firebase y MySQL:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

MYSQL_URL=mysql://user:password@host:3306/database

NEXT_PUBLIC_MENU_URL=/menu/carta-el-lago-final.pdf
```

El enlace del PDF también está centralizado en `src/config/site.ts`:

```ts
export const MENU_URL =
  process.env.NEXT_PUBLIC_MENU_URL || "/menu/carta-el-lago-final.pdf";
```

El PDF no se incrusta en la página. El botón `Ver Menú` abre `NEXT_PUBLIC_MENU_URL` en una pestaña nueva.

## Railway MySQL para reseñas

Las reseñas se guardan en MySQL mediante la ruta `/api/reviews`.

En Railway:

1. Abre tu proyecto.
2. Haz clic en `+ New`.
3. Selecciona `Database`.
4. Selecciona `MySQL`.
5. En el servicio web de Next.js, agrega la variable:

```bash
MYSQL_URL=${{MySQL.MYSQL_URL}}
```

Si tu servicio MySQL tiene otro nombre en Railway, reemplaza `MySQL` por ese nombre.

La tabla `reviews` se crea automáticamente al cargar o guardar reseñas. También tienes el SQL manual en `database/reviews.sql`.

Tabla `reviews`:

- `id`: id autoincremental
- `name`: nombre del cliente
- `rating`: calificación de 1 a 5
- `comment`: comentario
- `approved`: `true` para mostrarse en pantalla
- `created_at`: fecha de creación

Las reseñas nuevas se guardan como aprobadas para que aparezcan en pantalla inmediatamente.

## Firebase Firestore para reservas

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
