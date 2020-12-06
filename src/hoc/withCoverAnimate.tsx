import React, { useEffect, useRef } from 'react'
import { ComponentType } from 'react'
import styled from '@emotion/styled'
import _ from 'underscore'

const ScrollCoverage = styled.div`
  height: 350vh;
`
const Container = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
`

function withCoverAnimate<T>(WrappedComponent: ComponentType<T>, animateClass: string = 'animate') {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithCoverAnimate = (props: T) => {
    const wrapperEl = useRef<HTMLDivElement>(null)
    const animateEl = useRef<HTMLElement>(null)
    const offsetTop = useRef<number>(0)

    useEffect(() => {
      offsetTop.current = wrapperEl.current!.offsetTop
      const windowResizeCallback = _.throttle(() => {
        if (wrapperEl.current !== null) {
          offsetTop.current = wrapperEl.current.offsetTop
        }
      }, 300)
      const windowScrollCallback = _.throttle(() => {
        const toAnimateOffset = offsetTop.current + 15
        if (window.scrollY > toAnimateOffset) {
          if (animateEl.current !== null) {
            animateEl.current.classList.add(animateClass)
          }
        } else {
          if (animateEl.current !== null) {
            animateEl.current.classList.remove(animateClass)
          }
        }
      }, 300)
      window.addEventListener('resize', windowResizeCallback)
      window.addEventListener('scroll', windowScrollCallback)
      return () => {
        window.removeEventListener('resize', windowResizeCallback)
        window.removeEventListener('resize', windowScrollCallback)
      }
    }, [])

    return (
      <ScrollCoverage ref={wrapperEl}>
        <Container>
          <WrappedComponent {...props} ref={animateEl} />
        </Container>
      </ScrollCoverage>
    )
  }

  ComponentWithCoverAnimate.displayName = `withCoverAnimate(${displayName})`

  return ComponentWithCoverAnimate
}

export default withCoverAnimate
