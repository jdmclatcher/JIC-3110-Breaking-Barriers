import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("person")
      .select("first_name, last_name, per_id")
      .eq("role", "instructor");

    if (error) {
      console.log("Error getting instructors: ", error.message);
      return NextResponse.json({ message: "Failed to get instructors" });
    }

    return NextResponse.json({ instructorList: data }, { status: 200 });
  } catch (e) {
    console.log("Unexpected error: ", error.message);
    return NextResponse.json({ message: e.message }, { status: 400 });
  }
}
