import { resolve } from 'path'
import { readdirSync } from 'fs'
import { cwd } from 'process'
import matter from 'gray-matter'
import { readFileSync } from 'fs'
import moment from 'moment'
import renderToString from 'next-mdx-remote/render-to-string'
import InteractiveImage from '../components/interactive-image/InteractiveImage'
import BelowTheFold from '../components/post/BelowTheFold'

type FrontMatterData = {
  title: string
  date: string
}

export type Post = {
  id: string
  title: string
  date: string
  content: Source
}

const recursivelyGetFiles = (dir: string): string[] => {
  const dirents = readdirSync(dir, { withFileTypes: true })
  const files = dirents.map((dirent) => {
    const filePath = resolve(dir, dirent.name)
    return dirent.isDirectory() ? recursivelyGetFiles(filePath) : filePath
  })
  return Array.prototype.concat(...files)
}

const components = {
  InteractiveImage,
  BelowTheFold,
}

export const getAllPosts = async (): Promise<Post[]> => {
  const p = resolve(cwd(), 'posts')
  const files = recursivelyGetFiles(p)
  const posts = await Promise.all(
    files.map(async (file) => {
      const fileContents = readFileSync(file, 'utf8')
      const frontMatter = matter(fileContents)
      const frontMatterData = frontMatter.data as FrontMatterData
      const split = file.split('/')
      const id = split[split.length - 1].split('.')[0]
      const mdxSource = await renderToString(frontMatter.content, {
        components,
      })

      return {
        ...frontMatterData,
        id,
        content: mdxSource,
      }
    }),
  )
  return posts
}

/**
 * Returns all the post IDs
 */
export const getPostIDs = async () => {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    params: { id: post.id },
  }))
}

export const getAllPostsByYear = async (year: number) => {
  const posts = await getAllPosts()
  return posts.filter((post) => {
    const postYear = moment(post.date).year()
    return postYear === year
  })
}
