import React, { useCallback, useContext } from 'react'
import { navImageContext } from '../nav-image-context/NavImageContext'
import styles from './InteractiveImage.module.css'

type InteractiveImageProps = {
  imageId: string
  belowFold?: boolean
  version?: '1' | '2'
  fileType?: string
}

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
  const src = makeImageURL({ imageId, width: 1800, version, fileType })

  // Hack: Very annoying thing where the old images don't support full resizing,
  // so we have to give them a different srcset

  const srcSet = `
    ${makeImageURL({
      imageId,
      width: 1400,
      version,
      fileType,
    })} 1400w,
    ${makeImageURL({
      imageId,
      width: 1800,
      version,
      fileType,
    })} 1800w,
    ${
      version === '1'
        ? `
        ${makeImageURL({
          imageId,
          width: 2600,
          version,
          fileType,
        })} 2600w,
        `
        : `${makeImageURL({
            imageId,
            width: 2800,
            version,
            fileType,
          })} 2800w,
        ${makeImageURL({
          imageId,
          width: 3600,
          version,
          fileType,
        })} 3600w,
        ${makeImageURL({
          imageId,
          width: 5400,
          version,
          fileType,
        })} 5400w
      }`
    }
  `

  return (
    <img
      className={styles.container}
      src={src}
      ref={callBackRef}
      srcSet={srcSet}
      onClick={() => {
        console.log('click')
      }}
    />
  )
}

export default InteractiveImage
