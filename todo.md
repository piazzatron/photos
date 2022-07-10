# Development
- Run app with `npm run dev`
- To run sanity locally, do `npm run start` (make sure Sanity is installed: `npm install -g @sanity/cli`)
  - Check out on localhost:3333
- To redeploy Sanity, do `npm run deploy`



# How this works
- `index.tsx` calls `getAllPosts()`, which gets both existing checked in posts (LegacyPost) and posts from Sanity (PostV2).
  - This calls into `cms.ts` CMSClient, which uses some complex query langauge nonsense to get the CMS posts

# Bugs
- Maybe V2 posts don't get the article inversion effect?
- BelowTheFold is broken if the first element after is text
- Hover area for image is weirdly too big

# Fun articles to write 
- How I did the header inversion effect
- Why I migrated from my own CMS to Sanity
  - It's fun to hand roll things, but ease of upload trumps all

### July 8
- [X] Render PostV2 lol
- [X] Fix up the errors in InteractiveImage.tsx
- [X] Fix PostHeaderProps type - does this work even?
- [X] Get it to invalidate next cache whenever new content is posted
- [X] Deploy the Studio for ez edits

### TODO
- [ ] Put sanity projectId as an envar
- [ ] Remove all the LegacyPost stuff


