import { LegacyOrV2Post, LegacyPost, PostV2 } from '../../lib'
import hydrate from 'next-mdx-remote/hydrate'
import InteractiveImage from '../../components/interactive-image/InteractiveImage'
import FancyLink from '../fancy-link/FancyLink'
import moment from 'moment'
import styles from './Post.module.css'
import cn from 'classnames'
import utils from '../../styles/utils.module.css'
import BelowTheFold from './BelowTheFold'
import { useMemo } from 'react'
import { DiscussionEmbed } from 'disqus-react'

type PostProps = {
  post: LegacyOrV2Post
  isCompact?: boolean
}

const components = { InteractiveImage, BelowTheFold }

type PostHeaderProps = {
  post: LegacyOrV2Post
  postUrl: string
}
const PostHeader: React.FC<PostHeaderProps> = ({ post, postUrl }) => {
  const momentDate = useMemo(() => moment(post.date), [post.date])
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
    </div>
  )
}

const LegacyPostContent = ({ post }: { post: LegacyPost }) => {
  return <>{hydrate(post.content, { components })}</>
}

const PostV2Content = ({ post }: { post: PostV2 }) => {
  return (
    <>
      {post.content.map((content, i) => {
        if (content.type === 'photo') {
          return (
            <InteractiveImage
              imageId={content.url}
              version="2"
              fileType={content.fileType}
            />
          )
        }
        return <p key={i}>{content.text}</p>
      })}
    </>
  )
}

const Post = ({ post, isCompact = false }: PostProps) => {
  const momentDate = useMemo(() => moment(post.date), [post.date])
  const postUrl = `/journal/${momentDate.year().toString()}/${momentDate
    .format('MMM')
    .toLowerCase()}/${post.id}`

  return (
    <div
      className={cn(styles.postContainer, { [styles.isCompact]: isCompact })}
    >
      <PostHeader post={post} postUrl={postUrl} />
      <div className={styles.postContent}>
        {post.version === '1' ? (
          <LegacyPostContent post={post} />
        ) : (
          <PostV2Content post={post} />
        )}
      </div>
      <div
        className={cn(styles.backButton, utils.montserrat, utils.fontRegular)}
      >
        <FancyLink href={isCompact ? '/' : postUrl} underlineHeight={2}>
          {isCompact ? '< Journal' : '> See Full Post'}
        </FancyLink>
      </div>
      {isCompact && (
        <div className={styles.disqusWrapper}>
          <DiscussionEmbed
            shortname="piazza-photos"
            config={{
              url: `https://piazza.photos${postUrl}`,
              identifier: post.id,
              title: post.title,
            }}
          />
          <div className={styles.disqusFooterCoverer} />
        </div>
      )}
    </div>
  )
}

export default Post
