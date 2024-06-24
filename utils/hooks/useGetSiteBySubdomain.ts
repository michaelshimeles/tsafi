import { useQuery } from "@tanstack/react-query";
import { readSiteDomain } from "../actions/sites/read-site-domain";

export const useGetSiteBySubdomain = (subdomain: string) => {
  return useQuery({
    queryKey: ["get-all-sites-by-subdomain", subdomain],
    queryFn: () => readSiteDomain(subdomain),
  });
};
