import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Prosta mapa do przechowywania IP i czasu ostatniego żądania
const requestLog = new Map();
const COOLDOWN_PERIOD = 5 * 60 * 1000; // 5 minut

// Helper dodający nagłówki CORS do odpowiedzi
function addCorsHeaders(response) {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

export async function POST(req) {
  try {
    // Pobierz IP użytkownika (w Next.js 13+)
    const ip = req.headers.get("x-forwarded-for") || "unknown";

    // Sprawdź limit czasowy dla danego IP
    const lastRequest = requestLog.get(ip);
    const now = Date.now();

    if (lastRequest && now - lastRequest < COOLDOWN_PERIOD) {
      const remainingTime = Math.ceil(
        (COOLDOWN_PERIOD - (now - lastRequest)) / 1000 / 60
      );
      return addCorsHeaders(
        NextResponse.json(
          {
            error: `Please wait ${remainingTime} minutes before sending another message.`,
          },
          { status: 429 }
        )
      );
    }

    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: ["portfoliojankotania@gmail.com"],
      subject: `New message from ${name}`,
      text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
    });

    // Zapisz czas żądania dla danego IP
    requestLog.set(ip, now);

    return addCorsHeaders(NextResponse.json({ success: true, data }));
  } catch (error) {
    console.error("Error sending email:", error);
    return addCorsHeaders(
      NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    );
  }
}

// Obsługa preflight CORS
export function OPTIONS() {
  return addCorsHeaders(new NextResponse(null, { status: 204 }));
}
