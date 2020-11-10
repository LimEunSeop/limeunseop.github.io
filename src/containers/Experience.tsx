import React from 'react'
import { Section } from '../App'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import { ListItem } from '../App'
import MarkdownView from 'react-showdown'

const Experience = ({ data }: { data: Section }) => {
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
                    {(listTitle as ListItem).children.length > 0 && (
                      <ul>
                        {(listTitle as ListItem).children.map((listChild, i) => (
                          <li key={i}>
                            <MarkdownView markdown={listChild} />
                          </li>
                        ))}
                      </ul>
                    )}
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

export default Experience
