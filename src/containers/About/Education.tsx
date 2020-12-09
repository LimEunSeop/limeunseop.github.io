import React from 'react'
import { Section } from 'App'
// @ts-ignorets
import { Heading } from '@tenon-io/tenon-ui'
import { ListItem } from 'App'
import MarkdownView from 'react-showdown'
import styles from './Education.module.scss'

interface Props {
  data: Section
}

interface EducationItem {
  title_markdown: string
  date_string: string
  description_markdown: string
  evidence_markdown: string | null
}

const Education = ({ data }: Props) => {
  const external_education_section: Section = data.children[1]

  const external_educations: Array<EducationItem> = []
  external_education_section.contents.forEach((content) => {
    const education_item = content as ListItem
    const title_markdown = education_item.content
    const date_string = education_item.children[0]
    const description_markdown = education_item.children[1]
    const evidence_markdown = education_item.children[2] || null
    external_educations.push({ title_markdown, date_string, description_markdown, evidence_markdown })
  })

  return (
    <Heading.LevelBoundary>
      <section className={styles.container}>
        <Heading.H className={styles.heading}>{data.title}</Heading.H>
        <ul className={styles.list}>
          {external_educations.map((item) => (
            <li key={`${item.title_markdown}-${item.date_string}`} className={styles.item}>
              <div className={styles.itemInnerWrapper}>
                <header>
                  <div className={styles.title}>
                    <MarkdownView markdown={item.title_markdown} />
                  </div>
                  <div className={styles.date}>{item.date_string}</div>
                </header>

                <div className={styles.content}>
                  <div className={styles.description}>
                    <MarkdownView markdown={item.description_markdown} />
                  </div>
                </div>
                {item.evidence_markdown && (
                  <footer>
                    <div>
                      <MarkdownView markdown={item.evidence_markdown} />
                    </div>
                  </footer>
                )}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </Heading.LevelBoundary>
  )
}

export default Education
