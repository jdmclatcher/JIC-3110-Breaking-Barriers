import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const quiz_id = searchParams.get("quiz_id");
    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("quiz_id", quiz_id)
      .single();

    if (error) {
      console.log("Failed to fetch questions: ", error.message);
      return NextResponse.json(
        { message: "Failed to fetch questions" },
        { status: 400 }
      );
    }

    return NextResponse.json({ ...data }, { status: 200 });
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
