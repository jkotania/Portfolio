// app/api/send/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

// Inicjalizacja instancji Resend z kluczem API przechowywanym w zmiennych środowiskowych
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Parsowanie danych JSON z żądania
    const { name, email, message } = await request.json();

    // Wysyłka e-maila przy użyciu Resend
    const data = await resend.emails.send({
      from: "contact@jkotania.tech",
      to: "portfoliojankotania@gmail.com",
      subject: "Formularz kontaktowy ze strony portfolio",
      html: `
          <p>Imię: ${name}</p>
          <p>Email: ${email}</p>
          <p>Wiadomość: ${message}</p>
        `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Błąd wysyłki e-maila:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
