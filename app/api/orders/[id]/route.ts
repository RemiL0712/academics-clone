import { NextResponse, type NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/orders/[id]
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // ⬇️ У Next 16 params — це Promise
    const { id: idStr } = await params;
    const id = Number(idStr);

    if (!idStr || Number.isNaN(id)) {
      return NextResponse.json(
        { error: "Invalid order id" },
        { status: 400 }
      );
    }

    const order = await prisma.order.findUnique({
      where: { id },
    });

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ order }, { status: 200 });
  } catch (err) {
    console.error("Error loading order:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
