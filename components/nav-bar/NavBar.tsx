type NavBarProps = {}
import styles from './NavBar.module.css'
import utils from '../../styles/utils.module.css'
import cn from 'classnames'
import FancyLink from '../fancy-link/FancyLink'

const SubPageButton = ({
  href,
  isSelected,
  title,
}: {
  href: string
  isSelected: boolean
  title: string
}) => {
  return (
    <FancyLink href={href}>
      <div
        className={cn(utils.montserrat, {
          [styles.subPageButtonUnselected]: !isSelected,
          [utils.fontRegular]: !isSelected,
          [utils.fontBold]: isSelected,
        })}
      >
        {title}
      </div>
    </FancyLink>
  )
}

const SubPages = ({
  selectedPage,
}: {
  selectedPage?: 'journal' | 'work' | 'about'
}) => {
  return (
    <div className={styles.subPages}>
      <SubPageButton
        title={'journal'}
        isSelected={selectedPage === 'journal'}
        href="/journal"
      />
      <SubPageButton
        title={'work'}
        isSelected={selectedPage === 'work'}
        href="/work"
      />
      <SubPageButton
        title={'about'}
        isSelected={selectedPage === 'about'}
        href="/about"
      />
    </div>
  )
}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <div className={styles.container}>
      <FancyLink href={'/journal'}>
        <div className={cn(styles.name, utils.playfair, utils.fontBlack)}>
          Michael Piazza
        </div>
      </FancyLink>
      <div className={styles.subpageLinks}>
        <SubPages selectedPage={'journal'} />
      </div>
    </div>
  )
}

export default NavBar
