export const isPostPage = (pathname: string) => {
  const s = pathname.split('/')
  return s.length === 5 && s[1] === 'journal'
}

export const navbarShouldInvert = (pathname: string) => {
  const s = pathname.split('/')
  return s.length === 2 || (s[1] === 'journal' && !isPostPage(pathname))
}
