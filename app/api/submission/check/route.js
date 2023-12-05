import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const quiz_id = searchParams.get("quiz_id");
    const trainee_id = searchParams.get("trainee_id");

    const { data, error } = await supabase
      .from("quiz_responses")
      .select("*")
      .eq("quiz_id", quiz_id)
      .eq("trainee_id", trainee_id);

    if (error) {
      console.log("Failed to fetch submissions: ", error.message);
      return NextResponse.json(
        { message: "Failed to fetch submissions" },
        { status: 400 }
      );
    }

    if (data && data.length > 0) {
      console.log("Student already taken quiz");
      return NextResponse.json(
        { message: "You have already submitted." },
        { status: 401 }
      );
    }

    return NextResponse.json({ message: "No submission yet" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
