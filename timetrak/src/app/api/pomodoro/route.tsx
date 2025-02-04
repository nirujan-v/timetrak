import { NextResponse } from "next/server";


export async function POST(request: Request) {
  const body = await request.json();
  const { userId = "default", completedPomodoros, date } = body;

  if (!completedPomodoros || !date) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    // Insert data into your database
    await db.query(
      "INSERT INTO pomodoros (user_id, date, sessions_completed) VALUES ($1, $2, $3)",
      [userId, date, completedPomodoros]
    );
    return NextResponse.json({ message: "Session logged successfully!" }, { status: 201 });
  } catch (error) {
    console.error("Error logging session:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}