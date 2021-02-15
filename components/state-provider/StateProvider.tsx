import React, { useCallback, useRef } from 'react'

export const stateContext = React.createContext({
  journalScroll: 0,
  lastSeenPage: 0,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setJournalScroll: (_: number) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setLastSeenPage: (_: number) => {},
})
const NavImageContextProvider: React.FC = ({ children }) => {
  const journalScroll = useRef(0)
  const lastSeenPage = useRef(0)
  const setJournalScroll = useCallback((scroll: number) => {
    journalScroll.current = scroll
  }, [])

  const setLastSeenPage = useCallback((page: number) => {
    lastSeenPage.current = page
  }, [])

  return (
    <stateContext.Provider
      value={{
        journalScroll: journalScroll.current,
        setJournalScroll,
        lastSeenPage: lastSeenPage.current,
        setLastSeenPage,
      }}
    >
      {children}
    </stateContext.Provider>
  )
}

export default NavImageContextProvider
