import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  // const body = await request.json();
  // const query = request.query
  // const { id } = body;
  const { id } = params;

  try {
    const user = await sql`SELECT * FROM smart_users where id = ${id}`;

    if (user.rowCount === 0)
      return NextResponse.json({ error: "User not found" }, { status: 404 });

    return NextResponse.json({ user: user.rows[0] }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
