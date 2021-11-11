import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import 'styles/index.scss'
import StoreProvider from 'store/store'
import { ThemeProvider } from 'styled-components'

export const theme_colors = {
  home: {
    mainColor: '#0EA55D',
  },
  about: {
    mainColor: '#5353d4',
  },
  portfolio: {
    mainColor: '#2572AF',
  },
  blog: {
    mainColor: '#D03682',
  },
  contact: {
    mainColor: '#DDE04F',
  },
}

ReactDOM.render(
  <StrictMode>
    <StoreProvider>
      <ThemeProvider theme={theme_colors}>
        <App />
      </ThemeProvider>
    </StoreProvider>
  </StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log)
