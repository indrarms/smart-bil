import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const isValid = await bcrypt.compare(
    password,
    user.password
  );

  if (!isValid) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 401 }
    );
  }

  const res = NextResponse.json({
    role: user.role,
  });

  // ✅ SET COOKIES
  res.cookies.set("userId", user.id, {
    httpOnly: true,
    path: "/",
  });

  res.cookies.set("role", user.role, {
    httpOnly: true,
    path: "/",
  });

  return res;
}
