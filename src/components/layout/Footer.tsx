export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-8">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} DevVault Marketplace. Built with Next.js, Redux & TypeScript.</p>
      </div>
    </footer>
  );
}