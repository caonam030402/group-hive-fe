import { GoogleGenerativeAI } from "@google/generative-ai";
import { Ratelimit } from "@upstash/ratelimit";
import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export const runtime = "edge";

export async function POST(req: Request): Promise<Response> {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
    return new Response(
      "Missing GEMINI_API_KEY – make sure to add it to your .env file.",
      {
        status: 400,
      },
    );
  }
  if (
    process.env.NODE_ENV !== "development" &&
    process.env.KV_REST_API_URL &&
    process.env.KV_REST_API_TOKEN
  ) {
    const ip = req.headers.get("x-forwarded-for");
    const ratelimit = new Ratelimit({
      redis: kv,
      limiter: Ratelimit.slidingWindow(50, "1 d"),
    });

    const { success, limit, reset, remaining } = await ratelimit.limit(
      `noteblock_ratelimit_${ip}`,
    );

    if (!success) {
      return new Response("You have reached your request limit for the day.", {
        status: 429,
        headers: {
          "X-RateLimit-Limit": limit.toString(),
          "X-RateLimit-Remaining": remaining.toString(),
          "X-RateLimit-Reset": reset.toString(),
        },
      });
    }
  }

  const { prompt } = await req.json();

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContentStream({
    contents: [
      {
        role: "user",
        parts: [
          {
            text:
              "You are an AI writing assistant that continues existing text based on context from prior text. " +
              "Give more weight/priority to the later characters than the beginning ones. " +
              "Limit your response to no more than 200 characters, but make sure to construct complete sentences.",
          },
          {
            text: prompt,
          },
        ],
      },
    ],
    generationConfig: {
      temperature: 0.7,
      topP: 1,
      topK: 1,
    },
  });

  const generatedText = (await result.response).text();

  return NextResponse.json({ tweet: generatedText });
}
