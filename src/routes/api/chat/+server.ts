import type { Config } from "@sveltejs/adapter-vercel";
import { redirect } from "@sveltejs/kit";
import { OPENAI_API_KEY } from "$env/static/private";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { Configuration, OpenAIApi } from "openai-edge";

import type { RequestHandler } from "./$types";

const openAiConfig = new Configuration({
  apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(openAiConfig);

export const POST = (async ({ request, locals: { getSession } }) => {
  const json = await request.json();
  const { messages } = json;
  const session = await getSession();
  if (!session?.user) {
    throw redirect(302, `/auth/sign-in`);
  }

  // Create an OpenAI API client

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.7,
    stream: true,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}) satisfies RequestHandler;
