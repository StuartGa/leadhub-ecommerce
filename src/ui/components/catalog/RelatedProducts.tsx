import { useMemo } from "react";
import { motion } from "framer-motion";
import type { Product } from "../../../domain/types/product";
import { ProductCard } from "./ProductCard";

interface RelatedProductsProps {
  currentProduct: Product;
  allProducts: Product[];
  onInquire: (product: Product) => void;
}

export function RelatedProducts({ currentProduct, allProducts, onInquire }: RelatedProductsProps) {
  const relatedProducts = useMemo(() => {
    // Filtrar productos relacionados basados en:
    // 1. Misma categoría
    // 2. Misma marca
    // 3. Misma temperatura
    // 4. Tags en común
    
    const related = allProducts
      .filter(p => {
        // No incluir el producto actual
        if (p.id === currentProduct.id) return false;
        
        // Priorizar productos de la misma categoría
        if (p.category === currentProduct.category) return true;
        
        // O misma marca
        if (p.brand && currentProduct.brand && p.brand === currentProduct.brand) return true;
        
        // O misma temperatura
        if (p.temperature === currentProduct.temperature) return true;
        
        // O que comparten tags
        const commonTags = p.tags.filter(tag => currentProduct.tags.includes(tag));
        if (commonTags.length > 0) return true;
        
        return false;
      })
      // Ordenar por relevancia
      .sort((a, b) => {
        let scoreA = 0;
        let scoreB = 0;
        
        // Puntos por categoría
        if (a.category === currentProduct.category) scoreA += 10;
        if (b.category === currentProduct.category) scoreB += 10;
        
        // Puntos por marca
        if (a.brand === currentProduct.brand) scoreA += 5;
        if (b.brand === currentProduct.brand) scoreB += 5;
        
        // Puntos por temperatura
        if (a.temperature === currentProduct.temperature) scoreA += 3;
        if (b.temperature === currentProduct.temperature) scoreB += 3;
        
        // Puntos por tags comunes
        const commonTagsA = a.tags.filter(tag => currentProduct.tags.includes(tag)).length;
        const commonTagsB = b.tags.filter(tag => currentProduct.tags.includes(tag)).length;
        scoreA += commonTagsA;
        scoreB += commonTagsB;
        
        return scoreB - scoreA;
      })
      // Limitar a 4 productos
      .slice(0, 4);
    
    return related;
  }, [currentProduct, allProducts]);

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <section className="border-t border-slate-200 bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 font-sans text-2xl font-semibold text-slate-900">
            Productos Relacionados
          </h2>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                onInquire={onInquire}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
