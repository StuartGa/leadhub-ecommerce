import type { BlogPost } from "../../domain/types/blog";
import { blogPosts } from "../../infrastructure/data/blog-posts";

export const blogService = {
  getAll(): BlogPost[] {
    return blogPosts;
  },

  getBySlug(slug: string): BlogPost | undefined {
    return blogPosts.find((post) => post.slug === slug);
  },
};
