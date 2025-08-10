export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "Sitemap: https://ai-ve.vercel.app/sitemap.xml",
    ].join("\n"),
    { headers: { "Content-Type": "text/plain" } }
  )
}


