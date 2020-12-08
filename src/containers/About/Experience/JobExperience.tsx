import React from 'react'
//@ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import { JobItem } from './Experience'
import styles from './JobExperience.module.scss'
import HistoryBackground from 'components/History/History'
import MarkdownView from 'react-showdown'

interface Props {
  data: Array<JobItem>
}
const JobExperience = ({ data }: Props) => {
  return (
    <section className={styles.container}>
      <Heading.H className={styles.heading} aria-label="직무경험">
        Job
        <br />
        Experience
      </Heading.H>
      <div className={styles.content}>
        <div className={styles.historyWrapper}>
          <HistoryBackground count={data.length} />
          <ul className={`resetList ${styles.historyList}`}>
            {data.map((item) => (
              <li>
                <div className={styles.title}>
                  <MarkdownView markdown={item.title_markdown} />
                </div>
                <p className={styles.year} aria-hidden="true">
                  {item.date_string.split('~')[0].trim().split('.')[0]}
                </p>
                <p className={styles.date}>{item.date_string}</p>
                <div className={styles.description}>
                  <MarkdownView markdown={item.description_markdown} />
                </div>
              </li>
            ))}
            <li>
              <p className={styles.title}>꿈을 향해 계속 도전 중...</p>
              <p className={styles.year}>현재</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}

export default JobExperience
