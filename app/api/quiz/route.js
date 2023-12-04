import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const module_id = searchParams.get("module_id");

    const { data, error } = await supabase
      .from("quizzes")
      .select("*")
      .eq("module_id", module_id);

    if (error) {
      console.log("Failed to fetch quizzes: ", error.message);
      return NextResponse.json(
        { message: "Failed to fetch quizzes" },
        { status: 400 }
      );
    }

    return NextResponse.json({ quizList: data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    let {
      instructor_id,
      quiz_title,
      quiz_description,
      quiz_questions,
      module_id,
      course_id,
    } = await request.json();

    if (course_id === "") {
      course_id = null;
    }

    const { data, error } = await supabase.rpc("f_create_quiz", {
      p_instructor_per_id: instructor_id,
      p_title: quiz_title,
      p_description: quiz_description,
      p_questions: quiz_questions,
      p_module_id: module_id,
      p_course_id: course_id,
    });

    if (error) {
      let errorMessage = `Error creating quiz: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      { message: `${quiz_title} created successfully` },
      { status: 200 }
    );
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}

export async function PATCH(request) {
  try {
    let {
      quiz_id,
      quiz_title,
      quiz_description,
      quiz_questions,
      module_id,
      course_id,
    } = await request.json();

    if (course_id === "") {
      course_id = null;
    }

    const { data, error } = await supabase.rpc("f_edit_quiz", {
      p_quiz_id: quiz_id,
      p_title: quiz_title,
      p_description: quiz_description,
      p_questions: quiz_questions,
      p_module_id: module_id,
      p_course_id: course_id,
    });

    if (error) {
      let errorMessage = `Error editing quiz: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      { message: `${quiz_title} edited successfully` },
      { status: 200 }
    );
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const quiz_id = searchParams.get("quiz_id");

    const { data, error } = await supabase.rpc("f_delete_quiz", {
      i_quiz_id: quiz_id,
    });

    if (error) {
      let errorMessage = `Error deleting quiz: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Quiz deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
