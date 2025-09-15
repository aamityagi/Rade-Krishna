import { NextResponse } from "next/server";

export async function GET(req: Request) {
  // after login, redirect user to dashboard
  return NextResponse.redirect(new URL("/dashboard", req.url));
}
