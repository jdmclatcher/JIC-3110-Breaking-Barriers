import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const per_id = searchParams.get("per_id");

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .eq("instructor_id", per_id);

    if (error) {
      console.log("Error getting messages: ", error.message);
      return NextResponse.json(
        { message: "Failed to get messages" },
        { status: 400 }
      );
    }

    return NextResponse.json({ messageList: data }, { status: 200 });
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
    const { message_content, instructor_id } = await request.json();

    const { data, error } = await supabase.rpc("f_post_message", {
      i_instructor_id: instructor_id,
      i_message_text: message_content,
    });

    if (error) {
      let errorMessage = `Error submitting message: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      { message: `Message submitted successfully` },
      { status: 200 }
    );
  } catch (e) {
    console.log("Unexpected error:", e.message);
    return NextResponse.json({
      message: "An unexpected error occurred",
      status: 400,
    });
  }
}

export async function PATCH(request) {
  try {
    const { message_id } = await request.json();
    const { data, error } = await supabase.rpc("f_resolve_message", {
      i_message_id: message_id,
    });

    if (error) {
      let errorMessage = `Error resolving message: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json({
      message: `Message resolved successfully`,
      status: 200,
    });
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}

export async function DELETE(request) {
  try {
    const { message_id } = await request.json();
    const { data, error } = await supabase.rpc("f_delete_message", {
      i_message_id: message_id,
    });

    if (error) {
      let errorMessage = `Error deleting message: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json({
      message: `Message deleted successfully`,
      status: 200,
    });
  } catch (e) {
    console.log("Unexpected error: ", e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
