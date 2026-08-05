// src/app/(shop)/explore/page.tsx
import { getFilteredProducts } from '@/lib/products';
import ProductCard from '@/components/ui/ProductCard';
import FilterControls from '@/components/ui/FilterControls';

// Force dynamic server-side rendering for URL search params
export const dynamic = 'force-dynamic';

interface ExplorePageProps {
  searchParams: {
    q?: string;
    category?: string;
  };
}

export default async function ExplorePage({ searchParams }: ExplorePageProps) {
  const query = searchParams.q || '';
  const category = searchParams.category || '';

  const products = await getFilteredProducts(query, category);

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Explore Catalog</h1>
        <p className="text-muted-foreground text-sm">
          Server-Side Rendered (SSR) search and filtering powered by URL parameters.
        </p>
      </div>

      <FilterControls />

      {products.length === 0 ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <p className="text-muted-foreground">No courses or tools match your search criteria.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}