import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Helper function to add CORS headers
function corsResponse(body, status = 200) {
  const response = NextResponse.json(body, { status });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type");
  return response;
}

// Handle OPTIONS requests (CORS preflight)
export async function OPTIONS() {
  return corsResponse(null, 204);
}

// Handle POST requests
export async function POST(req) {
  try {
    // Parse the request body
    const body = await req.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return corsResponse({ error: "All fields are required" }, 400);
    }

    // Send email using Resend
    const emailData = await resend.emails.send({
      from: "Contact Form <contact@jkotania.tech>",
      to: ["portfoliojankotania@gmail.com"],
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      reply_to: email,
    });

    // Return success response
    return corsResponse({ success: true, data: emailData });
  } catch (error) {
    console.error("Email sending error:", error);
    return corsResponse({ error: "Failed to send message" }, 500);
  }
}
