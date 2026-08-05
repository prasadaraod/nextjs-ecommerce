// src/app/page.tsx
import { getProducts } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';

export default async function HomePage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Master Modern Tech Stacks
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
          High-performance learning resources and developer tooling powered by Next.js, React, and TypeScript.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-6">Featured Courses & Tools</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}