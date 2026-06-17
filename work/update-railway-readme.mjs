import fs from "node:fs";

const readmes = [
  "/Users/estebanmauricio/Desktop/proyectos/restaurante-el-lago-nextjs/README.md",
  "/Users/estebanmauricio/Desktop/proyectos/el lago/restaurante-el-lago-nextjs/README.md"
];

for (const readmePath of readmes) {
  let content = fs.readFileSync(readmePath, "utf8");

  if (!content.includes("SMTP_HOST=smtp.example.com")) {
    content = content.replace(
      "NEXT_PUBLIC_MENU_URL=/menu/carta-el-lago-final.pdf\n",
      `NEXT_PUBLIC_MENU_URL=/menu/carta-el-lago-final.pdf

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=usuario@example.com
SMTP_PASS=tu_contraseña
RESERVATION_EMAIL_FROM=reservas@example.com
RESERVATION_EMAIL_TO=ventas@example.com
`
    );
  }

  if (!content.includes("## Railway")) {
    content = content.replace(
      "El PDF no se incrusta en la página. El botón `Ver Menú` abre `NEXT_PUBLIC_MENU_URL` en una pestaña nueva.\n",
      `El PDF no se incrusta en la página. El botón \`Ver Menú\` abre \`NEXT_PUBLIC_MENU_URL\` en una pestaña nueva.

## Railway

En el servicio de Railway, abre la pestaña \`Variables\` y define estas variables para que el correo de reservas funcione en runtime:

- \`SMTP_HOST\`
- \`SMTP_PORT\`
- \`SMTP_USER\`
- \`SMTP_PASS\`
- \`RESERVATION_EMAIL_FROM\`
- \`RESERVATION_EMAIL_TO\`

Después de guardar las variables, ejecuta un nuevo deploy. La validación SMTP ocurre al enviar una reserva, no durante el build de Next.js.
`
    );
  }

  fs.writeFileSync(readmePath, content);
}
