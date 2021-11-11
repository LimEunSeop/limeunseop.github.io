import { Section } from 'utils/makeResumeData'
import Certificates from 'containers/About/Certificates/Certificates'
import Education from 'containers/About/Education'
import Experience from 'containers/About/Experience/Experience'
import OpenSourceContributions from 'containers/About/OpenSourceContributions'
import Skills from 'containers/About/Skills'
import { Heading } from '@tenon-io/tenon-ui'
import withLoader from 'hoc/WithLoader'
import Cover from 'containers/About/Cover'

interface Props {
  data: Section | null
}

const themeName = 'about'

const About = ({ data }: Props) => {
  return (
    data && (
      <Heading.LevelBoundary>
        <Cover themeName={themeName} />
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

export default withLoader<Props>(themeName, About)
