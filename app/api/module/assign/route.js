import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function POST(request) {
  try {
    const { trainee_id, module_id } = await request.json();

    const { data, error } = await supabase.rpc("assign_trainee_to_module", {
      i_trainee_id: trainee_id,
      i_module_id: module_id,
    });

    if (error) {
      console.error("Failed to assign trainee: ", error.message);
      return NextResponse.json(
        { message: "Failed to assign trainee" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Trainee successfully assigned" },
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
