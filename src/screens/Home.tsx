import { Section } from 'utils/makeResumeData'
import Cover from 'containers/Home/Cover'
import Promise from 'containers/Home/Promise'
import withLoader from 'hoc/WithLoader'
import { Heading } from '@tenon-io/tenon-ui'
import Wrapup from 'containers/Home/Wrapup'
import Testimonials from 'containers/Home/Testimonials'

const themeName: string = 'home'

interface Props {
  data: Section | null
}

const Home = () => {
  return (
    <Heading.LevelBoundary>
      <Cover themeName={themeName} />
      <Promise />
      <Testimonials />
      <Wrapup />
    </Heading.LevelBoundary>
  )
}

Home.displayName = 'Home'

export default withLoader<Props>(themeName, Home)
