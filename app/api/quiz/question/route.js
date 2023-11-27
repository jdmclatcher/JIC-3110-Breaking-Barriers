import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const quiz_id = searchParams.get("quiz_id");

    let { data, error } = await supabase
      .from("view_questions_and_options_for_quiz")
      .select("*")
      .eq("quiz_id", quiz_id);

    if (error) {
      console.error("Failed to fetch questions:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch quiz questions" },
        { status: 400 }
      );
    }
    const questionsData = {};
    data.forEach((q) => {
      if (!questionsData.hasOwnProperty(q.question_id)) {
        questionsData[q.question_id] = {
          question_id: q.question_id,
          question_text: q.question_text,
          question_type: q.question_type,
          options: [],
        };
      }
      questionsData[q.question_id].options.push({
        option_id: q.option_id,
        option_text: q.option_text,
      });
    });

    return NextResponse.json(
      { questionList: Object.values(questionsData) },
      { status: 200 }
    );
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
