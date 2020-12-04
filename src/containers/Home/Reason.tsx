import React from 'react'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Reason.module.scss'

const Reason = () => {
  return (
    <Heading.LevelBoundary>
      <section className={styles.container}>
        <Heading.H>풀스택 개발자가 되려는 이유?</Heading.H>
        <p>개발 분야의 종합예술을 실천하기 위해서 입니다.</p>
      </section>
    </Heading.LevelBoundary>
  )
}

export default Reason
