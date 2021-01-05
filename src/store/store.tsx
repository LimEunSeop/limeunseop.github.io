import { applyMiddleware, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from './rootReducer'
import logger from 'redux-logger'
import { PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

const middleware = [logger]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)))

const StoreProvider = ({ children }: PropsWithChildren<{}>) => <Provider store={store}>{children}</Provider>

export default StoreProvider
