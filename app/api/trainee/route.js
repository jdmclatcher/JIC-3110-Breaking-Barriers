import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function GET(request) {
  try {
    const { data, error } = await supabase
      .from("person")
      .select("per_id, email, first_name, last_name")
      .eq("role", "trainee");

    if (error) {
      console.log("Failed to fetch trainees: ", error.message);
      return NextResponse.json(
        { message: "Failed to fetch trainees" },
        { status: 400 }
      );
    }

    return NextResponse.json({ traineeList: data }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
