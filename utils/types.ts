import { UUID } from "crypto";

export interface Article {
  id: number;
  created_at: string;
  blog_html: string;
  blog_markdown: string;
  thumbnail: string;
  thumbnail_alt: string;
  image: string;
  image_alt: string;
  category_id: number;
  author_id: UUID;
  title: string;
  subtitle: string;
  slug: string;
  keywords: string[];
  author: Author;
  category: Category;
}

export interface Author {
  author_profile_img: string;
  author_id: string;
  author_name: string;
  author_instagram: string;
  author_twitter: string;
}

export interface Category {
  id: number;
  category: string;
}
