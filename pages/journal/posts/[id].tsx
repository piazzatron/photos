import { GetStaticPaths, GetStaticProps } from "next"
import { getAllPosts, getPostsById, Post } from "../../../lib"

type PostProps = {
  post: Post
}

const PostContainer = ({ post }: PostProps) => {
  // TODO: need to import some layout component here
  console.log({ post })
  return (
    <div>
      This is a post
      <div>
        {post.id}
        {post.title}
        {post.date}
      </div>
    </div>
  )
}

export default PostContainer

export const getStaticProps: GetStaticProps<any, { id: string }> = async (
  context
) => {
  const post = getAllPosts().find((p) => p.id === context.params?.id)
  if (!post) throw new Error("Couldn't find a post!")
  return {
    props: {
      post,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPostsById()
  return {
    paths: posts,
    fallback: false /* TODO: I probably want a fallback*/,
  }
}
