import React from 'react'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Want.module.scss'

const Want = () => {
  return (
    <Heading.LevelBoundary>
      <section className={styles.container}>
        <Heading.H>원하는 회사?</Heading.H>
        <p>개발자 문화, 조직이 잘 되어있는 곳을 가고 싶습니다. 활발한 코드리뷰, 스터디 등등 개발 관련 사내활동에 적극적으로 참여하고 싶습니다.</p>
        <p>또한 디자이너분과 협업하여 디자인에 대한 감각을 많이 배우고 디자이너의 영감을 충족시켜주는 개발자가 되고 싶습니다.</p>
      </section>
    </Heading.LevelBoundary>
  )
}

export default Want
