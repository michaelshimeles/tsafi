import { useQuery } from "@tanstack/react-query";
import { getAllAuthors } from "../actions/author/get-all-authors";


export const useGetAllAuthors = () => {
  return useQuery({
    queryKey: ["get-all-authors"],
    queryFn: () => getAllAuthors(),
  });
};
