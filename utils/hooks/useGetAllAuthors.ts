import { useQuery } from "@tanstack/react-query";
import { getAllAuthors } from "../actions/author/get-all-authors";


export const useGetAllAuthors = (site_id: string) => {
  return useQuery({
    queryKey: ["get-all-authors", site_id],
    queryFn: () => getAllAuthors(site_id),
  });
};
