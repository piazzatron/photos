import { Post as PostType } from '../../lib'
import Post from '../post/Post'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'
import Typist from 'react-typist'
import { range } from 'lodash'

import styles from './Journal.module.css'
import { useContext, useEffect, useState } from 'react'
import EmailSubscribe from '../email-subscribe/EmailSubscribe'
import { stateContext } from '../state-provider/StateProvider'
import { animated, config, useTransition } from 'react-spring'

type MovingPhotoHeaderProps = {
  ids: string[]
  brightness: number
}

const makeCurrentURL = (id: string, isMobile: boolean) => {
  const width = isMobile ? 1280 : 2048
  return `https://res.cloudinary.com/dlf6ppjiw/image/upload/c_scale,q_78,w_${width}/piazza.photos/${id}.jpg`
}

const MOVING_PHOTO_DURATION_MS = 7500

const MovingPhotoHeader: React.FC<MovingPhotoHeaderProps> = ({
  ids,
  brightness,
}) => {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const handle = setTimeout(() => {
      setIndex((index) => {
        let newIndex = Math.floor(Math.random() * ids.length)
        while (newIndex === index) {
          newIndex = Math.floor(Math.random() * ids.length)
        }
        return newIndex
      })
    }, MOVING_PHOTO_DURATION_MS)
    return () => {
      clearTimeout(handle)
    }
  }, [index])

  const transitions = useTransition(index, (item) => item, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: config.slow,
  })
  const isMobile =
    typeof window === 'undefined' ? false : window.screen.width < 680
  return (
    <div className={styles.outerContainer}>
      {transitions.map(({ item, key, props }) => (
        <animated.div
          className={styles.movingPhotoContainer}
          key={key}
          style={{
            filter: `brightness(${brightness})`,
            ...props,
          }}
        >
          <img src={makeCurrentURL(ids[item], isMobile)} />
        </animated.div>
      ))}
    </div>
  )
}

type JournalProps = {
  posts: PostType[]
}

const JournalHeader = () => {
  const [topDidType, setTopDidType] = useState(false)
  const [bottomDidType, setBottomDidType] = useState(false)

  // Animates from 0 -> 1 as we scroll down
  const [scroll, setScroll] = useState(0)

  useEffect(() => {
    const listener = () => {
      const scrollY = window.scrollY
      const clamped = Math.min(1, scrollY / 320)
      setScroll(clamped)
    }
    document.addEventListener('scroll', listener)
    return () => {
      document.removeEventListener('scroll', listener)
    }
  }, [])

  const brightness = 1 - scroll
  const translate = -35 * scroll

  return (
    <>
      <MovingPhotoHeader
        brightness={brightness}
        ids={[
          '1_i8exof',
          'DSCF4435_xljnkt',
          'DSCF4559_3_fkbmw0',
          'smokestack_pwn4ek',
          'DSCF3505_7_cygx7d',
          'Gas2_xnge4z',
          'fires_m2bbtw',
          '3_z7xpb5',
        ]}
      />
      <div
        className={styles.journalHeaderContainer}
        style={{
          filter: `brightness(${brightness})`,
          transform: `translateY(${translate}px)`,
        }}
      >
        {/* <div className={styles.backgroundBlob} /> */}
        <div className={styles.headerLeft}>
          <div className={cn([utils.playfair, utils.fontBold, styles.welcome])}>
            <div className={styles.welcomeSpacer} />
            <div className={styles.wave}>👋</div>
            <div className={styles.welcomeText}>
              <Typist
                avgTypingDelay={75}
                stdTypingDelay={10}
                startDelay={100}
                cursor={{ hideWhenDone: true, hideWhenDoneDelay: 0 }}
                onTypingDone={() => setTopDidType(true)}
              >
                welcome
              </Typist>
            </div>
          </div>
          <div
            className={cn([
              utils.montserrat,
              utils.fontLight,
              styles.welcomeSubtext,
            ])}
          >
            {topDidType && (
              <Typist
                avgTypingDelay={30}
                stdTypingDelay={10}
                cursor={{
                  blink: true,
                  hideWhenDone: true,
                  hideWhenDoneDelay: 0,
                }}
                onTypingDone={() => setBottomDidType(true)}
              >
                to my photojournal.
              </Typist>
            )}
          </div>
        </div>
        <div className={styles.divider} />
        <div className={cn(styles.headerRight, utils.montserrat)}>
          {bottomDidType && (
            <>
              <div>{`a light meandering log`}</div>
              <div>{`of musings, moments, and minutia`}</div>
              <div>{`seen mostly on Fuji X`}</div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

const INITIAL_PAGE_COUNT = 3
const BOTTOM_SCROLL_THRESHOLD_PIXELS = 300

const useCurrentPage = (posts: PostType[]) => {
  const { setJournalScroll, lastSeenPage, setLastSeenPage } = useContext(
    stateContext,
  )
  const initialPage = Math.max(INITIAL_PAGE_COUNT, lastSeenPage)
  const [currentPage, setCurrentPage] = useState(initialPage)

  useEffect(() => {
    const listener = () => {
      // If scrollY is zero, don't set it bc when we navigate
      // off of the journal page, it briefly resets at zero
      const { scrollY } = window
      if (scrollY) {
        setJournalScroll(window.scrollY)
      }
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - BOTTOM_SCROLL_THRESHOLD_PIXELS
      ) {
        setCurrentPage((p) => {
          const newPage = Math.min(p + 1, posts.length)
          setLastSeenPage(newPage)
          return newPage
        })
      }
    }
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])
  return currentPage
}

const useSetInitialScroll = () => {
  const { journalScroll } = useContext(stateContext)
  useEffect(() => {
    window.scroll(0, journalScroll)
  }, [])
}

const Journal = ({ posts }: JournalProps) => {
  const currentPage = useCurrentPage(posts)
  const items = range(currentPage).map((i) => {
    const p = posts[i]
    return <Post post={p} key={p.id} />
  })

  useSetInitialScroll()

  items.splice(
    3,
    0,
    <div className={styles.subscribeContainer}>
      <EmailSubscribe key="subscribe" />
    </div>,
  )

  return (
    <>
      <JournalHeader />
      {items}
    </>
  )
}

export default Journal
