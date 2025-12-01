import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Тип контексту для Next 13+/16
type RouteContext = {
  params?: {
    id?: string | string[];
  };
};

export async function GET(req: Request, context: RouteContext) {
  try {
    // 1) Пробуємо взяти id з params
    let rawFromParams = context.params?.id;

    if (Array.isArray(rawFromParams)) {
      rawFromParams = rawFromParams[0];
    }

    // 2) Дублюємо — витягуємо id з URL на всякий випадок
    const url = new URL(req.url);
    const segments = url.pathname.split("/").filter(Boolean); // ["api","orders","10"]
    const rawFromPath = segments[segments.length - 1];

    const rawId = rawFromParams ?? rawFromPath;
    const id = rawId ? Number(rawId) : NaN;

    if (!rawId || Number.isNaN(id)) {
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
