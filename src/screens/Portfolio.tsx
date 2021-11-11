import { Heading } from '@tenon-io/tenon-ui'
import withLoader from 'hoc/WithLoader'
import Cover from 'containers/Portfolio/Cover'

const themeName: string = 'portfolio'

const Portfolio = () => {
  return (
    <Heading.LevelBoundary>
      <Cover themeName={themeName} />
    </Heading.LevelBoundary>
  )
}

Portfolio.displayName = 'Portfolio'

export default withLoader<any>(themeName, Portfolio)
