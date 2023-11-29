import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export const PUT = async (request) => {
  const body = await request.json();

  const { id } = body;

  try {
    const result =
      await sql`UPDATE smart_users SET entries = entries + 1 WHERE id = ${id} RETURNING entries`;

    return NextResponse.json(
      { count: result.rows[0].entries },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
