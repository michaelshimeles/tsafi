import { useQuery } from "@tanstack/react-query";
import { getAllDocuments } from "../actions/articles/get-all-documents";
import { getDocumentById } from "../actions/articles/get-document-id";

async function fetchDocumentById(id: string) {
  try {
    const response = await getDocumentById(id);

    return response;
  } catch (error) {
    return error;
  }
}

export const useGetDocumentById = (id: string) => {
  return useQuery({
    queryKey: ["get-document", id],
    queryFn: () => fetchDocumentById(id),
  });
};
