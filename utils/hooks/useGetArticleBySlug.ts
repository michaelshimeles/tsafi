import { useQuery } from "@tanstack/react-query";
import { getAllArticleBySlug } from "../actions/articles/get-article-slug";


export const useGetArticleBySlug = (slug: string) => {
  return useQuery({
    queryKey: ["get-article-slug", slug],
    queryFn: () => getAllArticleBySlug(slug),
  });
};
