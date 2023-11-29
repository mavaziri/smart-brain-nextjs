import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const body = await request.json();
  const { email, password } = body;

  try {
    const user = await sql`SELECT * from smart_users where email = ${email}`;

    if (user.rowCount === 0)
      return NextResponse.json(
        { error: "User doesn't exist" },
        { status: 404 }
      );

    const result = await bcrypt.compare(password, user.rows[0].password);

    if (!result)
      return NextResponse.json(
        { error: "Password not matched" },
        { status: 401 }
      );

    const token = jwt.sign(user.rows[0], "secretkey");

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.log("errorr :", error);
    return NextResponse.json({ error }, { status: 500 });
  }
};
