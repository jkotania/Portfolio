import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const requestLog = new Map();
const COOLDOWN_PERIOD = 5 * 60 * 1000;

// Dodajemy obsługę CORS
const setCorsHeaders = (response) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
};

export async function POST(req) {
  try {
    // Handle CORS preflight
    if (req.method === "OPTIONS") {
      const response = new NextResponse(null, { status: 204 });
      setCorsHeaders(response);
      return response;
    }

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();

    if (requestLog.has(ip)) {
      const lastRequest = requestLog.get(ip);
      if (now - lastRequest < COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil(
          (COOLDOWN_PERIOD - (now - lastRequest)) / 1000 / 60
        );
        const response = NextResponse.json(
          {
            error: `Please wait ${remainingTime} minute${
              remainingTime > 1 ? "s" : ""
            } before sending another message.`,
          },
          { status: 429 }
        );
        setCorsHeaders(response);
        return response;
      }
    }

    const { name, email, message } = await req.json();

    // Walidacja danych
    if (!name || !email || !message) {
      const response = NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
      setCorsHeaders(response);
      return response;
    }

    const emailData = await resend.emails.send({
      from: "Contact Form <contact@jkotania.tech>",
      to: ["portfoliojankotania@gmail.com"],
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      reply_to: email,
    });

    requestLog.set(ip, now);

    // Cleanup old entries
    const currentTime = Date.now();
    requestLog.forEach((value, key) => {
      if (currentTime - value > COOLDOWN_PERIOD) {
        requestLog.delete(key);
      }
    });

    const response = NextResponse.json({ success: true, data: emailData });
    setCorsHeaders(response);
    return response;
  } catch (error) {
    console.error("Error:", error);
    const response = NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
    setCorsHeaders(response);
    return response;
  }
}

export async function OPTIONS() {
  const response = new NextResponse(null, { status: 204 });
  setCorsHeaders(response);
  return response;
}
