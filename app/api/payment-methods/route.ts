// app/api/payment-methods/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma"; // імпорт як у твоїх інших route

// GET /api/payment-methods?userId=1
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId is required" }, { status: 400 });
  }

  const methods = await prisma.paymentMethod.findMany({
    where: { userId: Number(userId) },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ methods });
}

// POST /api/payment-methods
export async function POST(req: Request) {
  const body = await req.json();

  const { userId, brand, last4, expMonth, expYear, holder } = body;

  if (!userId || !brand || !last4 || !expMonth || !expYear || !holder) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const method = await prisma.paymentMethod.create({
    data: {
      userId,
      brand,
      last4,
      expMonth,
      expYear,
      holder,
    },
  });

  return NextResponse.json({ method }, { status: 201 });
}
