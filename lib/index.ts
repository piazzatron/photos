import { resolve } from "path"
import { readdirSync } from "fs"
import { cwd } from "process"
import matter from "gray-matter"
import { readFileSync } from "fs"

type FrontMatterData = {
  title: string
  date: string
}

export type Post = {
  id: string
  fullPath: string
  title: string
  date: string
}

const recursivelyGetFiles = (dir: string): string[] => {
  const dirents = readdirSync(dir, { withFileTypes: true })
  const files = dirents.map((dirent) => {
    const filePath = resolve(dir, dirent.name)
    return dirent.isDirectory() ? recursivelyGetFiles(filePath) : filePath
  })
  return Array.prototype.concat(...files)
}

export const getAllPosts = (): Post[] => {
  const p = resolve(cwd(), "posts")
  const files = recursivelyGetFiles(p)
  const posts = files.map((file) => {
    const fileContents = readFileSync(file, "utf8")
    const frontMatter = matter(fileContents)
    const frontMatterData = frontMatter.data as FrontMatterData
    const split = file.split("/")
    const id = split[split.length - 1].split(".")[0]
    return {
      ...frontMatterData,
      id,
      fullPath: file,
    }
  })
  return posts
}

/**
 * Returns all the posts indexed by ID, for purpose of
 * /posts/<id>
 */
export const getPostsById = () => {
  const posts = getAllPosts()
  return posts.map((post) => ({
    params: post,
  }))
}
