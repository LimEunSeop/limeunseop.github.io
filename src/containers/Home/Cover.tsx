import React, { forwardRef } from 'react'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Cover.module.scss'
import withCoverAnimate from 'hoc/withCoverAnimate'

interface Props {
  coverColor: string
}

const Cover = forwardRef<HTMLElement, Props>((props: Props, ref) => {
  return (
    <Heading.LevelBoundary>
      <section className={styles.container} ref={ref}>
        <Heading.H className="a11yHidden">소개</Heading.H>
        <div className={styles.coverCard} style={{ backgroundColor: props.coverColor }}>
          <p className={styles.greeting} aria-label="안녕하세요">
            <span>안녕</span>
            <span>하세요</span>
          </p>
          <p className={styles.slogan}>이 세상에 어려운 것이란 없다. 단지 생소할 뿐이다.</p>
          <p className={styles.myself}>
            웹의 모든것을 그려내고 싶은 개발자 <span className={styles.name}>임은섭</span> 입니다.
          </p>
        </div>
      </section>
    </Heading.LevelBoundary>
  )
})

export default withCoverAnimate<Props>(Cover, styles.animate)
