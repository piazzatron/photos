import React, { useCallback, useContext } from 'react'
import { navImageContext } from '../nav-image-context/NavImageContext'
import styles from './InteractiveImage.module.css'

type InteractiveImageProps = {
  image_id: string
  belowFold: boolean
}

const MAX_WIDTH = 1800
// Where we start showing the images full width for mobile (this is a guess rn)
const FULL_WIDTH_BREAKPOINT = 1000

// For now, this image is tightly tied to cloudinary

export const makeImageURL = (image_id: string, width?: number) =>
  `https://res.cloudinary.com/dlf6ppjiw/image/upload/${
    width ? `c_scale,q_100,w_${width}/` : ''
  }piazza.photos/${image_id}.jpg`

const InteractiveImage = ({
  image_id,
  belowFold = false,
}: InteractiveImageProps) => {
  const { addRef } = useContext(navImageContext)
  const callBackRef = useCallback((element: HTMLImageElement | null) => {
    if (element) {
      addRef(element, belowFold)
    }
  }, [])
  const src = makeImageURL(image_id, MAX_WIDTH)
  const srcSet = `
    ${makeImageURL(image_id, 600)} ${600}w,
    ${makeImageURL(image_id, 1400)} ${1400}w,
    ${makeImageURL(image_id, MAX_WIDTH)} ${MAX_WIDTH}w
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
