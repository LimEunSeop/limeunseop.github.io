import { forwardRef } from 'react'
import { Heading } from '@tenon-io/tenon-ui'
import { JobItem } from './Experience'
import styles from './JobExperience.module.scss'
import HistoryBackground from 'components/HistoryBackground/HistoryBackground'
import MarkdownView from 'react-showdown'
import withContainerAnimate from 'hoc/withContainerAnimate'

interface Props {
  data: Array<JobItem>
}
const JobExperience = forwardRef<HTMLElement, Props>(({ data }: Props, ref) => {
  return (
    <section className={styles.container} ref={ref}>
      <Heading.H className={styles.heading} aria-label="직무경험">
        Job
        <br />
        Experience
      </Heading.H>
      <div className={styles.content}>
        <div className={styles.historyWrapper}>
          <HistoryBackground count={data.length} />
          <ul className={`resetList ${styles.historyList}`}>
            {data.map((item, i) => (
              <li key={`job-experience-${i}`}>
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
})

JobExperience.displayName = 'JobExperience'

export default withContainerAnimate<Props>(JobExperience, styles.animate)
