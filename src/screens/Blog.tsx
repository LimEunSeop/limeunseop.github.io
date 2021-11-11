import { Heading } from '@tenon-io/tenon-ui'
import withLoader from 'hoc/WithLoader'
import Cover from 'containers/Blog/Cover'

const themeName = 'blog'

const Blog = () => {
  return (
    <Heading.LevelBoundary>
      <Cover themeName={themeName} />
    </Heading.LevelBoundary>
  )
}

Blog.displayName = 'Blog'

export default withLoader<any>(themeName, Blog)
