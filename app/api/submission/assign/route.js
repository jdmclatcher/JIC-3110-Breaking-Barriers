import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function POST(request) {
  try {
    const { trainee_id, quiz_id, score } = await request.json();
    console.log(trainee_id, quiz_id, score);

    const { data, error } = await supabase
      .from("quiz_responses")
      .update({ quiz_score: score })
      .eq("quiz_id", quiz_id)
      .eq("trainee_id", trainee_id);
    console.log(error);
    if (error) {
      console.log("Failed to assign score: ", error.message);
      return NextResponse.json(
        { message: "Failed to assign score" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Score successfully assigned" },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
