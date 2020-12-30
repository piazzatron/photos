import MobileMenu from '../mobile-menu/MobileMenu'
import NavBar from '../nav-bar/NavBar'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <NavBar />
      <MobileMenu />
      {children}
    </div>
  )
}

export default Layout
