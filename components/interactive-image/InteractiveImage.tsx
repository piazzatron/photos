import React, { useCallback, useContext } from 'react'
import { navImageContext } from '../nav-image-context/NavImageContext'
import styles from './InteractiveImage.module.css'

type InteractiveImageProps = {
  image_id: string
  belowFold: boolean
  version?: '1' | '2'
  fileType?: string
}

const MAX_WIDTH = 1800
// Where we start showing the images full width for mobile (this is a guess rn)
const FULL_WIDTH_BREAKPOINT = 1000

export const makeImageURL = (image_id: string, width?: number, version: '1' | '2', fileType = 'jpg') => {
  if (version === '1')  {
    const base = `https://d22ibahswn5kqh.cloudfront.net/images/${image_id}.${fileType}`
    return `${base}${width ? `?w=${width}` : ''}`
  }

  const base = `https://cdn.sanity.io/images/4ot7e40n/production/${image_id}`
  return `${base}${width ? `-${width}` : ''}.${fileType}`
  //'https://cdn.sanity.io/images/4ot7e40n/production/4718e77a4ef9bc597803e9e8feb9d48d2b5dc31d-1806x1706.png
}

const InteractiveImage = ({
  image_id,
  belowFold = false,
  version = '1',
  fileType = 'jpg'
}: InteractiveImageProps) => {
  const { addRef } = useContext(navImageContext)
  const callBackRef = useCallback((element: HTMLImageElement | null) => {
    if (element) {
      addRef(element, belowFold)
    }
  }, [])
  const src = makeImageURL(image_id, MAX_WIDTH, version, fileType)
  const srcSet = `
    ${makeImageURL(image_id, 600, version, fileType)} ${600}w,
    ${makeImageURL(image_id, 1400, version, fileType)} ${1400}w,
    ${makeImageURL(image_id, MAX_WIDTH, version, fileType)} ${MAX_WIDTH}w
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
