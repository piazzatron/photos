interface Scope {
  [key: string]: unknown
}
interface Source {
  compiledSource: string
  renderedOutput: string
  scope?: Scope
}

declare module "next-mdx-remote/hydrate" {
  type HydrateOptions = { components: React.ReactNode }

  let hydrate: (source: Source, options?: HydrateOptions) => JSX.Element
  export default hydrate
}

declare module "next-mdx-remote/render-to-string" {
  type RenderToStringOptions = {
    components?: unknown
    mdxOptions?: unknown
    scope?: Scope
  }

  let renderToString: (
    source: string,
    options?: RenderToStringOptions
  ) => Promise<Source>
  export default renderToString
}
