import { useQuery } from "@tanstack/react-query";
import { getDocumentById } from "../actions/articles/get-document-id";


export const useGetDocumentById = (id: string) => {
  return useQuery({
    queryKey: ["get-document", id],
    queryFn: () => getDocumentById(id),
  });
};
