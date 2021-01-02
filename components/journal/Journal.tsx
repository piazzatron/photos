import { Post as PostType } from '../../lib'
import Post from '../post/Post'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'
import Typist from 'react-typist'
import { range } from 'lodash'

import styles from './Journal.module.css'
import { useEffect, useState } from 'react'

type JournalProps = {
  posts: PostType[]
}

const JournalHeader = () => {
  const [topDidType, setTopDidType] = useState(false)
  const [bottomDidType, setBottomDidType] = useState(false)

  return (
    <div className={styles.journalHeaderContainer}>
      <div className={styles.backgroundBlob} />
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
              cursor={{ blink: true, hideWhenDone: true, hideWhenDoneDelay: 0 }}
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
            <div>{`this is a little attempt`}</div>
            <div>{`to note & recall today`}</div>
            <div>{`while it's not yet tomorrow`}</div>
          </>
        )}
      </div>
    </div>
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
