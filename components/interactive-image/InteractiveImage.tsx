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

  const makeSrcSetAttr = (w: number) =>
    `${makeImageURL({
      imageId,
      width: w,
      version,
      fileType,
    })} ${w}w`

  // Hack: Very annoying thing where the old images don't support full resizing,
  // so we have to give them a different srcset

  const srcSet = [
    makeSrcSetAttr(450),
    makeSrcSetAttr(900),
    makeSrcSetAttr(1400),
    makeSrcSetAttr(1800),
    ...(version === '1'
      ? [makeSrcSetAttr(2600)]
      : [makeSrcSetAttr(2800), makeSrcSetAttr(3600), makeSrcSetAttr(5400)]),
  ].join(',')

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
