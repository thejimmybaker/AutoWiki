export async function GET() {
  const base = "https://ai-ve.vercel.app"
  const urls = ["/", "/articles/foia-basics"].map((p) => `${base}${p}`)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls
    .map(
      (u) => `<url>
    <loc>${u}</loc>
  </url>`
    )
    .join("\n  ")}
</urlset>`
  return new Response(xml, { headers: { "Content-Type": "application/xml" } })
}


