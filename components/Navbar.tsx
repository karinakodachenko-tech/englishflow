import Link from "next/link";

export function Navbar() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-black text-slate-900">
          EnglishFlow
        </Link>

        <div className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <Link href="/levels" className="hover:text-slate-900">Levels</Link>
          <Link href="/vocabulary" className="hover:text-slate-900">Review</Link>
          <Link href="/dashboard" className="hover:text-slate-900">Dashboard</Link>
        </div>
      </nav>
    </header>
  );
}
