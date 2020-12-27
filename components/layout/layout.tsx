import NavBar from '../nav-bar/NavBar'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  )
}

export default Layout
