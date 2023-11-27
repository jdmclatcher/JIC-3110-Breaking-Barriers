import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";
import { sign } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24;

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    let { data, error } = await supabase
      .from("person")
      .select("password")
      .eq("email", email);

    if (error || !data.length) {
      let errorMessage = error?.message || "Please check your credentials";
      console.log("Login failed:", errorMessage);
      return NextResponse.json(
        {
          message: errorMessage,
        },
        {
          status: 401,
        }
      );
    }
    const storedPassword = data[0].password;
    const isValid = bcrypt.compareSync(password, storedPassword);
    if (!isValid) {
      return NextResponse.json(
        {
          message: "Please check your credentials",
        },
        { status: 401 }
      );
    }

    const secret = process.env.JWT_SECRET || "";

    const token = sign({ email }, secret, { expiresIn: MAX_AGE });
    const serialized = serialize("BreakingJWT", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: MAX_AGE,
      path: "/",
    });

    return NextResponse.json(
      { message: "Login successful" },
      { status: 200, headers: { "Set-Cookie": serialized } }
    );
  } catch (e) {
    console.log(e);
  }
}
