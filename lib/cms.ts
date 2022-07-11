import sanityClient from '@sanity/client'
import { PostV2 } from './index'

// Grants read access to unpublished posts for previewing in dev mode
const token =
  'skhDao2eyyQAVw81XleyWreMLecyiXOR3BzQzmy8sjZDtVUOfOF92xZe7jdrT0DALBkxpAWjbijteokDlv4fY19rhqh5pGqkTr9WYE8WwPE9kkk3A0fmFEVjpnVtUxzIXwUpbBCB8shzpmAoQyzOn9IANTCxHGobwvpF08rl9grADlRXZehD'

const client = sanityClient({
  projectId: '4ot7e40n', // TODO: add this to env
  dataset: 'production',
  useCdn: true,
  apiVersion: '2022-04-19',
  token: process.env.NODE_ENV === 'production' ? undefined : token,
})

type RawCMSPost = {
  content: Array<{ text: string } | { url: string }>
  date: string
  location: string
  title: string
  openGraphImage?: string // todo, unsure how to handle this one
}

class CMSClient {
  async getAllPosts(): Promise<PostV2[]> {
    // Overly complex query language refs:
    // https://www.sanity.io/docs/how-queries-work#649d43d7d179
    const rawPosts: RawCMSPost[] = await client.fetch(`
      *[_type == "post"] {
        ...,
        "content": content[] {
          _type == 'image' => @.asset-> { url },
          _type != 'image' => @ { text }
        }
    }`)

    return rawPosts.map((p) => ({
      ...p,
      id: p.title.replace(' ', '-').toLowerCase(),
      version: '2',
      content: p.content.map((c) => {
        if ('url' in c) {
          const r = /production\/(.*)\./
          const strippedUrl = c.url.match(r)?.[1] ?? ''
          const split = c.url.split('.')
          const fileType = split[split.length - 1]

          return {
            title: p.title,
            type: 'photo',
            url: strippedUrl,
            fileType,
          }
        } else {
          return {
            type: 'text',
            text: c.text,
          }
        }
      }),
    }))
  }
}

export default CMSClient
