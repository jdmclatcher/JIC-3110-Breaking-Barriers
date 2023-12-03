import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const per_id = searchParams.get("per_id");

    const { data, error } = await supabase.from("messages").select("*");

    if (error) {
      console.log("Error getting messages: ", error.message);
      return NextResponse.json(
        { message: "Failed to get messages" },
        { status: 400 }
      );
    }

    return NextResponse.json({ messageList: data }, { status: 200 });
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}
