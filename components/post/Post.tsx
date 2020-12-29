import { Post as PostType } from '../../lib'
import hydrate from 'next-mdx-remote/hydrate'
import InteractiveImage from '../../components/interactive-image/InteractiveImage'
import FancyLink from '../fancy-link/FancyLink'
import moment from 'moment'
import styles from './Post.module.css'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'
import { useMemo } from 'react'

type PostProps = {
  post: PostType
}

const components = { InteractiveImage }

type PostHeaderProps = {
  post: PostType
}
const PostHeader: React.FC<PostHeaderProps> = ({ post }) => {
  const date = post.date
  const momentDate = useMemo(() => moment(date), [date])
  return (
    <div className={styles.headerContainer}>
      <div className={cn(styles.headerDate, utils.montserrat, utils.fontLight)}>
        <FancyLink
          href={`/journal/year/${momentDate.year()}/${momentDate.format(
            'MMM',
          )}`.toLowerCase()}
          underlineHeight={1}
        >
          {'🗓  '}
          {momentDate.format('MMM d, YYYY')}
        </FancyLink>
      </div>
      <div
        className={cn(styles.headerTitle, utils.playfair, utils.fontRegular)}
      >
        <FancyLink href={`/journal/posts/${post.id}`}>{post.title}</FancyLink>
      </div>
      <div className={styles.headerSeparator}></div>
    </div>
  )
}

const Post = ({ post }: PostProps) => {
  return (
    <div className={styles.postContainer}>
      <PostHeader post={post} />
      <div className={styles.postContent}>
        {hydrate(post.content, { components })}
      </div>
    </div>
  )
}

export default Post
