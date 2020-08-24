import { SemanticICONS } from 'semantic-ui-react'

export type AppKey = 'dashboard' | 'content'

export interface AppMenu {
  key: AppKey
  appName: string
  icon: SemanticICONS
  modules?: ModuleMenu[]
}

export interface ModuleMenu {
  moduleName: string
  items: MenuItem[]
}

interface MenuItem {
  name: string
  icon: SemanticICONS
}

export const appMenus: AppMenu[] = [
  {
    key: 'dashboard',
    appName: 'Dashboard',
    icon: 'dashboard',
  },

  {
    key: 'content',
    appName: 'Content',
    icon: 'newspaper',
    modules: [
      {
        moduleName: 'Content Management',
        items: [
          {
            name: 'Posts',
            icon: 'paper plane',
          },
          {
            name: 'Categories',
            icon: 'grid layout',
          },
          {
            name: 'Tags',
            icon: 'tags',
          },
          {
            name: 'Pages',
            icon: 'page4',
          },
        ],
      },
      {
        moduleName: 'Content Approval',
        items: [
          {
            name: 'Message board',
            icon: 'facebook messenger',
          },
          {
            name: 'Comments',
            icon: 'comments',
          },
        ],
      },
    ],
  },
]

