import { Metadata } from "next"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "FOIA: Basics — AI-VE",
  description: "Sample article demonstrating sentence-level evidence UI.",
}

type Evidence = {
  source_passage_id: number
  quote: string
  label: "support" | "refute" | "mention"
  confidence: number
  live_url: string
  archived_url?: string
  publication_date?: string
  retrieved_at?: string
}

type Sentence = {
  id: number
  ordinal: number
  section: string
  text: string
  status: "green" | "disputed" | "quote"
  support_score: number
  contradiction_score: number
  evidence: Evidence[]
}

const SAMPLE: { slug: string; title: string; version: number; sentences: Sentence[] } = {
  slug: "foia-basics",
  title: "Freedom of Information Act (FOIA): Basics",
  version: 4,
  sentences: [
    {
      id: 81234,
      ordinal: 1,
      section: "lead",
      text:
        "The Freedom of Information Act is a U.S. law that gives the public the right to access records from federal agencies, enacted in 1966 and amended multiple times.",
      status: "green",
      support_score: 0.93,
      contradiction_score: 0.02,
      evidence: [
        {
          source_passage_id: 5510021,
          quote:
            "The Freedom of Information Act (FOIA) ... provides the public the right to request access to records from any federal agency ... enacted in 1966.",
          label: "support",
          confidence: 0.93,
          live_url: "https://www.foia.gov/about",
          archived_url: "https://web.archive.org/...",
          publication_date: "2025-03-12",
          retrieved_at: "2025-08-08T02:44:11Z",
        },
      ],
    },
  ],
}

export default function ArticlePage() {
  return (
    <main className="min-h-dvh px-6 py-10 sm:px-8 md:px-12">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 flex items-center justify-between">
          <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">
            AI-VE
          </Link>
          <Badge variant="secondary" className="rounded-full">Version {SAMPLE.version}</Badge>
        </div>

        <article className="space-y-6">
          <header className="space-y-2">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">
              {SAMPLE.title}
            </h1>
            <p className="text-muted-foreground">Every sentence with receipts.</p>
          </header>

          <Separator />

          <div className="space-y-4">
            {SAMPLE.sentences.map((s) => (
              <SentenceRow key={s.id} sentence={s} />
            ))}
          </div>
        </article>
      </div>
    </main>
  )
}

function SentenceRow({ sentence }: { sentence: Sentence }) {
  const color = sentence.status === "green" ? "bg-green-500" : sentence.status === "disputed" ? "bg-amber-500" : "bg-foreground"
  return (
    <Card className="border-0 shadow-none p-0">
      <CardContent className="p-0">
        <div className="group relative flex items-start gap-3">
          <span className={`mt-2 size-1.5 rounded-full ${color}`} />
          <p className="text-pretty leading-7 text-[0.98rem]">{sentence.text}</p>

          <div className="ml-auto">
            <EvidenceSheet sentence={sentence} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EvidenceSheet({ sentence }: { sentence: Sentence }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">Evidence</Button>
      </SheetTrigger>
      <SheetContent className="w-[520px] max-w-[90vw]">
        <SheetHeader>
          <SheetTitle>Evidence</SheetTitle>
        </SheetHeader>
        <div className="mt-4 space-y-6">
          <div>
            <p className="text-sm text-muted-foreground">Support: {(sentence.support_score * 100).toFixed(0)}% • Conflict: {(sentence.contradiction_score * 100).toFixed(0)}%</p>
          </div>
          <ScrollArea className="h-[60vh] pr-4">
            <div className="space-y-6">
              {sentence.evidence.map((e) => (
                <div key={e.source_passage_id} className="space-y-2">
                  <blockquote className="rounded-md bg-muted/40 p-3 text-sm leading-6">
                    “{e.quote}”
                  </blockquote>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Badge variant={e.label === "support" ? "secondary" : e.label === "refute" ? "destructive" : "outline"}>
                      {e.label}
                    </Badge>
                    <span>conf {(e.confidence * 100).toFixed(0)}%</span>
                    <span>•</span>
                    <Link href={e.live_url} target="_blank" className="underline underline-offset-4">Live</Link>
                    {e.archived_url && (
                      <>
                        <span>/</span>
                        <Link href={e.archived_url} target="_blank" className="underline underline-offset-4">Archive</Link>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  )
}


