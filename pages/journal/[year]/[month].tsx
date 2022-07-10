import { GetStaticPaths, GetStaticProps } from 'next'
import { getAllPosts, getAllPostsByYear, LegacyOrV2Post } from '../../../lib'
import moment from 'moment'
import Post from '../../../components/post/Post'
import Layout from '../../../components/layout/layout'
import Head from 'next/head'
import TimePageHeader from '../../../components/time-page-header/TimePageHeader'
import FancyLink from '../../../components/fancy-link/FancyLink'

import styles from './Month.module.css'

const MONTHS = [
  'jan',
  'feb',
  'mar',
  'apr',
  'may',
  'jun',
  'jul',
  'aug',
  'sep',
  'oct',
  'nov',
  'dec',
]

const longMonths: { [key: string]: string } = {
  jan: 'January',
  feb: 'February',
  mar: 'March',
  apr: 'April',
  may: 'May',
  jun: 'June',
  jul: 'July',
  aug: 'August',
  sep: 'September',
  oct: 'October',
  nov: 'November',
  dec: 'December',
}

type MonthContainerProps = {
  posts: LegacyOrV2Post[]
  month: string
  year: string
}

const MonthContainer = ({ posts, month, year }: MonthContainerProps) => {
  return (
    <Layout>
      <Head>
        <title>{`${month} - ${year}`}</title>
      </Head>
      <TimePageHeader>
        {longMonths[month]}
        <span className={styles.desktopSpace}>&nbsp;</span>
        <FancyLink href={`/journal/${year}`}>{year}</FancyLink>
      </TimePageHeader>
      <div>
        {posts.length ? (
          posts.map((p) => <Post post={p} key={p.id} />)
        ) : (
          <div>Looks like no posts for that month...</div>
        )}
      </div>
    </Layout>
  )
}

export default MonthContainer

export const getStaticProps: GetStaticProps<
  { posts: LegacyOrV2Post[] },
  { year: string; month: string }
> = async (context) => {
  if (context.params === undefined) throw new Error('no params')
  const yearNumber = parseInt(context.params.year, 10)

  const postsInYear = await getAllPostsByYear(yearNumber)
  // Need to get posts in the given month
  const postsInMonth = postsInYear.filter((m) => {
    const month = moment(m.date).month()
    return MONTHS[month] === context.params?.month
  })

  // TODO: need some sort of 'make post' functionality here to actually
  // pull out the context of the post
  return {
    props: {
      posts: postsInMonth,
      month: context.params.month,
      year: context.params.year,
    },
    revalidate: 10,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts()
  // dedupe the years
  const years = [...new Set(posts.map((p) => moment(p.date).year().toString()))]
  const monthYears = years
    .map((year) => MONTHS.map((month) => ({ month, year })))
    .flat()
  return {
    paths: monthYears.map((m) => ({
      params: { year: m.year, month: m.month },
    })),
    fallback: false,
  }
}
