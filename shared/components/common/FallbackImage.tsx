'use client'
import { useState } from 'react'

interface FallbackImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackClassName?: string
  fallbackBg?: string
}

export function FallbackImage({ src, alt, className, fallbackClassName, fallbackBg }: FallbackImageProps) {
  const empty = !src || src.trim() === ''
  const [failed, setFailed] = useState(empty)
  const [prevSrc, setPrevSrc] = useState(src)

  // Reset the failed state when the src prop changes — done during render (not in an
  // effect) so it doesn't trigger an extra render pass.
  if (src !== prevSrc) {
    setPrevSrc(src)
    setFailed(empty)
  }

  if (failed) {
    return (
      <div
        className={`${fallbackBg ?? 'bg-gradient-to-br from-action to-deep'} flex items-center justify-center ${fallbackClassName ?? className ?? ''}`}
        role="img"
        aria-label={alt}
      />
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- intentional: generic external image with an onError → fallback pattern that next/image can't express
    <img src={src!} alt={alt} className={className ?? ''} onError={() => setFailed(true)} />
  )
}
