export const revalidate = false; // SSG static page

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-4">About DevVault</h1>
      <p className="text-muted-foreground leading-relaxed mb-6">
        DevVault is a premier marketplace for modern software engineers. We provide curated courses,
        ebooks, and developer tooling designed to level up your engineering skills.
      </p>
    </div>
  );
}