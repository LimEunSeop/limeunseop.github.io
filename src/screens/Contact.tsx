import { Heading } from '@tenon-io/tenon-ui'
import withLoader from 'hoc/WithLoader'
import Cover from 'containers/Contact/Cover'

const themeName: string = 'contact'

const Contact = () => {
  return (
    <Heading.LevelBoundary>
      <Cover themeName={themeName} />
    </Heading.LevelBoundary>
  )
}

Contact.displayName = 'Contact'

export default withLoader<any>(themeName, Contact)
