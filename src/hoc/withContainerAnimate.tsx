import { useEffect, useRef } from 'react'
import { ComponentType } from 'react'
import _ from 'underscore'

function withContainerAnimate<T>(WrappedComponent: ComponentType<T>, animateClass: string = 'animate') {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithContainerAnimate = (props: T) => {
    const animateEl = useRef<HTMLElement>(null)
    const offsetTop = useRef<number>(0)

    useEffect(() => {
      offsetTop.current = animateEl.current!.offsetTop
      const windowResizeCallback = _.throttle(() => {
        if (animateEl.current !== null) {
          offsetTop.current = animateEl.current.offsetTop
        }
      }, 300)
      const windowScrollCallback = _.throttle(() => {
        const viewportBottomOffset = window.scrollY + window.innerHeight
        const toAnimateOffset = offsetTop.current + 15
        if (viewportBottomOffset > toAnimateOffset) {
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
        window.removeEventListener('scroll', windowScrollCallback)
      }
    }, [])

    return <WrappedComponent {...props} ref={animateEl} />
  }

  ComponentWithContainerAnimate.displayName = `withContainerAnimate(${displayName})`

  return ComponentWithContainerAnimate
}

export default withContainerAnimate
