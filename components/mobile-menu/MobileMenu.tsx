import { useRef, useState, useEffect, useContext } from 'react'
import { useSpring, animated, useTransition } from 'react-spring'
import styles from './MobileMenu.module.css'
import { SubPageButton } from '../nav-bar/NavBar'
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from 'body-scroll-lock'
import { navImageContext } from '../nav-image-context/NavImageContext'
import cn from 'classnames'
import { useRouter } from 'next/dist/client/router'

const Hamburger = ({
  onClick,
  menuDisplayed,
  rootPath,
}: {
  onClick: () => void
  menuDisplayed: boolean
  rootPath: string
}) => {
  const { r } = useSpring({
    r: menuDisplayed ? 1 : 0,
    from: { r: 0 },
    config: {
      tension: 400,
      friction: 15,
    },
  })
  const { y } = useSpring({
    y: menuDisplayed ? 1 : 0,
    from: { y: 0 },
    config: {
      tension: 400,
      friction: 28,
      clamp: true,
    },
  })
  const { photoDoesIntersect } = useContext(navImageContext)
  const shouldInvert =
    photoDoesIntersect && (rootPath === '' || rootPath === 'journal')
  return (
    <div
      className={cn(styles.hamburgerContainer, {
        [styles.invertedHamburger]: shouldInvert && !menuDisplayed,
      })}
      onClick={onClick}
    >
      <animated.div
        style={{
          transform: y.interpolate((v) => `translateY(${(v as number) * 4}px)`),
        }}
      >
        <animated.div
          className={styles.hamburgerBun}
          style={{
            transform: r.interpolate(
              (v) => `rotateZ(${(v as number) * 45}deg)`,
            ),
          }}
        />
      </animated.div>
      <animated.div
        style={{
          transform: y.interpolate(
            (v) => `translateY(${(v as number) * -4}px)`,
          ),
        }}
      >
        <animated.div
          className={styles.hamburgerBun}
          style={{
            transform: r.interpolate(
              (v) => `rotateZ(${(v as number) * -45}deg)`,
            ),
          }}
        />
      </animated.div>
    </div>
  )
}

const WrappedButton = ({
  href,
  isSelected,
  title,
  delay,
}: {
  href: string
  isSelected: boolean
  title: string
  delay: number
}) => {
  const transitions = useTransition(true, null, {
    config: {
      mass: 1,
      friction: 22,
      tension: 360,
    },
    from: {
      transform: 'translateY(10px)',
      opacity: 0,
    },
    // @ts-ignore
    enter: (_) => async (next) => {
      await new Promise((resolve) => setTimeout(resolve, delay))
      await next({
        transform: 'translateY(0)',
        opacity: 1,
      })
    },
  })
  return (
    <>
      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div key={key} style={props}>
              <SubPageButton
                title={title}
                isSelected={isSelected}
                href={href}
              />
            </animated.div>
          ),
      )}
    </>
  )
}

const FullScreenMenu = ({ rootPath }: { rootPath: string }) => {
  const { opacity } = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: {
      tension: 400,
      friction: 28,
      clamp: true,
    },
  })
  return (
    <animated.div
      className={styles.fullScreenMenuContainer}
      style={{ opacity }}
    >
      <WrappedButton
        title={'journal'}
        isSelected={rootPath === ''}
        href="/"
        delay={0}
      />
      <WrappedButton
        title={'work'}
        isSelected={rootPath === 'work'}
        href="/work"
        delay={75}
      />
      <WrappedButton
        title={'about'}
        isSelected={rootPath === 'about'}
        href="/about"
        delay={150}
      />
      <WrappedButton
        title={'contact'}
        isSelected={rootPath === 'contact'}
        href="/contact"
        delay={225}
      />
    </animated.div>
  )
}

const MobileMenu: React.FC = () => {
  const [menuDisplayed, setMenuDisplayed] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const router = useRouter()
  const rootPath = router.pathname?.split('/')[1] ?? ''

  useEffect(() => {
    if (menuDisplayed) {
      disableBodyScroll(menuRef.current!)
    } else {
      enableBodyScroll(menuRef.current!)
    }
  }, [menuDisplayed])

  // Cleanup after unmount (if you clicked a link etc)
  useEffect(
    () => () => {
      clearAllBodyScrollLocks()
    },
    [],
  )

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <Hamburger
        onClick={() => setMenuDisplayed(!menuDisplayed)}
        menuDisplayed={menuDisplayed}
        rootPath={rootPath}
      />
      {menuDisplayed && <FullScreenMenu rootPath={rootPath} />}
    </div>
  )
}

export default MobileMenu
