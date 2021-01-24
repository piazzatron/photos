import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout/layout'
import Post from '../../../../components/post/Post'
import { getAllPosts, getPostIDs } from '../../../../lib'
import { Post as PostType } from '../../../../lib/index'
import moment from 'moment'

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
  const posts = await getAllPosts()
  const paths = posts.map((p) => {
    const d = moment(p.date)
    return {
      params: {
        year: d.year().toString(),
        month: d.format('MMM').toLowerCase(),
        id: p.id,
      },
    }
  })

  return {
    paths,
    fallback: false /* TODO: I probably want a fallback*/,
  }
}
