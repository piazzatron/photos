import { useCallback, useEffect, useRef, useState } from 'react'
import React from 'react'

const TEXT_TOP = 60

export const navImageContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addRef: (_: HTMLElement) => {},
  photoDoesIntersect: false,
})

/** Terrible named component, but keeps track of whether a photo
 * is currently intersecting the navbar
 *
 * TODO: this might get non-performant with too many
 * images, we can binary search it later
 */
const NavImageContextProvider: React.FC = ({ children }) => {
  const refs = useRef<HTMLElement[]>([]).current
  const addRef = useCallback((ref: HTMLElement) => {
    refs.push(ref)
  }, refs)

  const [photoDoesIntersect, setPhotoDoesIntersect] = useState(false)

  useEffect(() => {
    const listener = () => {
      let doesIntersect = false
      for (const ref of refs) {
        const { top, bottom } = ref.getBoundingClientRect()
        if (top < TEXT_TOP && bottom > TEXT_TOP) {
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
