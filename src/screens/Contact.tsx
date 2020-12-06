import React from 'react'
//@ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import withLoader from 'hoc/WithLoader'
import Cover from 'containers/Contact/Cover'

const theme_color: string = '#DDE04F'

const Contact = () => {
  return (
    <Heading.LevelBoundary>
      <Cover coverColor={theme_color} />
    </Heading.LevelBoundary>
  )
}

Contact.displayName = 'Contact'

export default withLoader<any>(theme_color, Contact)
