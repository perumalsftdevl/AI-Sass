import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { OpenAI } from "openai"; // Import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: any) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    console.log("messages", messages);

    if (!openai) {
      return new NextResponse("OpenAI not initialized", { status: 200 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const response = await openai.completions.create({
      model: "text-davinci-003", // Adjust the model according to your preference
      prompt: messages.map((msg: any) => ({ role: "user", content: msg })),
      max_tokens: 50,
      n: 1,
    });

    return new NextResponse(JSON.stringify(response.choices[0].text)); // Return the completion text as a response
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
