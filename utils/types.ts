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
  shareable: boolean;
  published: boolean;
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

export interface Document {
  id: number;
  created_at: string;
  document_id: string;
  document: string;
  title: string;
  user_id: string;
}
