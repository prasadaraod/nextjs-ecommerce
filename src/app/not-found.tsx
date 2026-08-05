// src/app/not-found.tsx
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container mx-auto max-w-md px-4 py-24 text-center">
      <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
      <p className="text-muted-foreground text-sm mb-6">
        The requested course or digital product could not be found in our catalog.
      </p>
      <Link
        href="/explore"
        className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
      >
        Back to Explore
      </Link>
    </div>
  );
}