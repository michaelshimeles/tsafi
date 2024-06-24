import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../actions/articles/get-all-categories";

export const useGetAllCategories = (site_id: string) => {
  return useQuery({
    queryKey: ["get-all-categories", site_id],
    queryFn: () => getAllCategories(site_id),
  });
};
