import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      userId,
      type,
      topic,
      deadline,
      pages,
      details,
      status,
    } = body;

    if (!userId || !type) {
      return NextResponse.json(
        { error: "userId and type are required" },
        { status: 400 }
      );
    }

    const order = await prisma.order.create({
      data: {
        userId: Number(userId),
        type: String(type),
        topic: topic ? String(topic) : null,
        deadline: deadline ? new Date(deadline) : null,
        pages: pages ? Number(pages) : 1,
        details: details ? String(details) : null,
        status: status ?? "pending",
      },
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (err) {
    console.error("Create order error", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("userId");

    // якщо userId немає — просто віддаємо всі ордери (для демо / адмінки)
    const where = userId ? { userId: Number(userId) } : undefined;

    const orders = await prisma.order.findMany({
      ...(where ? { where } : {}),
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders }, { status: 200 });
  } catch (err) {
    console.error("Get orders error", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
