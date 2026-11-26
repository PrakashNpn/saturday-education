import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Link } from '@/i18n/navigation'

const prose =
  'text-[1.0625rem] leading-[1.75] text-secondary-text ' +
  '[&_p]:mb-5 [&_p:last-child]:mb-0 ' +
  '[&_strong]:font-medium [&_strong]:text-primary-text ' +
  '[&_a]:font-medium [&_a]:text-action [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-action-hover ' +
  '[&_ul]:mb-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 ' +
  '[&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 ' +
  '[&_li]:leading-[1.7] ' +
  '[&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-action/35 [&_blockquote]:pl-4 [&_blockquote]:text-primary-text ' +
  '[&_hr]:my-10 [&_hr]:border-stroke ' +
  '[&_h2]:mt-11 [&_h2]:mb-3.5 [&_h2]:text-[1.35rem] [&_h2]:leading-snug [&_h2]:font-medium [&_h2]:text-primary-text ' +
  '[&_h3]:mt-7 [&_h3]:mb-2.5 [&_h3]:text-body [&_h3]:font-medium [&_h3]:text-primary-text ' +
  // Tables: wrapped card look (see custom `table` renderer below for the shell).
  '[&_table]:w-full [&_table]:border-collapse [&_table]:text-label ' +
  '[&_thead]:bg-[color-mix(in_srgb,var(--color-action)_8%,white)] ' +
  '[&_th]:px-4 [&_th]:py-3 [&_th]:text-left [&_th]:align-bottom [&_th]:text-min [&_th]:font-medium [&_th]:tracking-[0.04em] [&_th]:text-action [&_th]:uppercase ' +
  '[&_td]:px-4 [&_td]:py-3.5 [&_td]:align-top [&_td]:text-secondary-text [&_td]:leading-relaxed ' +
  '[&_td:first-child]:font-medium [&_td:first-child]:text-primary-text ' +
  '[&_tbody_tr]:border-t [&_tbody_tr]:border-stroke ' +
  '[&_tbody_tr:nth-child(even)]:bg-surface-0/80'

function hrefIsInternal(href: string | undefined): href is string {
  return Boolean(href && href.startsWith('/') && !href.startsWith('//'))
}

/** Renders guide body / sources markdown with brand typography. */
export function GuideMarkdown({ markdown }: { markdown: string }) {
  if (!markdown.trim()) return null

  return (
    <div className={prose}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          a({ href, children }) {
            if (hrefIsInternal(href)) {
              return <Link href={href}>{children}</Link>
            }
            return (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            )
          },
          table({ children }) {
            return (
              <div className="my-7 overflow-x-auto rounded-[18px] border border-stroke bg-surface shadow-[0_1px_2px_rgba(0,51,58,0.04)]">
                <table>{children}</table>
              </div>
            )
          },
        }}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
