import React from 'react'
import { Input, Menu, Table, Button } from 'semantic-ui-react'
import ListWrapper from 'src/components/ListWrapper'
import { API } from 'src/services'

const ArticleListPage: React.FC = () => {
  const {
    loading,
    error,
    pageMeta,
    items: articles,
    retrieveList,
  } = API.article.retrieveArticles.useRetrieveList<defs.ArticleEntity>()

  return <div>
    <Menu attached='top'>
      <Menu.Item role='button' icon='plus' content='New' />
      <Menu.Menu position='right'>
        <Menu.Item>
          <Input icon='search' type='search' placeholder='Search' transparent />
        </Menu.Item>
      </Menu.Menu>
    </Menu>
    <ListWrapper loading={loading} pageMeta={pageMeta} error={error} onRetry={retrieveList}>
      <Table attached striped singleLine>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>ID</Table.HeaderCell>
            <Table.HeaderCell>Title</Table.HeaderCell>
            <Table.HeaderCell>Created at</Table.HeaderCell>
            <Table.HeaderCell>Updated at</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {articles.map(article => <Table.Row key={article.id} draggable>
            <Table.Cell>{article.id}</Table.Cell>
            <Table.Cell>{article.title}</Table.Cell>
            <Table.Cell>{article.createdAt}</Table.Cell>
            <Table.Cell>{article.updatedAt}</Table.Cell>
            <Table.Cell>
              <Button basic icon='edit' />
            </Table.Cell>
          </Table.Row>)}
        </Table.Body>
      </Table>
    </ListWrapper>
  </div>
}

export default ArticleListPage
