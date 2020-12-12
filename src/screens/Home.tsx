import { Section } from 'App'
import Cover from 'containers/Home/Cover'
import Promise from 'containers/Home/Promise'
import withLoader from 'hoc/WithLoader'
import { Heading } from '@tenon-io/tenon-ui'
import Wrapup from 'containers/Home/Wrapup'

const theme_color: string = '#0EA55D'

interface Props {
  data: Section | null
}

const Home = () => {
  return (
    <Heading.LevelBoundary>
      <Cover coverColor={theme_color} />
      <Promise />
      <Wrapup />
    </Heading.LevelBoundary>
  )
}

Home.displayName = 'Home'

export default withLoader<Props>(theme_color, Home)
