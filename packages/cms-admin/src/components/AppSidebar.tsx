import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import { ModuleMenu } from 'src/appMenu'

interface AppSidebarProps {
  moduleMenus: ModuleMenu[]
}

const AppSidebar: React.FC<AppSidebarProps> = ({ moduleMenus }) => {
  const [activeItem, setActiveItem] = useState('')

  return <aside className='AppSidebar'>
    {moduleMenus.map(moduleMenu => {
      return <Menu key={moduleMenu.moduleName} className='Menu' vertical pointing>
        <Menu.Item header>{moduleMenu.moduleName}</Menu.Item>
        {moduleMenu.items.map(item => {
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
