import Link from 'next/link';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-2xl font-headline font-bold text-primary hover:text-primary/90 transition-colors">
          <Sparkles className="w-8 h-8" />
          <span>AI Oracle</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-6">
            <li>
              <Link href="/" className="text-foreground hover:text-primary transition-colors font-medium">
                Experts
              </Link>
            </li>
            {/* Add more navigation links here if needed */}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
