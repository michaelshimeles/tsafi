import { useQuery } from "@tanstack/react-query";
import { getAllDocuments } from "../actions/articles/get-all-documents";


export const useGetAllDocuments = () => {
  return useQuery({
    queryKey: ["get-all-documents"],
    queryFn: () => getAllDocuments(),
  });
};
