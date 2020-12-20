import { GetStaticPaths, GetStaticProps } from "next"
import { getAllPosts, getAllPostsByYear, Post } from "../../../lib"
import moment from "moment"
import PostContainer from "../posts/[id]"

type YearContainerProps = {
  posts: Post[]
}

const YearContainer = ({ posts }: YearContainerProps) => {
  if (!posts.length) return <div>Looks like no posts for that year...</div>
  return (
    <div>
      {posts.map((p) => (
        <PostContainer post={p} key={p.id} />
      ))}
    </div>
  )
}

export default YearContainer

export const getStaticProps: GetStaticProps<any, { year: string }> = async (
  context
) => {
  if (!context.params) throw new Error("no params")
  const yearNumber = parseInt(context.params.year, 10)
  const posts = await getAllPostsByYear(yearNumber)

  // TODO: need some sort of 'make post' functionality here to actually
  // pull out the context of the post
  return {
    props: {
      posts,
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
