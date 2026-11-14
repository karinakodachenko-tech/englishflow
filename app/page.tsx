import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-4 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-blue-700">
              Learn English step by step
            </div>

            <h1 className="text-5xl font-black leading-tight text-slate-900">
              Build your English from A1 to B1
            </h1>

            <p className="mt-6 max-w-xl text-lg text-slate-600">
              Practice vocabulary, grammar, and quick quizzes with a structured learning path.
            </p>

            <div className="mt-8 flex gap-4">
              <Link
                href="/levels"
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white shadow-soft transition hover:bg-blue-700"
              >
                Start learning
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400"
              >
                My progress
              </Link>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-8 shadow-soft">
            <h2 className="mb-4 text-2xl font-bold text-slate-800">Learning path</h2>
            <ul className="space-y-5 text-slate-700">
              <li>• Greetings, family, and daily routines</li>
              <li>• Food, shopping, city life, and travel</li>
              <li>• Grammar and present continuous</li>
              <li>• Vocabulary review and repetition</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
