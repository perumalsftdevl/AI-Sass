import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env["OPEN_API_KEY"], // This is the default and can be omitted
});

export async function POST(req: any) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    console.log("messages", messages);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!openai) {
      return new NextResponse("OpenAI not initialized", { status: 200 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.chat.completions.create({
      messages: messages,
      model: "gpt-3.5-turbo",
    });
    return NextResponse.json(response.choices[0].message); // Return the completion text as a response
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
