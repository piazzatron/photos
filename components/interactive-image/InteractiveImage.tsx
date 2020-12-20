import React from "react"
import styles from "./InteractiveImage.module.css"

type InteractiveImageProps = {
  src: string
}

const InteractiveImage = ({ src }: InteractiveImageProps) => {
  return <img className={styles.container} src={src} />
}

export default InteractiveImage
