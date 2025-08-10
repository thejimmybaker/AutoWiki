import Link from "next/link"

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q: raw } = await searchParams
  const q = (raw ?? "").trim()
  return (
    <main className="min-h-dvh px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <form action="/search" method="GET" className="sticky top-6 z-10">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search AI‑VE"
            className="h-11 w-full rounded-full border bg-background px-5 text-sm outline-none focus-visible:ring-[3px]"
            aria-label="Search"
          />
        </form>

        {q ? (
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground">Showing sample result for “{q}”</p>
            <div className="space-y-2">
              <Link href="/articles/foia-basics" className="text-lg font-medium hover:underline">
                Freedom of Information Act (FOIA): Basics
              </Link>
              <p className="text-sm text-muted-foreground line-clamp-2">
                The Freedom of Information Act is a U.S. law that gives the public the right to access records from federal agencies…
              </p>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground">Type a query above.</p>
        )}
      </div>
    </main>
  )
}


