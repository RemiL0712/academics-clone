import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const SKIP_RECAPTCHA = process.env.SKIP_RECAPTCHA === "true";

    // 1) Перевірка reCAPTCHA (можна вимкнути через SKIP_RECAPTCHA=true)
    if (!SKIP_RECAPTCHA) {
      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        { method: "POST" }
      );

      const verifyData = await verifyRes.json();
      console.log("reCAPTCHA verifyData:", verifyData);

      if (!verifyData.success) {
        console.log(
          "reCAPTCHA failed, error-codes:",
          verifyData["error-codes"]
        );
        return NextResponse.json(
          { error: "Captcha verification failed" },
          { status: 400 }
        );
      }
    } else {
      console.log("reCAPTCHA skipped by SKIP_RECAPTCHA env");
    }

    // 2) Відправка листа через Resend (HTTP API, без SMTP)
    try {
      const { data, error } = await resend.emails.send({
        from: "Website Contact <onboarding@resend.dev>",
        to: [process.env.MAIL_TO as string],
        subject: "New contact form message",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
        // reply_to: email,
      });

      if (error) {
        console.error("Resend email error:", error);
        return NextResponse.json(
          { error: "Email send error" },
          { status: 500 }
        );
      }

      console.log("Email sent OK via Resend:", data);
    } catch (e) {
      console.error("Resend sendMail error:", e);
      return NextResponse.json({ error: "Email send error" }, { status: 500 });
    }


    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
