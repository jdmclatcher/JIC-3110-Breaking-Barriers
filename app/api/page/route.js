import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const course_id = searchParams.get("course_id");

    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("course_id", course_id);

    if (error) {
      console.log("Error getting pages: ", error.message);
      return NextResponse.json(
        { message: "Failed to get pages" },
        { status: 400 }
      );
    }

    return NextResponse.json({ pageList: data, status: 200 });
  } catch (e) {
    console.log("Unexpected error: ", error.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}

export async function POST(request) {
  try {
    const { instructor_id, course_id, page_title, page_content } =
      await request.json();

    const { data, error } = await supabase.rpc("create_page", {
      i_page_content: page_content,
      i_course_id: course_id,
      i_instructor_id: instructor_id,
      i_page_title: page_title,
    });

    if (error) {
      let errorMessage = `Error creating page: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json({
      message: `Page created successfully`,
      status: 200,
    });
  } catch (e) {
    console.log("Unexpected error:", e.message);
    return NextResponse.json({
      message: "An unexpected error occurred",
      status: 400,
    });
  }
}
