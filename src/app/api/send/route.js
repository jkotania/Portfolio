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

    // Bezpieczne parsowanie JSON
    let body;
    try {
      body = await req.json();
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      return addCorsHeaders(
        NextResponse.json({ error: "Invalid JSON format" }, { status: 400 })
      );
    }

    // Sprawdź czy mamy wszystkie wymagane pola
    const { name, email, message } = body || {};

    if (!name || !email || !message) {
      return addCorsHeaders(
        NextResponse.json(
          { error: "Missing required fields: name, email, and message" },
          { status: 400 }
        )
      );
    }

    console.log("Sending email with data:", { name, email, message });

    // Wysyłka emaila
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

    console.log("Email sent successfully:", data);

    // Zapisz czas żądania dla danego IP
    requestLog.set(ip, now);

    return addCorsHeaders(NextResponse.json({ success: true, data }));
  } catch (error) {
    console.error("Error sending email:", error);
    return addCorsHeaders(
      NextResponse.json(
        { error: "Failed to send email", details: error.message },
        { status: 500 }
      )
    );
  }
}

// Obsługa preflight CORS
export async function OPTIONS() {
  return addCorsHeaders(NextResponse.json({}, { status: 200 }));
}
