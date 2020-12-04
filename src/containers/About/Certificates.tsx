import React from 'react'
import { ListItem, Section } from 'App'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import MarkdownView from 'react-showdown'

const Certificates = ({ data }: { data: Section }) => {
  return (
    <Heading.LevelBoundary>
      <section>
        <Heading.H>{data.title}</Heading.H>
        {data.children.map((subSection, i) => (
          <Heading.LevelBoundary key={i}>
            <section>
              <Heading.H>{subSection.title}</Heading.H>
              <ul>
                {subSection.contents.map((listTitle, i) => (
                  <li key={i}>
                    <MarkdownView markdown={(listTitle as ListItem).content} />
                  </li>
                ))}
              </ul>
            </section>
          </Heading.LevelBoundary>
        ))}
      </section>
    </Heading.LevelBoundary>
  )
}

export default Certificates
