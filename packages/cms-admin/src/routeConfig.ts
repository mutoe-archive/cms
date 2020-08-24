import { AppKey } from 'src/appMenu'

export const routePath = {
  root: '/',
  login: '/login',
  notFound: '/404',
  appMatcher: '/:app(dashboard|content)',
  dashboard: '/dashboard',
  content: '/content',
}

export const routeMap = {
  app: (appKey: AppKey) => `/${appKey}`,
}

