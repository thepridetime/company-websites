import React, { useState, useEffect } from 'react'

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

export interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  priority?: boolean
}

export function ImageWithFallback({
  src,
  alt,
  style,
  className,
  priority = false,
  loading,
  decoding = 'async',
  ...rest
}: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setDidError(false)
    setIsLoaded(false)
  }, [src])

  const handleError = () => {
    setDidError(true)
  }

  const effectiveLoading = priority ? 'eager' : (loading ?? 'lazy')
  const effectiveFetchPriority = priority
    ? 'high'
    : (((rest as Record<string, unknown>).fetchpriority || (rest as Record<string, unknown>).fetchPriority || 'low') as 'high' | 'low')

  return didError ? (
    <div
      className={`inline-block bg-gray-100 text-center align-middle ${className ?? ''}`}
      style={style}
    >
      <div className="flex items-center justify-center w-full h-full">
        <img src={ERROR_IMG_SRC} alt="Error loading image" {...rest} data-original-url={src} />
      </div>
    </div>
  ) : (
    <img
      src={src}
      alt={alt}
      loading={effectiveLoading}
      decoding={priority ? 'auto' : decoding}
      {...(effectiveFetchPriority ? { fetchpriority: effectiveFetchPriority } : {})}
      className={`${className ?? ''} transition-opacity duration-300 ${
        isLoaded ? 'opacity-100' : 'opacity-90'
      }`}
      style={style}
      onLoad={() => setIsLoaded(true)}
      onError={handleError}
      {...rest}
    />
  )
}
