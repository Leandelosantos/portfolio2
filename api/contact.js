// api/contact.js — SRS §4.6 — Canal 1 (Formulario), envío server-side
// Vercel Function (Node.js runtime por default) — Web Standard Request/Response
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "JSON inválido" }, { status: 400 });
  }

  const { name, email, message } = body ?? {};

  if (!name || !email || !message || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Datos inválidos" }, { status: 400 });
  }

  try {
    await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: "leandrodelosantos@gmail.com",
      replyTo: email,
      subject: `Nuevo mensaje de ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("resend send failed:", err);
    return Response.json({ error: "No se pudo enviar" }, { status: 500 });
  }
}
