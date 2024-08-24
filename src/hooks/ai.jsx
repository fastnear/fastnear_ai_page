import { useMemo } from "react";
import { useAuthStore } from "../lib/authStore.jsx";

// const CompletionUrl = "https://api.near.ai/v1/chat/completions";
const CompletionUrl = "http://localhost:3000/api/proxy";

export function useAI() {
  const authStore = useAuthStore();

  return useMemo(
    () => ({
      chatCompletion: async (messages, config = {}) => {
        if (!authStore.isAuthenticated()) {
          throw new Error("Not authenticated");
        }
        const response = await fetch(CompletionUrl, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: authStore.toBearer(),
          },
          body: JSON.stringify(
            Object.assign(
              {
                model:
                  "fireworks::accounts/fireworks/models/llama-v3p1-70b-instruct",
                provider: "fireworks",
                max_tokens: 65536,
                logprobs: 0,
                temperature: 0.7,
                top_p: 1,
                frequency_penalty: 0.5,
                n: 1,
                stream: false,
                messages,
              },
              config,
            ),
          ),
        });
        return response.json();
      },
    }),
    [authStore],
  );
}
