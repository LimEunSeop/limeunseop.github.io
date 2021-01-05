import { Section, ListItem } from 'utils/makeResumeData'
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Experience.module.scss'
import JobExperience from './JobExperience'
import PersonalProjects from './PersonalProjects'

interface Props {
  data: Section
}

export interface JobItem {
  title_markdown: string
  date_string: string
  description_markdown: string
}

export interface ProjectItem {
  title_markdown: string
  date_string: string
  description_markdown: string
  lesson_markdown: string
  skills_markdown: string
}

const Experience = ({ data }: Props) => {
  const job_experience_section = data.children[0]
  const personal_projects_section = data.children[1]

  const job_experiences: Array<JobItem> = []
  job_experience_section.contents.forEach((content) => {
    const job_item = content as ListItem
    const title_markdown: string = job_item.content
    const date_string: string = job_item.children[0]
    const description_markdown: string = job_item.children[1]
    job_experiences.push({ title_markdown, date_string, description_markdown })
  })

  const personal_projects: Array<ProjectItem> = []
  personal_projects_section.contents.forEach((content) => {
    const project_item = content as ListItem
    const title_markdown: string = project_item.content
    const date_string: string = project_item.children[0]
    const description_markdown: string = project_item.children[1]
    const lesson_markdown: string = project_item.children[2]
    const skills_markdown: string = project_item.children[3]
    personal_projects.push({ title_markdown, date_string, description_markdown, lesson_markdown, skills_markdown })
  })

  return (
    <Heading.LevelBoundary>
      <section className={styles.container}>
        <Heading.H className="a11yHidden">{data.title}</Heading.H>
        <Heading.LevelBoundary>
          <JobExperience data={job_experiences} />
          <PersonalProjects data={personal_projects} />
        </Heading.LevelBoundary>
      </section>
    </Heading.LevelBoundary>
  )
}

Experience.displayName = 'Experience'

export default Experience
