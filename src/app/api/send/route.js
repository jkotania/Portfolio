import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const requestLog = new Map();
const COOLDOWN_PERIOD = 5 * 60 * 1000;

// Add CORS headers
const setCorsHeaders = (response) => {
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
};

export async function POST(req) {
  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    const now = Date.now();

    if (requestLog.has(ip)) {
      const lastRequest = requestLog.get(ip);
      if (now - lastRequest < COOLDOWN_PERIOD) {
        const remainingTime = Math.ceil(
          (COOLDOWN_PERIOD - (now - lastRequest)) / 1000 / 60
        );
        return setCorsHeaders(
          NextResponse.json(
            {
              error: `Please wait ${remainingTime} minute${
                remainingTime > 1 ? "s" : ""
              } before sending another message.`,
            },
            { status: 429 }
          )
        );
      }
    }

    const { name, email, message } = await req.json();

    // Validation
    if (!name || !email || !message) {
      return setCorsHeaders(
        NextResponse.json({ error: "All fields are required" }, { status: 400 })
      );
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

    return setCorsHeaders(
      NextResponse.json({ success: true, data: emailData })
    );
  } catch (error) {
    console.error("Error:", error);
    return setCorsHeaders(
      NextResponse.json({ error: "Internal server error" }, { status: 500 })
    );
  }
}

// Handle OPTIONS preflight requests properly
export async function OPTIONS() {
  return setCorsHeaders(new NextResponse(null, { status: 204 }));
}
