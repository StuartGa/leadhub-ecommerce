import type { BlogPost } from "../../domain/types/blog";
import type { Brand } from "../../domain/types/brand";
import type { Product } from "../../domain/types/product";

export type SearchItemType = "producto" | "categoria" | "blog" | "marca";

export interface SearchItem {
  id: string;
  type: SearchItemType;
  label: string;
  subtitle: string;
  href: string;
  rank: number;
}

interface SearchIndex {
  products: Product[];
  categories: string[];
  posts: BlogPost[];
  brands: Brand[];
}

let cachedIndexPromise: Promise<SearchIndex> | null = null;

function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

function scoreMatch(query: string, target: string): number {
  const q = normalize(query);
  const t = normalize(target);

  if (!q || !t) return 0;
  if (t === q) return 120;
  if (t.startsWith(q)) return 90;
  if (t.includes(q)) return 60;
  return 0;
}

async function getIndex(): Promise<SearchIndex> {
  if (!cachedIndexPromise) {
    cachedIndexPromise = (async () => {
      const [{ productService }, { blogService }, { brandService }] = await Promise.all([
        import("./productService"),
        import("./blogService"),
        import("./brandService"),
      ]);

      const products = productService.getAll();
      const postList = blogService.getAll();
      const brandList = brandService.getAll();
      const productCategories = new Set(products.map((p) => p.category));

      const categories = Array.from(productCategories);

      return {
        products,
        categories,
        posts: postList,
        brands: brandList,
      };
    })();
  }

  return cachedIndexPromise;
}

export async function searchAll(query: string, limit = 8): Promise<SearchItem[]> {
  const q = query.trim();
  if (!q) return [];

  const { products, categories, posts, brands } = await getIndex();
  const items: SearchItem[] = [];

  for (const product of products) {
    const rank =
      scoreMatch(q, product.name) +
      scoreMatch(q, product.category) / 2 +
      product.tags.reduce((acc, tag) => acc + scoreMatch(q, tag) / 3, 0);

    if (rank > 0) {
      items.push({
        id: `product-${product.id}`,
        type: "producto",
        label: product.name,
        subtitle: `Producto · ${product.category}`,
        href: `/products/${product.id}`,
        rank,
      });
    }
  }

  for (const category of categories) {
    const rank = scoreMatch(q, category);
    if (rank > 0) {
      items.push({
        id: `category-${category}`,
        type: "categoria",
        label: category,
        subtitle: "Categoría de productos",
        href: `/productos?category=${encodeURIComponent(category)}`,
        rank,
      });
    }
  }

  for (const post of posts) {
    const rank =
      scoreMatch(q, post.title) +
      scoreMatch(q, post.category) / 2 +
      post.tags.reduce((acc, tag) => acc + scoreMatch(q, tag) / 3, 0);

    if (rank > 0) {
      items.push({
        id: `blog-${post.slug}`,
        type: "blog",
        label: post.title,
        subtitle: "Artículo de blog",
        href: `/blog/${post.slug}`,
        rank,
      });
    }
  }

  for (const brand of brands) {
    const rank = scoreMatch(q, brand.name);
    if (rank > 0) {
      items.push({
        id: `brand-${brand.id}`,
        type: "marca",
        label: brand.name,
        subtitle: "Marca proveedora",
        href: `/marcas?q=${encodeURIComponent(brand.name)}&brand=${encodeURIComponent(brand.id)}`,
        rank,
      });
    }
  }

  return items
    .sort((a, b) => b.rank - a.rank || a.label.localeCompare(b.label, "es"))
    .slice(0, limit);
}

export async function getTopMatch(query: string): Promise<SearchItem | undefined> {
  const results = await searchAll(query, 1);
  return results[0];
}
