import { forwardRef } from 'react'
import { ProjectItem } from './Experience'
import { Heading } from '@tenon-io/tenon-ui'
import MarkdownView from 'react-showdown'
import styles from './PersonalProjects.module.scss'
import withContainerAnimate from 'hoc/withContainerAnimate'

interface Props {
  data: Array<ProjectItem>
}

const images = [require('./images/proj_1.png'), require('./images/proj_2.png'), require('./images/proj_3.png')].map((item) => item.default)
const PersonalProjects = forwardRef<HTMLElement, Props>(({ data }: Props, ref) => {
  return (
    <section className={styles.container} ref={ref}>
      <Heading.H className={styles.heading} aria-label="개인 프로젝트">
        Personal
        <br />
        Projects
      </Heading.H>
      <ul className={styles.projectsGrid}>
        {data.map((item, i) => (
          <li
            key={`personal-projects-${i}`}
            className={styles.gridItem}
            style={{ backgroundImage: `url(${images[i]})`, boxShadow: 'inset 999em 999em rgba(0,0,0,0.15)' }}
          >
            <div className={styles.gridContent}>
              <div className={styles.title}>
                <MarkdownView markdown={item.title_markdown} />
              </div>
              <p className={styles.date}>{item.date_string}</p>
              <div className={styles.description}>
                <MarkdownView markdown={item.description_markdown} />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
})

PersonalProjects.displayName = 'PersonalProjects'

export default withContainerAnimate<Props>(PersonalProjects, styles.animate)
