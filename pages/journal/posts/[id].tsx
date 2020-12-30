import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../../components/layout/layout'
import Post from '../../../components/post/Post'
import { getAllPosts, getPostIDs } from '../../../lib'
import { Post as PostType } from '../../../lib/index'

type PostPageProps = {
  post: PostType
}

const PostPage = ({ post }: PostPageProps) => {
  return (
    <Layout>
      <Head>
        <title>{post.title}</title>
      </Head>
      <Post post={post} isCompact />
    </Layout>
  )
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
