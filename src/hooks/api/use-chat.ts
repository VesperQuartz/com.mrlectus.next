"use client";
import { fetchServerSentEvents, useChat } from "@tanstack/ai-react";

export const useAiChat = () => {
  return useChat({
    connection: fetchServerSentEvents("/api/chat"),
  });
};
