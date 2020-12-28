import { getAllPosts, getAllPostsByYear, Post as PostType } from '../../lib'
import Post from '../post/Post'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'
import Typist from 'react-typist'

import styles from './Journal.module.css'
import { useState } from 'react'
import FancyLink from '../fancy-link/FancyLink'

type JournalProps = {
  posts: PostType[]
}

const JournalHeader = () => {
  const [topDidType, setTopDidType] = useState(false)
  const [bottomDidType, setBottomDidType] = useState(false)

  return (
    <div className={styles.journalHeaderContainer}>
      <div className={styles.headerLeft}>
        <div className={cn([utils.playfair, utils.fontBold, styles.welcome])}>
          <div className={styles.welcomeSpacer} />
          <div className={styles.wave}>👋</div>
          <div className={styles.welcomeText}>
            <Typist
              avgTypingDelay={150}
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
              avgTypingDelay={60}
              stdTypingDelay={10}
              cursor={{ blink: true, hideWhenDone: true, hideWhenDoneDelay: 0 }}
              onTypingDone={() => setBottomDidType(true)}
            >
              to the photojournal.
            </Typist>
          )}
        </div>
      </div>
      <div className={styles.divider} />
      <div className={cn(styles.headerRight, utils.montserrat)}>
        {bottomDidType && (
          <>
            <div>{`it's a cozy stream of my life starting in 2020`}</div>
            <div>
              {`captured mostly on Fuji `}
              <FancyLink underlineHeight={1} colored href="">
                {'X-Pro3 '}
              </FancyLink>{' '}
              {'& '}
              <FancyLink underlineHeight={1} colored href="">
                X100F{' '}
              </FancyLink>{' '}
              {`(so far).`}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

const Journal = ({ posts }: JournalProps) => {
  return (
    <>
      <JournalHeader />

      {posts.map((p) => (
        <Post post={p} key={p.id} />
      ))}
    </>
  )
}

export default Journal
