import nodemailer from "nodemailer";
import type { ReservationInput } from "@/types/firestore";

export async function sendReservationEmail(data: ReservationInput) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    RESERVATION_EMAIL_FROM,
    RESERVATION_EMAIL_TO
  } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !RESERVATION_EMAIL_FROM ||
    !RESERVATION_EMAIL_TO
  ) {
    throw new Error(
      "Faltan variables de entorno para el correo. Define SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, RESERVATION_EMAIL_FROM y RESERVATION_EMAIL_TO."
    );
  }

  const smtpPort = Number(SMTP_PORT);

  if (Number.isNaN(smtpPort) || smtpPort <= 0) {
    throw new Error("SMTP_PORT debe ser un número válido mayor que cero.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  const subject = `Nueva reserva de ${data.name}`;
  const text = `Nueva reserva recibida:\n\nNombre: ${data.name}\nTeléfono: ${data.phone}\nCorreo: ${data.email}\nPersonas: ${data.people}\nFecha: ${data.date}\nHora: ${data.time}\nComentarios: ${data.comments}`;
  const html = `
    <h1>Nueva reserva recibida</h1>
    <p><strong>Nombre:</strong> ${data.name}</p>
    <p><strong>Teléfono:</strong> ${data.phone}</p>
    <p><strong>Correo:</strong> ${data.email}</p>
    <p><strong>Personas:</strong> ${data.people}</p>
    <p><strong>Fecha:</strong> ${data.date}</p>
    <p><strong>Hora:</strong> ${data.time}</p>
    <p><strong>Comentarios:</strong><br/>${data.comments.replace(/\n/g, "<br/>")}</p>
  `;

  await transporter.sendMail({
    from: RESERVATION_EMAIL_FROM,
    to: RESERVATION_EMAIL_TO,
    replyTo: data.email,
    subject,
    text,
    html
  });
}
