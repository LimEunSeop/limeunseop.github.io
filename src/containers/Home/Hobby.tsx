import React, { MutableRefObject, useEffect, useRef } from 'react'
// @ts-ignore
import { Heading } from '@tenon-io/tenon-ui'
import styles from './Hobby.module.scss'
import _ from 'underscore'

const Hobby = () => {
  const containerRef = useRef() as MutableRefObject<HTMLDivElement>
  const offsetTop = useRef() as MutableRefObject<number>

  useEffect(() => {
    offsetTop.current = containerRef.current.offsetTop
    const windowResizeCallback = _.throttle(() => {
      offsetTop.current = containerRef.current.offsetTop
      console.log(offsetTop.current)
    }, 300)
    const windowScrollCallback = _.throttle(() => {
      console.log(window.scrollY > offsetTop.current)
    }, 300)
    window.addEventListener('resize', windowResizeCallback)
    window.addEventListener('scroll', windowScrollCallback)
    return () => {
      window.removeEventListener('resize', windowResizeCallback)
      window.removeEventListener('resize', windowScrollCallback)
    }
  }, [])

  return (
    <Heading.LevelBoundary>
      <section className={styles.container} ref={containerRef}>
        <Heading.H>취미는?</Heading.H>
        <p>
          클래식 피아노를 꾸준히 하고 있어, 그로인한 성실성은 자부할 수 있습니다. 피아노를 하기 위해선 매번 새로운 곡을 만나야 하고 자신의 몸을 잘 아는 등의
          자기성찰이 필요합니다. 또한 순간순간 자신만의 연습 방법을 창조해 나가는 것이 중요하죠. 개발 분야에서도 마찬가지라고 생각합니다. 개발 분야에서도
          마찬가지로 자신을 잘 알아야 진정으로 필요기술과 도구를 잘 찾아 활용할 수 있고, 매 순간 효율적인 공부를 찾아낼 수 있다고 생각합니다.
        </p>
      </section>
    </Heading.LevelBoundary>
  )
}

export default Hobby
