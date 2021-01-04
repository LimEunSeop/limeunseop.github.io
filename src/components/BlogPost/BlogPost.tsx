import * as React from 'react'
import { Heading } from '@tenon-io/tenon-ui'
import styles from './BlogPost.module.scss'

export interface BlogPostType {
  pubDate: string
  title: string
  description: string
  link: string
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  data: BlogPostType
}

const BlogPost = ({ data, ...props }: Props) => {
  return (
    <div {...props}>
      <Heading.LevelBoundary>
        <a className={styles.link} href={data.link} target="_blank" rel="noreferrer">
          <article className={styles.post}>
            <Heading.H className={styles.heading}>{data.title}</Heading.H>
            <p className={styles.pubDate}>{data.pubDate}</p>
            <div className={styles.description} dangerouslySetInnerHTML={{ __html: data.description }}></div>
          </article>
        </a>
      </Heading.LevelBoundary>
    </div>
  )
}

BlogPost.displayName = 'BlogPost'

export default BlogPost
