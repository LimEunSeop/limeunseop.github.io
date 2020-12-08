import React from 'react'
import { ProjectItem } from './Experience'
//@ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import MarkdownView from 'react-showdown'
import styles from './PersonalProjects.module.scss'
import proj_img1 from './images/proj_1.png'
import proj_img2 from './images/proj_2.png'

interface Props {
  data: Array<ProjectItem>
}

const images = [proj_img1, proj_img2]
const colors = [
  'rgba(210,72,173,0.6)',
  'rgba(86,81,228,0.6)',
  'rgba(237,173,100,0.6)',
  'rgba(157,5,72,0.6)',
  'rgba(57,223,206,0.6)',
  'rgba(128,81,87,0.6)',
  'rgba(16,50,58,0.6)',
]

const PersonalProjects = ({ data }: Props) => {
  return (
    <section className={styles.container}>
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
            style={{ backgroundImage: `url(${images[i]})`, boxShadow: `inset 999em 999em ${colors[i]}` }}
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
}

export default PersonalProjects
