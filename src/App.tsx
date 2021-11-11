import { useEffect, useState } from 'react'
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import About from 'screens/About'
import Contact from 'screens/Contact'
import Home from 'screens/Home'
import Portfolio from 'screens/Portfolio'
import Toolbar from 'components/Toolbar/Toolbar'
import Blog from 'screens/Blog'
import makeResumeData, { Section } from 'utils/makeResumeData'

// resume markdown이 위치한 url
const resume_url = 'https://raw.githubusercontent.com/LimEunSeop/my-resume/main/README.md'
// resume 저장할 고정 Data - 최초 로딩 후 변경이 없는 Static 한 데이터이므로 컴포넌트 밖에 뺐습니다.
let resume_data: Section | null = null

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      if (resume_data === null) {
        let markdown: string = await fetch(resume_url).then((res) => res.text())
        markdown = markdown.replaceAll(/<!--(.|\n)*?-->/g, '') // 주석 제거
        resume_data = makeResumeData(markdown, 1)
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
    <Router>
      <div className="app">
        <header className="header">
          <Toolbar
            navItems={[
              { display: 'Home', link: 'home' },
              { display: 'About', link: 'about' },
              { display: 'Portfolio', link: 'portfolio' },
              { display: 'Blog', link: 'blog' },
              { display: 'Contact', link: 'contact' },
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

App.displayName = 'App'

export default App
