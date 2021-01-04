import { Section } from 'App'
import Certificates from 'containers/About/Certificates/Certificates'
import Education from 'containers/About/Education'
import Experience from 'containers/About/Experience/Experience'
import OpenSourceContributions from 'containers/About/OpenSourceContributions'
import Skills from 'containers/About/Skills'
import { Heading } from '@tenon-io/tenon-ui'
import withLoader from 'hoc/WithLoader'
import Cover from 'containers/About/Cover'

const theme_color: string = '#5353d4'

interface Props {
  data: Section | null
}

const About = ({ data }: Props) => {
  return (
    data && (
      <Heading.LevelBoundary>
        <Cover coverColor={theme_color} />
        <Experience data={data.children[1]} />
        <Education data={data.children[2]} />
        <Certificates data={data.children[4]} />
        <OpenSourceContributions data={data.children[5]} />
        <Skills data={data.children[3]} />
      </Heading.LevelBoundary>
    )
  )
}

About.displayName = 'About'

export default withLoader<Props>(theme_color, About)
