export function Wordmark(props: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...props} className={["font-medium tracking-wide", props.className].filter(Boolean).join(" ")}>AI‑VE</span>
  )
}


