import { UUID } from "crypto";
import { type ClientUploadedFileData } from "uploadthing/types"

export interface UploadedFile<T = unknown> extends ClientUploadedFileData<T> {}
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

export interface Site {
  id: string;
  created_at: string;
  user_id: string;
  site_id: string;
  site_name: string;
  site_description: string;
  site_subdomain: string;
  site_logo: string | null;
  site_cover_image: string | null;
  site_custom_domain: string | null;
  updated_at: string | null;
}
