import { ComponentType, useEffect, useState } from 'react'
import Loader from 'components/Loader/Loader'
import { useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'

function withLoader<T>(themeName: string, WrappedComponent: ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithLoader = (props: T) => {
    const [isLoading, setIsLoading] = useState(true)
    const { loadingTime } = useSelector((state: RootState) => state.app)

    useEffect(() => {
      window.setTimeout(() => {
        setIsLoading(false)
      }, loadingTime * 1000)
    }, [loadingTime])

    if (isLoading) {
      return <Loader nextTheme={themeName} />
    }

    return <WrappedComponent {...props} />
  }

  ComponentWithLoader.displayName = `withLoader(${displayName})`

  return ComponentWithLoader
}

export default withLoader
