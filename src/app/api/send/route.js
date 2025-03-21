import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Prosta mapa do przechowywania IP i czasu ostatniego żądania
const requestLog = new Map();
const COOLDOWN_PERIOD = 5 * 60 * 1000; // 5 minut

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
      return NextResponse.json(
        {
          error: `Please wait ${remainingTime} minutes before sending another message.`,
        },
        { status: 429 }
      ); // Too Many Requests
    }

    const { name, email, message } = await req.json();

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["portfoliojankotania@gmail.com"],
      subject: `Formularz kontaktowy ze strony portfolio od ${name}`,
      text: `
                Name: ${name}
                Email: ${email}
                Message: ${message}
            `,
    });

    // Zapisz czas żądania dla danego IP
    requestLog.set(ip, now);

    // Okresowo czyść starsze wpisy (opcjonalne)
    if (requestLog.size > 10000) {
      // Limit wielkości mapy
      const oldEntries = Array.from(requestLog.entries()).filter(
        ([_, timestamp]) => now - timestamp > COOLDOWN_PERIOD
      );
      oldEntries.forEach(([key]) => requestLog.delete(key));
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
