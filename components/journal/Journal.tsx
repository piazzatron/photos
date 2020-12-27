import { getAllPosts, getAllPostsByYear, Post as PostType } from '../../lib'
import Post from '../post/Post'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'

import styles from './Journal.module.css'

type JournalProps = {
  posts: PostType[]
}

const JournalHeader = () => {
  return (
    <div className={styles.journalHeaderContainer}>
      <div className={styles.headerLeft}>
        <div className={cn([utils.playfair, utils.fontBold, styles.welcome])}>
          👋 Welcome
        </div>
        <div
          className={cn([
            utils.montserrat,
            utils.fontRegular,
            styles.welcomeSubtext,
          ])}
        >
          to the photojournal.
        </div>
      </div>
      <div className={styles.divider} />
      <div className={styles.headerRight}>
        <div>
          {`You found a cozy stream-of-consciousness record
of a life unfolding in real-ish time.`}
        </div>
        <div>{`Shot mostly on Fuji X-Pro3 & X100F (so far).`}</div>
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
