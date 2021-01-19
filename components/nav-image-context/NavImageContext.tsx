import { useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'
import { useRouter } from 'next/dist/client/router'

const TEXT_TOP = 60

export const navImageContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addRef: (_: HTMLElement, _2: boolean) => {},
  photoDoesIntersect: false,
})

/** Terrible named component, but keeps track of whether a photo
 * is currently intersecting the navbar
 *
 * TODO: this might get non-performant with too many
 * images, we can binary search it later
 */
const NavImageContextProvider: React.FC = ({ children }) => {
  const refs = useRef<{ ref: HTMLElement; belowFold: boolean }[]>([])
  const addRef = useCallback(
    (ref: HTMLElement, belowFold: boolean) => {
      refs.current.push({ ref, belowFold })
    },
    [refs.current],
  )

  const router = useRouter()
  const pathname = router.pathname

  // Nuke the refs array when we navigate to a new page
  useEffect(() => {
    refs.current = []
  }, [pathname])

  const { width: screenWidth } =
    typeof screen === 'undefined' ? { width: 0 } : screen

  const getDoesIntersect = useCallback(() => {
    if (!screenWidth) return false
    const isMobile = screenWidth < 680

    // account for header bit but only if we're on the journal page
    // threshold depends on whether mobile or not
    if (
      pathname === '/journal' &&
      (isMobile ? window.scrollY < 256 : window.scrollY < 320)
    ) {
      return true
    }

    for (const { ref, belowFold } of refs.current) {
      const rec = ref.getBoundingClientRect()
      const { top, width, height } = rec
      let { bottom } = rec

      // If we're below the fold, pretend we're only 200px tall
      if (belowFold) {
        bottom = top + 200
      }

      // HACK: account for landscape being significantly wider than tall
      // ONLY if we're not on mobile
      const isMobileOrLandscape = isMobile || width > height * 1.2
      if (isMobileOrLandscape && top < TEXT_TOP && bottom > TEXT_TOP) {
        return true
      }
    }
    return false
  }, [pathname, screenWidth])

  const [photoDoesIntersect, setPhotoDoesIntersect] = useState(true)

  // Run it once at the beginning, or on page change
  useEffect(() => {
    const doesIntersect = getDoesIntersect()
    if (doesIntersect !== photoDoesIntersect) {
      setPhotoDoesIntersect(doesIntersect)
    }
  }, [pathname])

  // Run it on scroll
  useEffect(() => {
    const listener = () => {
      const doesIntersect = getDoesIntersect()
      if (doesIntersect !== photoDoesIntersect) {
        setPhotoDoesIntersect(doesIntersect)
      }
    }
    document.addEventListener('scroll', listener)
    return () => {
      document.removeEventListener('scroll', listener)
    }
  }, [photoDoesIntersect, pathname, screenWidth])

  return (
    <navImageContext.Provider value={{ addRef, photoDoesIntersect }}>
      {children}
    </navImageContext.Provider>
  )
}

export default NavImageContextProvider
