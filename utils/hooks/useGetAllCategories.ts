import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "../actions/articles/get-all-categories";

export const useGetAllCategories = () => {
  return useQuery({
    queryKey: ["get-all-categories"],
    queryFn: () => getAllCategories(),
  });
};
