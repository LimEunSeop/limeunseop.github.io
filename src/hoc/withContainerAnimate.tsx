import { useEffect, useRef } from 'react'
import { ComponentType } from 'react'
import _ from 'underscore'

function withContainerAnimate<T>(WrappedComponent: ComponentType<T>, animateClass: string = 'animate') {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithContainerAnimate = (props: T) => {
    const animateContainer = useRef<HTMLElement>(null)
    const offsetTop = useRef<number>(0)

    useEffect(() => {
      if (animateContainer.current) {
        const container = animateContainer.current
        offsetTop.current = container.offsetTop
        const windowResizeCallback = _.throttle(() => {
          offsetTop.current = container.offsetTop
        }, 300)
        const windowScrollCallback = _.throttle(() => {
          const viewportBottomOffset = window.scrollY + window.innerHeight
          const toAnimateOffset = offsetTop.current + 15

          if (viewportBottomOffset > toAnimateOffset) {
            container.classList.add(animateClass)
          } else {
            container.classList.remove(animateClass)
          }
        }, 300)
        window.addEventListener('resize', windowResizeCallback)
        window.addEventListener('scroll', windowScrollCallback)
        return () => {
          window.removeEventListener('resize', windowResizeCallback)
          window.removeEventListener('scroll', windowScrollCallback)
        }
      }
    }, [])

    return <WrappedComponent {...props} ref={animateContainer} />
  }

  ComponentWithContainerAnimate.displayName = `withContainerAnimate(${displayName})`

  return ComponentWithContainerAnimate
}

export default withContainerAnimate
