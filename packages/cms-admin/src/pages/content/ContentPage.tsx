import React, { Suspense } from 'react'
import { useParams } from 'react-router-dom'
import { Loader } from 'semantic-ui-react'

const PostListPage = React.lazy(() => import(/* webpackChunkName: "content" */'src/pages/content/post/PostListPage'))

type ModuleKey = 'post'

const componentMap: Record<ModuleKey, React.LazyExoticComponent<React.FC>> = {
  post: PostListPage,
}

const ContentPage: React.FC = () => {
  const { module: moduleKey } = useParams<{ module: ModuleKey }>()

  const Component = componentMap[moduleKey] || React.Fragment

  return <div className='ContentPage'>
    <h1>Content</h1>
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  </div>
}

export default ContentPage
