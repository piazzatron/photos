import { useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'

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
  const refs = useRef<{ ref: HTMLElement; belowFold: boolean }[]>([]).current
  const addRef = useCallback((ref: HTMLElement, belowFold: boolean) => {
    refs.push({ ref, belowFold })
  }, refs)

  const [photoDoesIntersect, setPhotoDoesIntersect] = useState(true)

  useEffect(() => {
    const listener = () => {
      let doesIntersect = false
      const { width: screenWidth } = screen
      const isMobile = screenWidth < 680

      // account for header bit
      if (window.scrollY < 320) {
        if (!photoDoesIntersect) {
          setPhotoDoesIntersect(true)
        }
        return
      }

      for (const { ref, belowFold } of refs) {
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
          doesIntersect = true
          break
        }
      }
      if (doesIntersect !== photoDoesIntersect) {
        setPhotoDoesIntersect(doesIntersect)
      }
    }
    document.addEventListener('scroll', listener)
    return () => {
      document.removeEventListener('scroll', listener)
    }
  }, [photoDoesIntersect])

  return (
    <navImageContext.Provider value={{ addRef, photoDoesIntersect }}>
      {children}
    </navImageContext.Provider>
  )
}

export default NavImageContextProvider
