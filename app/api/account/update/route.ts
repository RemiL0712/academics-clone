import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      name,
      email,
      currentPassword,
      newPassword,
    }: {
      userId: number;
      name: string;
      email: string;
      currentPassword?: string | null;
      newPassword?: string | null;
    } = body;

    if (!userId || !name || !email) {
      return NextResponse.json(
        { error: "userId, name and email are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    const updateData: any = {
      name: String(name),
      email: String(email),
    };

    // Якщо користувач хоче змінити пароль
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json(
          { error: "Current password is required to change password." },
          { status: 400 }
        );
      }

      const isValid = await bcrypt.compare(currentPassword, user.password);
      if (!isValid) {
        return NextResponse.json(
          { error: "Current password is incorrect." },
          { status: 400 }
        );
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      updateData.password = hashed;
    }

    const updated = await prisma.user.update({
      where: { id: user.id },
      data: updateData,
    });

    return NextResponse.json(
      {
        user: {
          id: updated.id,
          name: updated.name,
          email: updated.email,
        },
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Account update error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
