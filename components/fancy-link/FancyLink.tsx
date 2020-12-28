import Link from 'next/link'
import { useState } from 'react'
import styles from './FancyLink.module.css'
import cn from 'classnames'

type FancyLinkProps = {
  href: string
  underlineHeight?: number
  colored?: boolean
}

const FancyLink: React.FC<FancyLinkProps> = ({
  underlineHeight = 4,
  href,
  children,
  colored = false,
}) => {
  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={cn([styles.container, { [styles.colored]: colored }])}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
    >
      <Link href={href}>
        <a>{children}</a>
      </Link>
      <div
        className={cn(styles.underline, { [styles.underlineVisible]: isHover })}
        style={{ height: `${underlineHeight}px` }}
      />
    </div>
  )
}

export default FancyLink
