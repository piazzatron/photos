import { GetStaticPaths, GetStaticProps } from "next"
import { getAllPosts, getPostIDs, Post } from "../../../lib"
import hydrate from "next-mdx-remote/hydrate"

type PostProps = {
  post: Post
}

const PostContainer = ({ post }: PostProps) => {
  // TODO: need to import some layout component here
  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        {post.id}
        {post.date}
        {hydrate(post.content)}
      </div>
    </div>
  )
}

export default PostContainer

// TODO: fix this any
export const getStaticProps: GetStaticProps<any, { id: string }> = async (
  context
) => {
  const post = (await getAllPosts()).find((p) => p.id === context.params?.id)
  if (!post) throw new Error("Couldn't find a post!")
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const ids = await getPostIDs()
  return {
    paths: ids,
    fallback: false /* TODO: I probably want a fallback*/,
  }
}
