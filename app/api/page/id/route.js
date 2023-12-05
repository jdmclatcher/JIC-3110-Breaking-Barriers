import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const page_id = searchParams.get("page_id");

    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("page_id", page_id);

    if (error) {
      console.log("Error getting page: ", error.message);
      return NextResponse.json(
        { message: "Failed to get page" },
        { status: 400 }
      );
    }

    return NextResponse.json({ pageData: data, status: 200 });
  } catch (e) {
    console.log("Unexpected error: ", error.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
