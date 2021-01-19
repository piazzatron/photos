import React from 'react'
import { useRouter } from 'next/dist/client/router'
import styles from './BelowTheFold.module.css'

const BelowTheFold: React.FC = ({ children }) => {
  const router = useRouter()

  // Is this gonna work? What about time pages etc?
  const showChildren = router?.pathname !== '/journal'
  if (showChildren) {
    return <>{children}</>
  }
  return (
    <div className={styles.container}>
      <div className={styles.preview}>
        {React.Children.map(children, (child, i) => {
          // TODO: fix this ignore
          // @ts-ignore
          if (i === 0) return React.cloneElement(child, { belowFold: true })
          return null
        })}
      </div>
      <div className={styles.gradient} />
    </div>
  )
}

export default BelowTheFold
