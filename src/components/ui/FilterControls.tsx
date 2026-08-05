// src/components/ui/FilterControls.tsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { useState, useTransition } from 'react';

const CATEGORIES = ['all', 'React & Next.js', 'TypeScript', 'State Management', 'Backend'];

export default function FilterControls() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentCategory = searchParams.get('category') || 'all';
  const currentQuery = searchParams.get('q') || '';
  const [search, setSearch] = useState(currentQuery);

  const updateFilters = (newQuery: string, newCategory: string) => {
    const params = new URLSearchParams();

    if (newQuery.trim() !== '') {
      params.set('q', newQuery.trim());
    }

    if (newCategory && newCategory !== 'all') {
      params.set('category', newCategory);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/explore?${queryString}` : '/explore';

    startTransition(() => {
      router.push(newUrl);
      router.refresh(); // Forces Next.js server component re-fetch
    });
  };

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4 mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search courses, frameworks, or topics..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            updateFilters(e.target.value, currentCategory);
          }}
          className="w-full rounded-lg border bg-background pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-muted-foreground mr-2">Categories:</span>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => updateFilters(search, cat)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition ${
              currentCategory.toLowerCase() === cat.toLowerCase()
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            {cat === 'all' ? 'All Categories' : cat}
          </button>
        ))}
      </div>

      {isPending && <p className="text-xs text-primary animate-pulse">Updating catalog...</p>}
    </div>
  );
}