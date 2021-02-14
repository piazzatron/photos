import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '../../../../components/layout/layout'
import Post from '../../../../components/post/Post'
import { getAllPosts } from '../../../../lib'
import { Post as PostType } from '../../../../lib/index'
import { makeImageURL } from '../../../../components/interactive-image/InteractiveImage'
import moment from 'moment'
import { NextSeo } from 'next-seo'

type PostPageProps = {
  post: PostType
}

const PostPageSEO = ({ post }: { post: PostType }) => {
  const image = post?.openGraphImage
    ? makeImageURL(post.openGraphImage, 900)
    : null
  const dateString = moment(post.date).format('MMM D, YYYY')
  const description = `${dateString}${
    post.location ? ` / ${post.location}` : ''
  }`

  return (
    <NextSeo
      title={post.title}
      openGraph={{
        title: `${post.title} - Michael Piazza Photography`,
        description: description,
        images: image ? [{ url: image, height: 600, width: 900 }] : [],
      }}
      twitter={{
        handle: '@piazzatron',
        cardType: 'summary_large_image',
      }}
    />
  )
}

const PostPage = ({ post }: PostPageProps) => {
  return (
    <>
      <PostPageSEO post={post} />
      <Layout>
        <Head>
          <title>{post.title}</title>
        </Head>
        <Post post={post} isCompact />
      </Layout>
    </>
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
