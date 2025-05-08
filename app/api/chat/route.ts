import { NextResponse } from "next/server";

// This is a mock implementation since we're using external API endpoints
export async function GET(request: Request) {
  const url = new URL(request.url);
  const conversationId = url.pathname.split("/").pop();

  return NextResponse.json({
    message: `This is a proxy endpoint. Use the direct endpoint at http://192.168.16.185:3001/chat/history/${conversationId}`,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return NextResponse.json({
    message:
      "This is a proxy endpoint. Use the direct endpoint at http://192.168.16.185:3001/chat",
    receivedData: body,
  });
}
