import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPosts, getAllPostsByYear, Post as PostType } from '../../lib'
import moment from 'moment'
import Post from '../../components/post/Post'
import Layout from '../../components/layout/layout'
import Head from 'next/head'
import TimePageHeader from '../../components/time-page-header/TimePageHeader'

type YearContainerProps = {
  posts: PostType[]
  year: string
}

const YearContainer = ({ posts, year }: YearContainerProps) => {
  return (
    <Layout>
      <Head>
        <title>{year}</title>
      </Head>
      <TimePageHeader>{year}</TimePageHeader>
      <div>
        {posts.length ? (
          posts.map((p) => <Post post={p} key={p.id} />)
        ) : (
          <div>Looks like no posts for that year...</div>
        )}
      </div>
    </Layout>
  )
}

export default YearContainer

export const getStaticProps: GetStaticProps<
  { posts: PostType[] },
  { year: string }
> = async (context) => {
  if (!context.params) throw new Error('no params')
  const yearNumber = parseInt(context.params.year, 10)
  const posts = await getAllPostsByYear(yearNumber)

  // TODO: need some sort of 'make post' functionality here to actually
  // pull out the context of the post
  return {
    props: {
      posts,
      year: context.params.year,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  // dedupe the years
  const years = [...new Set(posts.map((p) => moment(p.date).year().toString()))]
  return {
    paths: years.map((year) => ({ params: { year } })),
    fallback: false,
  }
}
