import MobileMenu from '../mobile-menu/MobileMenu'
import NavBar from '../nav-bar/NavBar'
import styles from './layout.module.css'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <NavBar />
      <MobileMenu />
      <div className={styles.contentContainer}>
        {children}
      </div>
    </div>
  )
}

export default Layout
