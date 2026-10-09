import Image from 'next/image'

interface Props {
  url: string | null
  priority?: boolean
}

/** The country's own photograph blurred out to a wash. Both the hero and the
 *  closing band sit on it, so the black is tinted by the destination rather
 *  than being a flat fill. */
export function CountryBackdrop({ url, priority = false }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {url && (
        <Image
          src={url}
          alt=""
          aria-hidden="true"
          fill
          priority={priority}
          sizes="100vw"
          className="scale-125 object-cover object-center opacity-95 blur-md"
        />
      )}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  )
}
