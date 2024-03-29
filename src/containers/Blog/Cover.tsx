import { forwardRef, useEffect, useState } from 'react'
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Cover.module.scss'
import withCoverAnimate from 'hoc/withCoverAnimate'
import { parseString } from 'xml2js'
import BlogPost, { BlogPostType } from 'components/BlogPost/BlogPost'
import styled, { keyframes } from 'styled-components'
import { rem } from 'utils/styledComponentUtils'
import CoverObject from 'components/CoverObject'

interface Props {
  themeName: string
}

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.i`
  display: inline-block;
  width: ${rem(100)};
  height: ${rem(100)};
  font-size: ${rem(100)};
  color: rgb(173, 181, 189);
  animation: ${spin} 1.5s infinite linear;
`

const fetchUrl: string = 'https://cors-anywhere.herokuapp.com/https://medium.com/feed/@dmstjq92'

const Cover = forwardRef<HTMLDivElement, Props>((props: Props, ref) => {
  // const [blogUrl, setBlogUrl] = useState<string | null>(null)
  const [blogPosts, setBlogPosts] = useState<Array<BlogPostType> | null>(null)

  useEffect(() => {
    fetch(fetchUrl, {
      headers: {
        Origin: 'https://limeunseop.github.io',
        'X-Requested-With': 'application/xml',
      },
    })
      .then((res) => res.text())
      .then((xmlString) => {
        parseString(xmlString, (err: any, result: any) => {
          if (result?.rss?.channel[0]?.item !== null) {
            const posts = result?.rss?.channel[0]?.item
            posts.forEach((post: any) => {
              // description 속성에 있는 불필요한 태그 제거작업
              // const toGetTextContentElement = document.createElement('div')
              // toGetTextContentElement.innerHTML = post.description[0]
              // post.description = toGetTextContentElement.textContent
              post.description = post.description[0]

              // 기타 ldngth 1짜리 배열로 돼있는 속성들 평범하게 정리해주기
              post.title = post.title[0]
              post.link = post.link[0]
            })
          }
          // setBlogUrl(result?.rss?.channel[0]?.link as string)
          setBlogPosts(result?.rss?.channel[0]?.item?.slice(0, 4) as Array<BlogPostType>)
          console.log('Blog API result : ', result)
        })
      })
    return () => {}
  }, [])

  return (
    <div className={styles.container} ref={ref}>
      <div className={styles.content}>
        <CoverObject className={styles.cover} themeName={props.themeName}>
          <div className={styles.coverLetter} aria-hidden="true">
            <span>BL</span>
            <span>OG</span>
          </div>
        </CoverObject>
        <Heading.H className="a11yHidden">블로그</Heading.H>
        {blogPosts ? (
          <ul className={`resetList ${styles.blogPosts}`}>
            {blogPosts?.map((post, i) => (
              <li key={i}>
                <BlogPost className={styles.post} data={post} />
              </li>
            ))}
          </ul>
        ) : (
          <Spinner className={`fas fa-circle-notch ${styles.spinner}`} />
        )}
      </div>
    </div>
  )
})

Cover.displayName = 'BlogCover'

export default withCoverAnimate<Props>(Cover, styles.animate)
