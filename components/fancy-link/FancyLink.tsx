import Link from 'next/link'
import { useState } from 'react'
import styles from './FancyLink.module.css'
import cn from 'classnames'

type FancyLinkProps = {
  href: string
}

const FancyLink: React.FC<FancyLinkProps> = ({ href, children }) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={styles.container}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Link href={href}>
        <a>{children}</a>
      </Link>
      <div
        className={cn(styles.underline, { [styles.underlineVisible]: isHover })}
      />
    </div>
  )
}

export default FancyLink
