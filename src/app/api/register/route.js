import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const POST = async (request = Request) => {
  const body = await request.json();
  const { email, name, password } = body;

  try {
    debugger;
    await sql`CREATE TABLE IF NOT EXISTS smart-users(
      id SERIAL PRIMARY KEY,
      email text UNIQUE,
      name text,
      password text,
      entries INT DEFAULT 0,
      joined text
      );`;

    const emailExist =
      await sql`SELECT FROM smart-users WHERE email = ${email}`;

    if (emailExist.rowCount)
      return NextResponse.json(
        { error: "Email already exist" },
        { status: 422 }
      );

    const hash = await bcrypt.hash(password, 10);

    const result =
      await sql`INSERT INTO smart-users(email, name, password, joined) values (${email}, ${name}, ${hash}, ${new Date()}) RETURNING *`;

    const token = jwt.sign(result.rows[0], "secretkey");

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.log("HERE IN status: 500 ");
    console.log({
      POSTGRES_URL: process.env.POSTGRES_URL,
      POSTGRES_URL_NON_POOLING: process.env.POSTGRES_URL_NON_POOLING,
    });
    return NextResponse.json(
      { error: error, message: error?.message },
      { status: 500 }
    );
  }
};
