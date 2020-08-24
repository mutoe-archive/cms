import { noop } from 'lodash'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Dropdown, Icon, Menu, SemanticICONS } from 'semantic-ui-react'
import Notification from './Notification'

interface AppMenu {
  name: string
  icon: SemanticICONS
}

const AppHeader: React.FC = () => {
  const menu: AppMenu[] = [
    {
      name: 'Dashboard',
      icon: 'dashboard',
    }, {
      name: 'Content',
      icon: 'newspaper',
    },
  ]

  const [activeItem, setActiveItem] = useState(menu[0].name)

  const iconStyle = {
    margin: '0 10px 0 0',
  }

  const options = [
    { key: 'sign-out', text: 'Sign Out' },
  ]

  const userTrigger = <span className='userTrigger'>
    <Icon name='user' /> user
  </span>

  return <Menu pointing secondary className='AppHeader'>

    <Menu.Menu postion='left' className='menuLogo'>
      <Menu.Item>
        <Link className='logoLink' to='dashboard'>Mutoe CMS</Link>
      </Menu.Item>
    </Menu.Menu>

    <Menu.Menu>
      {menu.map(item =>
        <Menu.Item
          className='menuItem'
          key={item.name}
          name={item.name}
          active={activeItem === item.name}
          onClick={() => setActiveItem(item.name)}
        >
          <Icon name={item.icon} size='large' style={iconStyle} />
          <span>{item.name}</span>
        </Menu.Item>)}
    </Menu.Menu>

    <Menu.Menu position='right'>
      <Menu.Item className='menuItem' name='notification' onClick={noop}>
        <Notification icon='bell outline' numOfNew={3} />
      </Menu.Item>

      <Menu.Item className='menuItem' name='setting' onClick={noop}>
        <Dropdown trigger={userTrigger} options={options} pointing='top right' />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
}

export default AppHeader
