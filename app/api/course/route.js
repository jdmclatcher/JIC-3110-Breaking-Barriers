import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const module_id = searchParams.get("module_id");

    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("module_id", module_id);

    if (error) {
      console.log("Error getting courses: ", error.message);
      return NextResponse.json(
        { message: "Failed to get courses" },
        { status: 400 }
      );
    }

    return NextResponse.json({ courseList: data }, { status: 200 });
  } catch (e) {
    console.log(e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}

export async function POST(request) {
  try {
    const { instructor_id, module_id, course_title, course_description } =
      await request.json();

    const { data, error } = await supabase.rpc("f_create_course", {
      i_instructor_id: instructor_id,
      i_module_id: module_id,
      i_course_title: course_title,
      i_course_description: course_description,
    });

    if (error) {
      let errorMessage = `Error create course: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      { message: `${course_title} created successfully` },
      { status: 200 }
    );
  } catch (e) {
    console.log(e.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const course_id = searchParams.get("course_id");

    const { data, error } = await supabase.rpc("f_delete_course", {
      i_course_id: course_id,
    });

    if (error) {
      console.log("Error deleting course");
      return NextResponse.json(
        { message: "Failed to delete course" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
