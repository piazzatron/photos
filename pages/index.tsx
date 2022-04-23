import { GetStaticProps } from 'next'
import { getAllPosts, getAllPostsByYear, LegacyPost } from '../lib'
import moment from 'moment'
import Post from '../components/post/Post'
import Head from 'next/head'
import Layout from '../components/layout/layout'
import Journal from '../components/journal/Journal'
import { PostV2 } from '../lib/cms'

type JournalProps = {
  posts: Array<LegacyPost | PostV2>
}

const JournalPage = ({ posts }: JournalProps) => {
  return (
    <Layout>
      <div>
        <Head>
          <title>Piazza 📸</title>
        </Head>
      </div>
      <Journal posts={posts} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<
  { posts: Array<LegacyPost | PostV2> },
  Record<string, never>
> = async () => {
  const posts = await getAllPosts()
  posts.sort((a, b) => {
    const [aDate, bDate] = [moment(a.date), moment(b.date)]
    return aDate > bDate ? -1 : 1
  })
  console.log({posts})
  // TODO: need some sort of 'make post' functionality here to actually
  // pull out the context of the post
  return {
    props: {
      posts,
    },
  }
}

export default JournalPage
