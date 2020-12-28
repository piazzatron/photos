import React, { useCallback, useContext } from 'react'
import { navImageContext } from '../nav-image-context/NavImageContext'
import styles from './InteractiveImage.module.css'

type InteractiveImageProps = {
  src: string
}

const InteractiveImage = ({ src }: InteractiveImageProps) => {
  const { addRef } = useContext(navImageContext)
  const callBackRef = useCallback((element: HTMLImageElement | null) => {
    if (element) {
      addRef(element)
    }
  }, [])
  return <img className={styles.container} src={src} ref={callBackRef} />
}

export default InteractiveImage
