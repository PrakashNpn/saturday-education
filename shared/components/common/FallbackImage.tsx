'use client'
import { useRef, useState, useEffect } from 'react'

interface FallbackImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackClassName?: string
  fallbackBg?: string
}

export function FallbackImage({ src, alt, className, fallbackClassName, fallbackBg }: FallbackImageProps) {
  const [failed, setFailed] = useState(!src || src.trim() === '')
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (!src || src.trim() === '') {
      setFailed(true)
      return
    }
    setFailed(false)
  }, [src])

  if (failed) {
    return (
      <div
        className={`${fallbackBg ?? 'bg-gradient-to-br from-brand-purple to-purple-900'} flex items-center justify-center ${fallbackClassName ?? className ?? ''}`}
        role="img"
        aria-label={alt}
      />
    )
  }

  return (
    <img
      ref={imgRef}
      src={src!}
      alt={alt}
      className={className ?? ''}
      onError={() => setFailed(true)}
    />
  )
}
