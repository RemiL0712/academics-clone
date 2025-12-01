import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/address?userId=1
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "userId is required" },
        { status: 400 }
      );
    }

    const address = await prisma.address.findUnique({
      where: { userId: Number(userId) },
    });

    return NextResponse.json({ address }, { status: 200 });
  } catch (err) {
    console.error("Get address error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

// POST /api/address  (create/update)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      userId,
      firstName,
      lastName,
      company,
      country,
      street1,
      street2,
      city,
      postcode,
      phone,
      email,
    } = body;

    if (
      !userId ||
      !firstName ||
      !lastName ||
      !country ||
      !street1 ||
      !city ||
      !postcode ||
      !phone ||
      !email
    ) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    const data = {
      userId: Number(userId),
      firstName: String(firstName),
      lastName: String(lastName),
      company: company ? String(company) : null,
      country: String(country),
      street1: String(street1),
      street2: street2 ? String(street2) : null,
      city: String(city),
      postcode: String(postcode),
      phone: String(phone),
      email: String(email),
    };

    // upsert по userId (одна адреса на юзера)
    const address = await prisma.address.upsert({
      where: { userId: data.userId },
      create: data,
      update: data,
    });

    return NextResponse.json({ address }, { status: 200 });
  } catch (err) {
    console.error("Save address error:", err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
