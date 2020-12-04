import { AppContext, AppContextType } from 'App'
import React, { ComponentType, useContext, useEffect, useState } from 'react'
import Loader from './Loader'

function withLoader<T>(theme_color: string, WrappedComponent: ComponentType<T>) {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component'

  const ComponentWithLoader = (props: T) => {
    const [isLoading, setIsLoading] = useState(true)
    const appContext: AppContextType = useContext(AppContext) // Context 를 사용하는것이 유지보수에 찜찜한데.. Redux + Toolkit 사용 필히 나중에 시간나면 고려할것..

    useEffect(() => {
      window.setTimeout(() => {
        setIsLoading(false)
      }, appContext.loadingTime * 1000)
    }, [])

    if (isLoading) {
      return <Loader nextColor={theme_color} />
    }

    return <WrappedComponent {...props} />
  }

  ComponentWithLoader.displayName = `withLoader(${displayName})`

  return ComponentWithLoader
}

export default withLoader
