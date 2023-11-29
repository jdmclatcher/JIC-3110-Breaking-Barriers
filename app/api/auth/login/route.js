import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";
import bcrypt from "bcrypt";

const MAX_AGE = 60 * 60 * 24;

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    let { data, error } = await supabase
      .from("person")
      .select("*")
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
    delete data[0]["password"];
    const isValid = bcrypt.compareSync(password, storedPassword);
    if (!isValid) {
      return NextResponse.json(
        {
          message: "Please check your credentials",
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Login successful", ...data[0] },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
  }
}
