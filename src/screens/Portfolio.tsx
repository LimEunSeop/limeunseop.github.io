import { Heading } from '@tenon-io/tenon-ui';
import withLoader from 'hoc/WithLoader'
import Cover from 'containers/Portfolio/Cover'

const theme_color: string = '#2572AF'

const Portfolio = () => {
  return (
    <Heading.LevelBoundary>
      <Cover coverColor={theme_color} />
    </Heading.LevelBoundary>
  )
}

Portfolio.displayName = 'Portfolio'

export default withLoader<any>(theme_color, Portfolio)
