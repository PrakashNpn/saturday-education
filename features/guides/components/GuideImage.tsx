import Image from 'next/image'

interface Props {
  src: string
  alt: string
  priority?: boolean
  /** Intrinsic size hint for next/image; files are 1280×720. */
  width?: number
  height?: number
  caption?: string | null
}

/** In-article guide photograph from public/ (paths stored on the guide row). */
export function GuideImage({
  src,
  alt,
  priority = false,
  width = 1280,
  height = 720,
  caption,
}: Props) {
  return (
    <figure className="overflow-hidden">
      <div className="overflow-hidden rounded-[20px] bg-surface-0">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="h-auto w-full object-cover"
          sizes="(max-width: 860px) 100vw, 672px"
        />
      </div>
      {caption ? (
        <figcaption className="mt-2.5 text-min leading-relaxed text-muted-text">{caption}</figcaption>
      ) : null}
    </figure>
  )
}
