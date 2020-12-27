import { GetStaticPaths, GetStaticProps } from 'next'
import Post from '../../../components/post/Post'
import { getAllPosts, getPostIDs } from '../../../lib'
import { Post as PostType } from '../../../lib/index'

type PostPageProps = {
  post: PostType
}

const PostPage = ({ post }: PostPageProps) => {
  // TODO: add layout etc
  return <Post post={post} />
}

export default PostPage

export const getStaticProps: GetStaticProps<
  { post: PostType },
  { id: string }
> = async (context) => {
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
