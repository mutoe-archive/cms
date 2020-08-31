import React from 'react'
import { Button, Header, Icon, Placeholder, Segment, Pagination } from 'semantic-ui-react'
import { PaginationDto } from 'src/services/hooks'

interface ListWrapperProps {
  loading?: boolean
  error?: boolean
  pageMeta?: defs.PaginationMeta
  onRetry?: (paginationDto: PaginationDto) => void
}

const ListWrapper: React.FC<ListWrapperProps> = (props) => {
  const placeholder = <Placeholder className='placeholderLine'>
    {new Array(10).fill(null).map((_, i) => <Placeholder.Line key={i} length='full' />)}
  </Placeholder>

  const errorSegment = <Segment placeholder>
    <Header icon>
      <Icon icon='unlink' />
      Something went wrong
    </Header>
    <Button primary>Retry</Button>
  </Segment>

  return <>
    {props.loading ? placeholder
      : props.error ? errorSegment
        : props.children}
  </>
}

export default ListWrapper
