# DevVault Marketplace (`nextjs-ecommerce`)

A full-stack, responsive digital e-commerce platform engineered with **Next.js 14**, **React**, **TypeScript**, and **Redux Toolkit**. Designed to demonstrate advanced rendering strategies (SSG, ISR, SSR) alongside secure JWT authentication with Next.js Middleware.

---

## 🛠️ Tech Stack & Skills Demonstrated

- **Framework:** Next.js (App Router)
- **Language:** TypeScript, JavaScript
- **State Management:** Redux Toolkit & React-Redux (Persistent Cart & Client Auth)
- **Security & Auth:** JSON Web Tokens (`jose`), HttpOnly Cookies, Next.js Middleware Route Guards
- **Rendering Strategies:**
  - **SSG (Static Site Generation):** Fast static compilation for marketing pages (`/about`, `/faq`).
  - **ISR (Incremental Static Regeneration):** Auto-revalidated static product catalog (`/courses/[id]`) every 60s without full rebuilds.
  - **SSR (Server-Side Rendering):** Real-time URL parameter search and category filtering on every request (`/explore?q=...&category=...`).

---

## 🚀 Key Features

1. **Authentication & Security:**
   - Server-protected routes (`/dashboard`, `/checkout`) enforced via Next.js Edge Middleware.
   - HttpOnly cookie token storage protecting against XSS attacks.
2. **Interactive E-Commerce Shopping Cart:**
   - Global Redux state management synchronized with browser `localStorage`.
   - Responsive slide-over Cart Drawer with real-time subtotal calculations.
3. **Dynamic Filtering & Search (SSR):**
   - URL-driven search and category filtering with server-side query processing.

---

## 🔧 Environment Variables

Create a `.env.local` file in the root directory:

```env
JWT_SECRET=your_super_secret_jwt_key_should_be_at_least_32_characters_long
NEXT_PUBLIC_APP_URL=http://localhost:3000