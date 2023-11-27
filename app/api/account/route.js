import { NextResponse } from "next/server";
import { supabase } from "@/lib/initSupabase";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { userType, p_per_id, email, firstName, lastName, password } =
      await request.json();
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);

    let { data, error } = await supabase.rpc("f_create_person", {
      p_per_id,
      p_email: email,
      p_first_name: firstName,
      p_last_name: lastName,
      p_password: hash,
      p_role: userType,
    });

    if (error) {
      let errorMessage = error?.message || "Failed to create user";
      console.log(errorMessage);
      return NextResponse.json(
        {
          message: errorMessage,
        },
        { status: 400 }
      );
    }

    let queryString = "";
    let queryParameters = { p_per_id };

    if (userType === "admin") {
      queryString = "f_create_admin";
    } else if (userType === "instructor") {
      queryString = "f_create_instructor";
    } else if (userType === "trainee") {
      queryString = "f_create_trainee";
    }

    let { data: userTypeData, error: userTypeError } = await supabase.rpc(
      queryString,
      queryParameters
    );

    if (userTypeError) {
      errorMessage = userTypeError?.message || "No data returned";
      console.log(errorMessage);
      return NextResponse.json({ message: errorMessage }, { status: 400 });
    }

    return NextResponse.json(
      {
        message: `Account ${p_per_id} successfully created`,
      },
      { status: 200 }
    );
  } catch (e) {
    console.log(e);
    return NextResponse.json(
      {
        message: e,
      },
      { status: 500 }
    );
  }
}
