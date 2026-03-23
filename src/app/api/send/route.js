import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const requestLog = new Map();
const COOLDOWN_PERIOD = 5 * 60 * 1000;

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for") || "unknown";

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
      );
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

    requestLog.set(ip, now);

    if (requestLog.size > 10000) {
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
