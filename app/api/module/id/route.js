import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const module_id = searchParams.get("module_id");

    const { data, error } = await supabase
      .from("module_details")
      .select("*")
      .eq("module_id", module_id);

    if (!data || error) {
      console.log("Error getting module: ", error.message);
      return NextResponse.json(
        { message: "Failed to get module" },
        { status: 400 }
      );
    }

    return NextResponse.json({ moduleData: data[0] }, { status: 200 });
  } catch (e) {
    console.log("Unexpected error: ", error.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
