import { Post as PostType } from '../../lib'
import Post from '../post/Post'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'
import Typist from 'react-typist'
import { range } from 'lodash'

import styles from './Journal.module.css'
import { useEffect, useState } from 'react'

type MovingPhotoHeaderProps = {
  urls: string[]
  brightness: number
}

const MovingPhotoHeader: React.FC<MovingPhotoHeaderProps> = ({
  urls,
  brightness,
}) => {
  return (
    <div
      className={styles.movingPhotoContainer}
      style={{
        filter: `brightness(${brightness})`,
      }}
    >
      <img src={urls[0]} />
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
        urls={[
          'https://res.cloudinary.com/dlf6ppjiw/image/upload/c_scale,q_100,w_2048/piazza.photos/DSCF4435_xljnkt.jpg',
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
              <div>{`documenting the photography journey /`}</div>
              <div>{`oversharing the life journey`}</div>
              <div>{`(mostly on Fuji X-Pro3 and X100F)`}</div>
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
  const [currentPage, setCurrentPage] = useState(INITIAL_PAGE_COUNT)

  useEffect(() => {
    const listener = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - BOTTOM_SCROLL_THRESHOLD_PIXELS
      ) {
        setCurrentPage((p) => Math.min(p + 1, posts.length))
      }
    }
    window.addEventListener('scroll', listener)
    return () => {
      window.removeEventListener('scroll', listener)
    }
  }, [])
  return currentPage
}

const Journal = ({ posts }: JournalProps) => {
  const currentPage = useCurrentPage(posts)
  return (
    <>
      <JournalHeader />
      {range(currentPage).map((i) => {
        const p = posts[i]
        return <Post post={p} key={p.id} />
      })}
    </>
  )
}

export default Journal
