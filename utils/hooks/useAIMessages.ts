import { useQuery } from "@tanstack/react-query";
import { readMessages } from "../actions/ai/read-messages";

export const useAIMessages = () => {
  return useQuery({
    queryKey: ["get-ai-messages"],
    queryFn: () => readMessages(),
  });
};
