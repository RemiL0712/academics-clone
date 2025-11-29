import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    const rawId = body?.orderId;
    const orderId = Number(rawId);

    if (!rawId || Number.isNaN(orderId)) {
      return NextResponse.json(
        { error: "Invalid order id" },
        { status: 400 }
      );
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: { status: "paid" },
    });

    return NextResponse.json({ order }, { status: 200 });
  } catch (err: any) {
    console.error("Pay order error", err);

    if (err?.code === "P2025") {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
