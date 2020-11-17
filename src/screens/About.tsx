import { computeHeadingLevel } from '@testing-library/react'
import React from 'react'
import { Section } from '../App'
import Certificates from '../containers/Certificates'
import Cover from '../containers/Cover'
import Education from '../containers/Education'
import Experience from '../containers/Experience'
import OpenSourceContributions from '../containers/OpenSourceContributions'
import Skills from '../containers/Skills'
import Summary from '../containers/Summary'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'

const About = ({ data }: { data: Section }) => {
  return (
    <Heading.LevelBoundary>
      <Cover data={{ title: data.title, contents: data.contents, children: [] }} />
      <Experience data={data.children[1]} />
      <Education data={data.children[2]} />
      <Skills data={data.children[3]} />
      <Certificates data={data.children[4]} />
      <OpenSourceContributions data={data.children[5]} />
    </Heading.LevelBoundary>
  )
}

export default About
