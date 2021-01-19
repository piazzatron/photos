import styles from './NavBar.module.css'
import utils from '../../styles/utils.module.css'
import cn from 'classnames'
import FancyLink from '../fancy-link/FancyLink'
import { useContext } from 'react'
import { navImageContext } from '../nav-image-context/NavImageContext'
import Instagram from '../../public/instagram.svg'
import { useRouter } from 'next/dist/client/router'

export const SubPageButton = ({
  href,
  isSelected,
  title,
  inverted = false,
}: {
  href: string
  isSelected: boolean
  title: string
  inverted?: boolean
}) => {
  return (
    <FancyLink href={href} underlineHeight={2}>
      <div
        className={cn(utils.montserrat, {
          [styles.subPageButtonUnselected]: !isSelected,
          [utils.fontRegular]: !isSelected,
          [utils.fontBold]: isSelected,
          [styles.inverted]: inverted,
        })}
      >
        {title}
      </div>
    </FancyLink>
  )
}

const SubPages = ({
  selectedPage,
  inverted,
}: {
  selectedPage: string
  inverted: boolean
}) => {
  return (
    <div className={styles.subPages}>
      <SubPageButton
        title={'journal'}
        isSelected={selectedPage === 'journal'}
        href="/journal"
        inverted={inverted}
      />
      <SubPageButton
        title={'work'}
        isSelected={selectedPage === 'work'}
        href="/work"
        inverted={inverted}
      />
      <SubPageButton
        title={'about'}
        isSelected={selectedPage === 'about'}
        href="/about"
        inverted={inverted}
      />
      <SubPageButton
        title={'contact'}
        isSelected={selectedPage === 'contact'}
        href="/contact"
        inverted={inverted}
      />
    </div>
  )
}

const NavBar: React.FC = () => {
  const { photoDoesIntersect } = useContext(navImageContext)
  const { pathname } = useRouter()
  const inverted = pathname === '/journal' && photoDoesIntersect

  return (
    <div className={cn([styles.container, { [styles.inverted]: inverted }])}>
      <FancyLink href={'/journal'}>
        <div className={cn(styles.name, utils.playfair, utils.fontBlack)}>
          Michael Piazza
        </div>
      </FancyLink>
      <div className={styles.subpageLinks}>
        <SubPages selectedPage={pathname.substr(1)} inverted={inverted} />
      </div>
      <div
        className={cn(styles.instagram, {
          [styles.inverted]: inverted,
        })}
      >
        <a href="https://instagram.com/piazzatron">
          <Instagram />
        </a>
      </div>
    </div>
  )
}

export default NavBar
