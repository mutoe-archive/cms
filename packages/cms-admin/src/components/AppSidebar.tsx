import React, { useState } from 'react'
import { Menu, SemanticICONS } from 'semantic-ui-react'

interface MenuItem {
  name: string
  icon: SemanticICONS
}

interface ModuleMenu {
  name: string
  items: MenuItem[]
}

const moduleMenus: ModuleMenu[] = [
  {
    name: 'Content Management',
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
    name: 'Content Approval',
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
]

const AppSidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState('')

  return <aside className='AppSidebar'>
    {moduleMenus.map(menu => {
      return <Menu key={menu.name} className='Menu' vertical pointing>
        <Menu.Item header>{menu.name}</Menu.Item>
        {menu.items.map(item => {
          return <Menu.Item
            key={item.name}
            name={item.name}
            icon={item.icon}
            active={activeItem === item.name}
            onClick={() => setActiveItem(item.name)}
          />
        })}
      </Menu>
    })}
  </aside>
}

export default AppSidebar
