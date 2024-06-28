import { useQuery } from "@tanstack/react-query";
import { readMessages } from "../actions/ai/read-messages";

export const useAIMessages = (user_id: string) => {
  return useQuery({
    queryKey: ["get-ai-messages", user_id],
    queryFn: () => readMessages(user_id),
  });
};
