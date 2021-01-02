import FancyLink from '../fancy-link/FancyLink'
import styles from './Footer.module.css'
import Twitter from '../../public/twitter.svg'
import Instagram from '../../public/instagram.svg'
import Mail from '../../public/mail.svg'
import Image from 'next/image'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'

const HoverLink: React.FC<{ href: string }> = ({ href, children }) => {
  return (
    <div className={styles.hoverLink}>
      <a target="_blank" rel="noreferrer" href={href}>
        {children}
      </a>
    </div>
  )
}

const Footer = () => {
  return (
    <div className={cn(styles.container, utils.montserrat, utils.fontRegular)}>
      <div className={styles.left}>
        <FancyLink href="/" underlineHeight={1}>
          home
        </FancyLink>
      </div>
      <div className={styles.middle}>
        <div className={styles.twitterContainer}>
          <HoverLink href="https://twitter.com/piazzatron">
            <Twitter />
          </HoverLink>
        </div>
        <div className={styles.instagramContainer}>
          <HoverLink href="https://instagram.com/piazzatron">
            <Instagram />
          </HoverLink>
        </div>
        <div className={styles.mail}>
          <HoverLink href="mailto:michael.piazza@hey.com">
            <Mail />
          </HoverLink>
        </div>
      </div>
      <div className={styles.right}>
        <FancyLink
          href="https://github.com/piazzatron/photos"
          underlineHeight={0}
        >
          <div className={styles.innerRight}>
            <div className={styles.rightText}>
              hand built and designed <br /> © michael piazza, 2020
            </div>
            <img
              className={styles.github}
              src="/github.png"
              height={24}
              width={24}
            />
          </div>
        </FancyLink>
      </div>
    </div>
  )
}

export default Footer
