import { Post as PostType } from '../../lib'
import hydrate from 'next-mdx-remote/hydrate'
import InteractiveImage from '../../components/interactive-image/InteractiveImage'
import FancyLink from '../fancy-link/FancyLink'
import moment from 'moment'
import styles from './Post.module.css'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'
import BelowTheFold from './BelowTheFold'
import { useMemo } from 'react'

type PostProps = {
  post: PostType
  isCompact?: boolean
}

const components = { InteractiveImage, BelowTheFold }

type PostHeaderProps = {
  post: PostType
}
const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const date = post.date
  const momentDate = useMemo(() => moment(date), [date])
  const postUrl = `/journal/${momentDate.year().toString()}/${momentDate
    .format('MMM')
    .toLowerCase()}/${post.id}`
  return (
    <div className={styles.headerContainer}>
      <div
        className={cn(styles.headerTitle, utils.playfair, utils.fontRegular)}
      >
        <FancyLink href={postUrl}>{post.title}</FancyLink>
      </div>
      <div
        className={cn(styles.headerDate, utils.montserrat, utils.fontRegular)}
      >
        <FancyLink
          href={`/journal/${momentDate.year()}/${momentDate.format(
            'MMM',
          )}`.toLowerCase()}
          underlineHeight={0}
        >
          {`${momentDate.format('MMM D, YYYY')}`}
        </FancyLink>
        {post.location && (
          <>
            <span className={styles.slash}>&nbsp; / &nbsp;</span>
            {post.location}
          </>
        )}
      </div>
      <div className={styles.headerSeparator}></div>
    </div>
  )
}

const Post = ({ post, isCompact = false }: PostProps) => {
  return (
    <div
      className={cn(styles.postContainer, { [styles.isCompact]: isCompact })}
    >
      <PostHeader post={post} />
      <div className={styles.postContent}>
        {hydrate(post.content, { components })}
      </div>
      <div
        className={cn(styles.backButton, utils.montserrat, utils.fontRegular)}
      >
        <FancyLink
          href={isCompact ? '/journal' : `/journal/posts/${post.id}`}
          underlineHeight={2}
        >
          {isCompact ? '< Journal' : '> See Full Post'}
        </FancyLink>
      </div>
    </div>
  )
}

export default Post
