import { NextResponse } from "next/server";

type Data = {
  name: string;
};

export async function GET() {
  return NextResponse.json<Data>({ name: "John Doe" });
}