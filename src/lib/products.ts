// src/lib/products.ts
import { Product } from './types';

// Extend mock products array for testing filters
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'nextjs-mastery',
    title: 'Next.js 14 & React Server Components',
    description: 'Master SSR, SSG, ISR, App Router, and server actions with real-world projects.',
    price: 49.99,
    category: 'React & Next.js',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&auto=format&fit=crop&q=60',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'typescript-pro',
    title: 'Advanced TypeScript & Design Patterns',
    description: 'Deep dive into generics, conditional types, ASTs, and enterprise application architecture.',
    price: 39.99,
    category: 'TypeScript',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1516116211223-4258568e1040?w=800&auto=format&fit=crop&q=60',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'redux-toolkit-guide',
    title: 'State Management with Redux Toolkit & RTK Query',
    description: 'Learn modern Redux patterns, async thunks, persistence, and efficient client caching.',
    price: 29.99,
    category: 'State Management',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60',
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'node-microservices',
    title: 'Node.js Microservices with Docker & Kubernetes',
    description: 'Build scalable backend services, event-driven architectures, and deployment pipelines.',
    price: 54.99,
    category: 'Backend',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&auto=format&fit=crop&q=60',
    updatedAt: new Date().toISOString(),
  }
];

export async function getProducts(): Promise<Product[]> {
  return MOCK_PRODUCTS;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

// Server-Side Search and Filter Helper
export async function getFilteredProducts(query?: string, category?: string): Promise<Product[]> {
  let products = [...MOCK_PRODUCTS];

  if (category && category !== 'all') {
    products = products.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (query) {
    const q = query.toLowerCase();
    products = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );
  }

  return products;
}