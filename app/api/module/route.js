import { supabase } from "@/lib/initSupabase";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const administrator_id = searchParams.get("administrator_id");

    const { data, error } = await supabase
      .from("modules")
      .select("*")
      .eq("administrator_id", administrator_id);

    if (error) {
      console.log("Error getting modules: ", error.message);
      return NextResponse.json(
        { message: "Failed to get modules" },
        { status: 400 }
      );
    }

    return NextResponse.json({ moduleList: data }, { status: 200 });
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
    const { administrator_id, module_title, module_details, instructor_id } =
      await request.json();

    console.log(administrator_id, module_title, module_details, instructor_id);

    const { data, error } = await supabase.rpc(
      "f_create_module_and_assign_instructor",
      {
        i_admin_id: administrator_id,
        i_module_title: module_title,
        i_module_details: module_details,
        i_instructor_id: instructor_id,
      }
    );

    if (error) {
      let errorMessage = `Error creating module: ${error.message}`;
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      { message: `${module_title} created successfully` },
      { status: 200 }
    );
  } catch (e) {
    console.log("Unexpected error:", e.message);
    return NextResponse.json(
      { message: "An unexpected error occurred" },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    const { module_id } = await request.json();
    const { data, error } = await supabase.rpc("f_delete_module", {
      i_module_id: module_id,
    });

    if (error) {
      console.log("Error deleting module:", error.message);
      return NextResponse.json(
        { message: "Failed to delete module" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Successfully deleted module" },
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
