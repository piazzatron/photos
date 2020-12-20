import { Post as PostType } from "../../lib"
import Link from "next/link"
import hydrate from "next-mdx-remote/hydrate"
import InteractiveImage from "../../components/interactive-image/InteractiveImage"

type PostProps = {
  post: PostType
}

const components = { InteractiveImage }

const Post = ({ post }: PostProps) => {
  // TODO: need to import some layout component here
  return (
    <div>
      <h1>
        <Link href={`/journal/posts/${post.id}`}>
          <a>{post.title}</a>
        </Link>
      </h1>
      <div>
        {post.id}
        {post.date}
        {hydrate(post.content, { components })}
      </div>
    </div>
  )
}

export default Post
