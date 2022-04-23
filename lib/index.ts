import { resolve } from 'path'
import { readdirSync } from 'fs'
import { cwd } from 'process'
import matter from 'gray-matter'
import { readFileSync } from 'fs'
import moment from 'moment'
import renderToString from 'next-mdx-remote/render-to-string'
import InteractiveImage from '../components/interactive-image/InteractiveImage'
import BelowTheFold from '../components/post/BelowTheFold'
import CMSClient, { PostV2 } from './cms'

type FrontMatterData = {
  title: string
  date: string
  location?: string
  openGraphImage?: string
}

export type LegacyPost = {
  id: string
  title: string
  location?: string
  openGraphImage?: string
  date: string
  content: Source
  version: '1'
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

const client = new CMSClient()

export const getAllPosts = async (): Promise<Array<LegacyPost | PostV2>> => {
  const p = resolve(cwd(), 'posts')
  const files = recursivelyGetFiles(p)
  const posts: LegacyPost[] = await Promise.all(
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
        version: '1' as const,
      }
    }),
  )

  const cmsPosts = await client.getAllPosts()
  return [...posts, ...cmsPosts]
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
