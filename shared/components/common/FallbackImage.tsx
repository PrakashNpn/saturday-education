'use client'
import { useState, useEffect } from 'react'

interface FallbackImageProps {
  src: string | null | undefined
  alt: string
  className?: string
  fallbackClassName?: string
  fallbackBg?: string
}

export function FallbackImage({ src, alt, className, fallbackClassName, fallbackBg }: FallbackImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>(
    !src || src.trim() === '' ? 'error' : 'loading',
  )

  useEffect(() => {
    if (!src || src.trim() === '') {
      setStatus('error')
    } else {
      setStatus('loading')
    }
  }, [src])

  if (status === 'error') {
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
      src={src!}
      alt={alt}
      className={`${className ?? ''} ${status === 'loading' ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
      onLoad={() => setStatus('loaded')}
      onError={() => setStatus('error')}
    />
  )
}
