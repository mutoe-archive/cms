export const routePath = {
  root: '/',
  login: '/login',
  notFound: '/404',
  appMatcher: '/:app(dashboard|content)',
  moduleMatcher: '/:app/:module?',
  dashboard: '/dashboard',

  content: {
    root: '/content',
    matcher: '/content/:module(post|category|tag|page|guestbook|comment)',
    post: '/content/post',
    category: '/content/category',
    tag: '/content/tag',
    page: '/content/page',
    guestbook: '/content/guestbook',
    comment: '/content/comment',
  } as Record<string, string>,
}

export const routeMap = {
  app: (appKey: string) => `/${appKey}`,
  module: (appKey: string, module: string) => `/${appKey}/${module}`,
}

