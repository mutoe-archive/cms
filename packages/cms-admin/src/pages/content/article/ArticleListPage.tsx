import React from 'react'
import { Input, Menu, Placeholder, Segment } from 'semantic-ui-react'

const ArticleListPage: React.FC = () => {
  return <div>
    <Menu attached='top'>
      <Menu.Item role='button' icon='plus' content='New' />
      <Menu.Menu position='right'>
        <Menu.Item>
          <Input icon='search' type='search' placeholder='Search' transparent />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <Segment attached='bottom'>
      <Placeholder className='placeholderLine'>
        <Placeholder.Line length='full' />
        <Placeholder.Line length='full' />
        <Placeholder.Line length='full' />
        <Placeholder.Line length='full' />
        <Placeholder.Line length='full' />
        <Placeholder.Line length='full' />
      </Placeholder>
    </Segment>
  </div>
}

export default ArticleListPage
