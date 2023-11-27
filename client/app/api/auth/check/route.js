import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function GET() {
  const cookieStore = cookies();

  const token = cookieStore.get("BreakingJWT");
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { value } = token;
  const secret = process.env.JWT_SECRET || "";
  try {
    verify(value, secret);

    const response = {
      user: "Secret User",
    };
    return NextResponse.json(response, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 }
    );
  }
}
