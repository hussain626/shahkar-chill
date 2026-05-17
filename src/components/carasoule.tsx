import React, { useState } from 'react';
import type { Product } from "@/lib/products";

interface ProductImageMediaProps {
  product: Product;
}

export function ProductImageMedia({ product }: ProductImageMediaProps) {
  const productImages = product.images && product.images.length > 0
    ? product.images
    : [product.img];

  const hasMultipleImages = productImages.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === productImages.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = (e: React.MouseEvent) => {
    e.preventDefault();
    setActiveIndex((prev) => (prev === 0 ? productImages.length - 1 : prev - 1));
  };

  return (
    // Removed: gradient-ice, shadow-ice, rounded-3xl, h-[280px], sm:aspect-square, sm:h-auto
    // The parent wrapper in the page now fully controls shape, size, and background
    <div className="relative h-full w-full overflow-hidden group flex items-center justify-center">
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10 gradient-gold text-charcoal text-[10px] font-bold uppercase tracking-[0.18em] px-3 py-1.5 rounded-full shadow-gold">
          {product.badge}
        </div>
      )}

      {/* Main Image */}
      <div className="h-full w-full flex items-center justify-center">
        <img
          src={productImages[activeIndex]}
          alt={`${product.name} - View ${activeIndex + 1}`}
          width={1024}
          height={1024}
          className="h-full w-full object-contain transition-all duration-300 ease-in-out"
        />
      </div>

      {/* Carousel Controls */}
      {hasMultipleImages && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-charcoal shadow-md border border-border/40 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 text-lg font-semibold"
            aria-label="Previous image"
          >
            ‹
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-charcoal shadow-md border border-border/40 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-white hover:scale-105 active:scale-95 text-lg font-semibold"
            aria-label="Next image"
          >
            ›
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-1.5 bg-charcoal/10 backdrop-blur-md px-2.5 py-1 rounded-full basic-border">
            {productImages.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => { e.preventDefault(); setActiveIndex(idx); }}
                className={`h-1.5 rounded-full transition-all duration-200 ${
                  idx === activeIndex ? 'w-4 bg-charcoal' : 'w-1.5 bg-charcoal/40'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
