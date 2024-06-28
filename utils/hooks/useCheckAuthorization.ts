import { useQuery } from "@tanstack/react-query";
import { Authorization } from "../actions/authorization";


export const useCheckAuthorization = (site_id: string) => {
  return useQuery({
    queryKey: ["get-authorization-check", site_id],
    queryFn: () => Authorization(site_id),
  });
};
