import React, { useCallback, useRef } from 'react'

export const stateContext = React.createContext({
  journalScroll: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setJournalScroll: (_: number) => {},
})
const NavImageContextProvider: React.FC = ({ children }) => {
  const journalScroll = useRef(0)
  const setJournalScroll = useCallback((scroll: number) => {
    journalScroll.current = scroll
  }, [])

  return (
    <stateContext.Provider
      value={{ journalScroll: journalScroll.current, setJournalScroll }}
    >
      {children}
    </stateContext.Provider>
  )
}

export default NavImageContextProvider
