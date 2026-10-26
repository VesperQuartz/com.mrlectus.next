import {
  chat,
  chatParamsFromRequest,
  toServerSentEventsResponse,
} from "@tanstack/ai";
import { createOllamaChat } from "@tanstack/ai-ollama";
import { env } from "@/env/server";

const adapter = createOllamaChat(
  env.OLLAMA_MODEL,
  env.OLLAMA_HOST ? { baseURL: env.OLLAMA_HOST } : undefined,
);

export const POST = async (request: Request) => {
  try {
    const { messages, threadId, runId } = await chatParamsFromRequest(request);

    const stream = chat({ adapter, messages, threadId, runId });

    return toServerSentEventsResponse(stream);
  } catch (error) {
    // `chatParamsFromRequest` throws a `Response` on a malformed body.
    if (error instanceof Response) {
      return error;
    }
    throw error;
  }
};
