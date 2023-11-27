import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";

export async function POST(request) {
  try {
    const { instructor_id, file_name, file_url } = await request.json();
    const { data, error } = await supabase.rpc("f_upload_file", {
      p_instructor_id: instructor_id,
      p_file_name: file_name,
      p_file_url: file_url,
    });

    if (error) {
      console.error("Error uploading file: ", error.message);
      return NextResponse.json(
        { message: "Failed to upload file" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: `${file_name} successfully uploaded` },
      { status: 200 }
    );
  } catch (e) {
    console.error("Unexpected error: ", e.message);
    return NextResponse.json({ message: "Unexpected error" }, { status: 400 });
  }
}
