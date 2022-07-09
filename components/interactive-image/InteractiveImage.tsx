import React, { useCallback, useContext } from 'react'
import { navImageContext } from '../nav-image-context/NavImageContext'
import styles from './InteractiveImage.module.css'

type InteractiveImageProps = {
  imageId: string
  belowFold?: boolean
  version?: '1' | '2'
  fileType?: string
}

const MAX_WIDTH = 1800
// Where we start showing the images full width for mobile (this is a guess rn)
const FULL_WIDTH_BREAKPOINT = 1000

export const makeImageURL = ({
  imageId,
  width,
  version,
  fileType = 'jpg',
}: {
  imageId: string
  width?: number
  version: '1' | '2'
  fileType?: string
}) => {
  if (version === '1') {
    const base = `https://d22ibahswn5kqh.cloudfront.net/images/${imageId}.${fileType}`
    return `${base}${width ? `?w=${width}` : ''}`
  }

  const base = `https://cdn.sanity.io/images/4ot7e40n/production/${imageId}`
  return `${base}.${fileType}${width ? `?w=${width}` : ''}`
  //'https://cdn.sanity.io/images/4ot7e40n/production/4718e77a4ef9bc597803e9e8feb9d48d2b5dc31d-1806x1706.png
  // Handling images: https://www.sanity.io/docs/presenting-images
}

const InteractiveImage = ({
  imageId,
  belowFold = false,
  version = '1',
  fileType = 'jpg',
}: InteractiveImageProps) => {
  const { addRef } = useContext(navImageContext)
  const callBackRef = useCallback((element: HTMLImageElement | null) => {
    if (element) {
      addRef(element, belowFold)
    }
  }, [])
  const src = makeImageURL({ imageId, width: MAX_WIDTH, version, fileType })
  const srcSet = `
    ${makeImageURL({ imageId, width: 600, version, fileType })} ${600}w,
    ${makeImageURL({ imageId, width: 1400, version, fileType })} ${1400}w,
    ${makeImageURL({
      imageId,
      width: MAX_WIDTH,
      version,
      fileType,
    })} ${MAX_WIDTH}w
  `
  const sizes = `
  (max-width: ${FULL_WIDTH_BREAKPOINT}px) 100vw,
  (max-width: ${MAX_WIDTH}px) 96vw,
  1800px;
  `

  return (
    <img
      className={styles.container}
      src={src}
      ref={callBackRef}
      srcSet={srcSet}
      sizes={sizes}
      onClick={() => {
        console.log('click')
      }}
    />
  )
}

export default InteractiveImage
