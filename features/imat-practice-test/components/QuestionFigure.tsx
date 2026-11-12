import Image from 'next/image'
import type { QuestionImage } from '../types'

export function QuestionFigure({ image }: { image?: QuestionImage }) {
  if (!image) return null
  return <Image src={image.src} alt={image.alt} width={image.width} height={image.height}
    sizes="(max-width: 860px) 90vw, 640px" className="my-4 h-auto max-h-96 w-auto max-w-full rounded-lg object-contain" />
}
