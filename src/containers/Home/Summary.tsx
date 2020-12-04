import React from 'react'
import { ListItem, Section } from 'App'
// @ts-ignorets
import { Heading } from '@tenon-io/tenon-ui'
import MarkdownView from 'react-showdown'
import styles from './Summary.module.scss'

const Summary = ({ data }: { data: Section }) => {
  return (
    <Heading.LevelBoundary>
      <section className={styles.container}>
        <Heading.H>{data.title}</Heading.H>
        <ul>
          {data.contents.map((content, i) => (
            <li key={i}>
              <MarkdownView markdown={(content as ListItem).content} />
            </li>
          ))}
        </ul>
      </section>
    </Heading.LevelBoundary>
  )
}

export default Summary
