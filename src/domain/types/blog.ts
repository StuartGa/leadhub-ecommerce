export type ContentBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: readonly ContentBlock[];
  author: string;
  category: string;
  tags: readonly string[];
  imageUrl: string;
  publishedAt: string;
  readTime: number;
}
