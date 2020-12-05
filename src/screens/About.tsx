import React from 'react'
import { Section } from 'App'
import Certificates from 'containers/About/Certificates'
import Education from 'containers/About/Education'
import Experience from 'containers/About/Experience'
import OpenSourceContributions from 'containers/About/OpenSourceContributions'
import Skills from 'containers/About/Skills'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import withLoader from 'hoc/WithLoader'

const theme_color: string = '#5353d4'

interface Props {
  data: Section
}

const About = ({ data }: Props) => {
  return (
    <Heading.LevelBoundary>
      {/* <Cover data={{ title: data.title, contents: data.contents, children: [] }} /> */}
      <Experience data={data.children[1]} />
      <Education data={data.children[2]} />
      <Skills data={data.children[3]} />
      <Certificates data={data.children[4]} />
      <OpenSourceContributions data={data.children[5]} />
    </Heading.LevelBoundary>
  )
}

About.displayName = 'About'

export default withLoader<Props>(theme_color, About)
