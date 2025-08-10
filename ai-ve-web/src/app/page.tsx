"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Home() {
  const [q, setQ] = useState("")
  return (
    <main className="min-h-dvh grid place-items-center">
      <div className="w-full max-w-xl px-6">
        <form action="/search" method="GET" className="group">
          <div className="relative">
            <Input
              name="q"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search AI‑VE"
              className="h-14 rounded-full px-6 text-base shadow-sm focus-visible:ring-[3px]"
              aria-label="Search"
              autoFocus
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 grid place-items-center">
              <kbd className="text-xs text-muted-foreground">Enter ↵</kbd>
            </div>
          </div>
          <div className="mt-4 flex justify-center gap-3 opacity-80">
            <Button type="submit" className="rounded-full px-5">Search</Button>
            <Button type="button" variant="ghost" className="rounded-full px-5" onClick={() => setQ("")}>Clear</Button>
          </div>
        </form>
      </div>
    </main>
  )
}
