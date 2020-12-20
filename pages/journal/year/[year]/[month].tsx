import { GetStaticPaths, GetStaticProps } from "next"
import { getAllPosts, getAllPostsByYear, Post } from "../../../../lib"
import moment from "moment"
import PostContainer from "../../posts/[id]"

type MonthContainerProps = {
  posts: Post[]
}

const MonthContainer = ({ posts }: MonthContainerProps) => {
  if (!posts.length) return <div>Looks like no posts for that month...</div>
  return (
    <div>
      {posts.map((p) => (
        <PostContainer post={p} key={p.id} />
      ))}
    </div>
  )
}

export default MonthContainer

const MONTHS = [
  "jan",
  "feb",
  "mar",
  "apr",
  "may",
  "jun",
  "jul",
  "aug",
  "sep",
  "oct",
  "nov",
  "dec",
]

export const getStaticProps: GetStaticProps<
  any,
  { year: string; month: string }
> = async (context) => {
  if (context.params === undefined) throw new Error("no params")
  const yearNumber = parseInt(context.params.year, 10)

  const postsInYear = getAllPostsByYear(yearNumber)
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
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts()
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
