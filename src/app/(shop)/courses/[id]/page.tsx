// src/app/(shop)/courses/[id]/page.tsx
import { getProductById, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Star, ShieldCheck, Clock } from 'lucide-react';
import AddToCartButton from '@/components/ui/AddToCartButton';

// Revalidate page static HTML in the background every 60 seconds (ISR)
export const revalidate = 60;

export async function generateStaticParams() {
  const products = await getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

interface PageProps {
  params: { id: string };
}

export default async function ProductDetailPage({ params }: PageProps) {
  // Await params if using Next.js 14/15 async params pattern
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-2">
        <div className="overflow-hidden rounded-xl border bg-muted h-[320px]">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="rounded bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                {product.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" /> {product.rating}
              </span>
            </div>

            <h1 className="text-3xl font-bold mb-3">{product.title}</h1>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            <div className="space-y-2 border-y py-4 mb-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" /> Instant digital access upon checkout
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary" /> Verified course completion certificate
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t pt-4">
            <div>
              <span className="text-xs text-muted-foreground">Price</span>
              <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>
            </div>
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}