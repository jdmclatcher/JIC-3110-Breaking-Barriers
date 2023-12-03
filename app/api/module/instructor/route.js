import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const instructor_id = searchParams.get("instructor_id");

    const { data, error } = await supabase
      .from("modules")
      .select("module_id, title")
      .eq("instructor_id", instructor_id);

    if (error) {
      console.log("Error getting modules: ", error.message);
      return NextResponse.json(
        { message: "Failed to get modules" },
        { status: 400 }
      );
    }

    return NextResponse.json({ moduleList: data }, { status: 200 });
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
