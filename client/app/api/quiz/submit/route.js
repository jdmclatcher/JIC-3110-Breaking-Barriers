import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function POST(request) {
  try {
    const { trainee_id, quiz_id, question_responses } = await request.json();
    const { data, error } = await supabase.rpc("f_submit_quiz", {
      i_trainee_id: trainee_id,
      i_quiz_id: quiz_id,
      i_question_responses_json: question_responses,
    });

    if (error) {
      console.error("Failed to submit quiz: ", error.message);
      return NextResponse.json(
        { message: "Failed to submit quiz" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Quiz successfully submitted" },
      { status: 200 }
    );
  } catch (e) {
    console.error("Unexpected error: ", e.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
