import React, { forwardRef } from 'react'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Cover.module.scss'
// import withCoverAnimate from 'hoc/withCoverAnimate'

const Cover = forwardRef<HTMLElement>((props, ref) => {
  return (
    <Heading.LevelBoundary>
      <section className={styles.container} ref={ref}>
        <Heading.H className="a11yHidden">표지</Heading.H>
        <p>이 세상에 불가능이란 없다. 단지 생소할 뿐이다.</p>
        <p>풀스텍 개발자가 되고싶은 프론트엔드 개발자 임은섭 입니다.</p>
      </section>
    </Heading.LevelBoundary>
  )
})

export default Cover
