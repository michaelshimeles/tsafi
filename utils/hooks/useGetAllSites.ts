import { useQuery } from "@tanstack/react-query";
import { readSites } from "../actions/sites/read-sites";


export const useGetAllSites = () => {
  return useQuery({
    queryKey: ["get-all-sites"],
    queryFn: () => readSites(),
  });
};
