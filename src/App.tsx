import { useEffect, useState, createContext } from 'react'
import * as React from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import About from './screens/About'
import Contact from './screens/Contact'
import Home from './screens/Home'
import Portfolio from './screens/Portfolio'
import Toolbar from 'components/Toolbar/Toolbar'
import Blog from 'screens/Blog'

export type SectionContents = Array<string | ListItem>

export interface Section {
  title: string
  contents: SectionContents
  children: Array<Section>
}

export interface ListItem {
  content: string
  children: Array<string>
}

export interface AppContextType {
  currentThemeColor: string | null
  setCurrentThemeColor: React.Dispatch<React.SetStateAction<string | null>>
  loadingTime: number
}

export const AppContext = createContext({} as AppContextType)

const makeData = (markdown: string, startingHeadingLevel: number): Section => {
  // 섹션 분리 작업
  const separatorRegex = new RegExp(`[^#]#{${startingHeadingLevel + 1}} +.*`, 'g')
  const subSectionHeadings = markdown.match(separatorRegex)
  const sections = markdown.split(separatorRegex)
  const superSection = sections.shift()
  const subSections = subSectionHeadings?.map((heading, idx) => {
    return heading + '\n' + sections[idx]
  })

  // 현재섹션(superSection) 타이틀 분리 및 contents 가공 작업
  const titleRegex = new RegExp('^#+\\s+(.*)')
  const titleMatch = superSection!.trim().match(titleRegex)
  const titleMarkdown = titleMatch![0]
  const contentString = superSection!.split(titleMarkdown)[1].trim()
  const title = titleMatch![1]
  const contentRows = contentString.split('\n')

  let contents: SectionContents = []
  // 빈놈은 contentRows가 [''] 형태로 세팅되어 이것이 아닌 것들을 체크해야함
  if (contentRows[0].length > 0) {
    // Paragraph Contents
    if (contentRows[0][0] !== '-') {
      contentRows.forEach((content) => {
        if (content.trim().length > 0) {
          contents?.push(content)
        }
      })

      // List Items : 2 depth 로 규칙을 정리하자. 3 depth 가 필요한 경우 그때 유지보수 하자.
    } else {
      contentRows.forEach((content) => {
        // 빈줄 무시
        if (content.length > 0) {
          // List Item 부모인 경우
          if (content[0] === '-') {
            const obj: ListItem = {
              content: content.match(/-[ ]+(.*)/)![1],
              children: [],
            }
            contents!.push(obj)

            // 첫번째 문자 공백으로써 child로 구분된 경우 children.push(content.match(/-[ ]+(.*)/)![1])
          } else {
            ;(contents![contents!.length - 1] as ListItem).children.push(content.match(/-[ ]+(.*)/)![1])
          }
        }
      })
    }
  }

  return subSections === undefined
    ? { title, contents, children: [] }
    : { title, contents, children: subSections.map((section) => makeData(section, startingHeadingLevel + 1)) }
}

// resume markdown이 위치한 url
const resume_url = 'https://raw.githubusercontent.com/LimEunSeop/my-resume/main/README.md'
// resume 저장할 고정 Data
let resume_data: Section | null = null

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [currentThemeColor, setCurrentThemeColor] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (resume_data === null) {
        let markdown: string = await fetch(resume_url).then((res) => res.text())
        markdown = markdown.replaceAll(/<!--.*?-->/g, '') // 주석 제거
        resume_data = makeData(markdown, 1)
        console.log(resume_data)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [])

  if (isLoading) {
    return (
      <div style={{ background: '#000' }}>
        <div style={{ background: 'rgba(255,255,255,0.2)' }}></div>
      </div>
    )
  }

  return (
    <AppContext.Provider value={{ currentThemeColor, setCurrentThemeColor, loadingTime: 2.5 }}>
      <Router>
        <div className="app">
          <header className="header">
            <Toolbar
              navItems={[
                { display: 'Home', link: 'home', color: '#0EA55D' },
                { display: 'About', link: 'about', color: '#5353d4' },
                { display: 'Portfolio', link: 'portfolio', color: '#2572AF' },
                { display: 'Blog', link: 'blog', color: '#D03682' },
                { display: 'Contact', link: 'contact', color: '#DDE04F' },
              ]}
            />
          </header>
          <main>
            <Switch>
              <Route path="/about" exact render={(props) => <About data={resume_data} {...props} />} />
              <Route path="/portfolio" exact component={Portfolio} />
              <Route path="/blog" exact component={Blog} />
              <Route path="/contact" exact component={Contact} />
              <Route path="/home" exact render={(props) => <Home data={resume_data} {...props} />} />
              <Redirect to="/home" />
            </Switch>
          </main>
          {/* <footer></footer> */}
        </div>
      </Router>
    </AppContext.Provider>
    // <main>
    //   {/* resume_data 에 있는대로 배열 idx 잘 지켜야함 */}
    //   <Cover data={{ title: resume_data.title, contents: resume_data.contents, children: [] }} />
    //   <Summary data={resume_data.children[0]} />
    //   <Experience data={resume_data.children[1]} />
    //   <Education data={resume_data.children[2]} />
    //   <Skills data={resume_data.children[3]} />
    //   <Certificates data={resume_data.children[4]} />
    //   <OpenSourceContributions data={resume_data.children[5]} />
    // </main>
  )
}

export default App
