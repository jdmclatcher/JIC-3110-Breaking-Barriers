import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const quiz_id = searchParams.get("quiz_id");

    const { data, error } = await supabase
      .from("trainee_single_quiz_score_view")
      .select("*")
      .eq("quiz_id", quiz_id)
      .order("trainee_last_name, trainee_first_name", { ascending: true });

    if (error) {
      console.log("Failed to fetch submissions: ", error.message);
      return NextResponse.json(
        { message: "Failed to fetch submissions" },
        { status: 400 }
      );
    }

    return NextResponse.json({ submissionList: data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
