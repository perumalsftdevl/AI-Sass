import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { prompt, amount = 1, resolution = "512x512" } = body;

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    // if (typeof amount !== "number" || amount < 1) {
    //   return new NextResponse("Amount should be a positive number", {
    //     status: 400,
    //   });
    // }

    // Additional validation for resolution if needed
    console.log("prompt", prompt);
    const response = await openai.images.generate({
      prompt,
      n: Number(amount),
      size: resolution,
      quality: "hd",
    });

    // Assuming response is always an array and contains at least one item
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
