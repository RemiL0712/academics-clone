import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name =
      typeof body.name === "string" ? body.name.trim() : "";
    const email =
      typeof body.email === "string" ? body.email.trim() : "";
    const password =
      typeof body.password === "string" ? body.password.trim() : "";

    if (!email || !password) {
      return NextResponse.json(
        { error: "Please fill all fields" },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hash,
        // 🔥 тут використовуємо name з форми, якщо він є
        name: name || email.split("@")[0] || "User",
      },
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return NextResponse.json(
      { user: safeUser },
      { status: 201 }
    );
  } catch (err) {
    console.error("Register error", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
