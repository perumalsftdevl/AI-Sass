import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkSubscription } from "@/lib/subscription";
import { incrementApiLimit, checkApiLimit } from "@/lib/api-limit";

import OpenAI from "openai";
import { CreateChatCompletionRequestMessage } from "openai/resources/index.mjs";

const openai = new OpenAI({
  apiKey: process.env["OPEN_API_KEY"], // This is the default and can be omitted
});

const instructionMessage: CreateChatCompletionRequestMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown code snippets. Use code comments for explanations.",
};
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

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse(
        "Free trial has expired. Please upgrade to pro.",
        { status: 403 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [instructionMessage, ...messages],
    });
    if (!isPro) {
      await incrementApiLimit();
    }
    return NextResponse.json(response.choices[0].message); // Return the completion text as a response
  } catch (error) {
    console.log("code error", error);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
