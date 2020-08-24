import { noop } from 'lodash'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Dropdown, Icon, Menu, SemanticICONS } from 'semantic-ui-react'
import { DropdownItemProps } from 'semantic-ui-react/dist/commonjs/modules/Dropdown/DropdownItem'
import useAuthorizationContext from 'src/contexts/authorization.context'
import Notification from './Notification'

interface AppMenu {
  name: string
  icon: SemanticICONS
}

const AppHeader: React.FC = () => {
  const { profile, unmountAuthorization } = useAuthorizationContext()

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

  const history = useHistory()
  const onLogout = () => {
    unmountAuthorization()
    history.push('/login')
  }

  const userTrigger = <span className='userTrigger'>
    <Icon name='user' /> {profile?.username}
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
          <Icon name={item.icon} size='large' className='itemIcon' />
          <span>{item.name}</span>
        </Menu.Item>)}
    </Menu.Menu>

    <Menu.Menu position='right'>
      <Menu.Item className='menuItem' name='notification' onClick={noop}>
        <Notification icon='bell outline' numOfNew={3} />
      </Menu.Item>

      <Menu.Item className='menuItem' name='setting' onClick={noop}>
        <Dropdown trigger={userTrigger} pointing='top right'>
          <Dropdown.Menu className='menuDropdown'>
            <Dropdown.Header icon='address card' content='Admin' />
            <Dropdown.Divider />
            <Dropdown.Item onClick={onLogout}>
              <Icon name='sign-out' className='right floated' />
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
    </Menu.Menu>
  </Menu>
}

export default AppHeader
