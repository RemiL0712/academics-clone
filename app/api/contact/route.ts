import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message, token } = await req.json();

    // ⬇️ тимчасовий прапорець — можна керувати з env
    const SKIP_RECAPTCHA = process.env.SKIP_RECAPTCHA === "true";

    // 1) Перевірка reCAPTCHA (можна пропустити на час дебагу)
    if (!SKIP_RECAPTCHA) {
      const verifyRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
        { method: "POST" }
      );

      const verifyData = await verifyRes.json();
      console.log("reCAPTCHA verifyData:", verifyData);

      if (!verifyData.success) {
        console.log("reCAPTCHA failed, error-codes:", verifyData["error-codes"]);
        return NextResponse.json(
          { error: "Captcha verification failed" },
          { status: 400 }
        );
      }
    } else {
      console.log("reCAPTCHA skipped by SKIP_RECAPTCHA env");
    }

    // 2) Відправка листа
    console.log("MAIL_HOST:", process.env.MAIL_HOST);
    console.log("MAIL_PORT:", process.env.MAIL_PORT);
    console.log("MAIL_USER exists:", !!process.env.MAIL_USER);
    console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.MAIL_USER,
        to: process.env.MAIL_TO,
        subject: "New contact form message",
        text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
      });
      console.log("Email sent OK");
    } catch (e) {
      console.error("sendMail error:", e);
      return NextResponse.json({ error: "Email send error" }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
