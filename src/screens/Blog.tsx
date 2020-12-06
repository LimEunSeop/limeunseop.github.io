import React from 'react'
//@ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import withLoader from 'hoc/WithLoader'
import Cover from 'containers/Blog/Cover'

const theme_color: string = '#D03682'

const Blog = () => {
  return (
    <Heading.LevelBoundary>
      <Cover coverColor={theme_color} />
    </Heading.LevelBoundary>
  )
}

Blog.displayName = 'Blog'

export default withLoader<any>(theme_color, Blog)
