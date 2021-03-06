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

const makeResumeData = (markdown: string, startingHeadingLevel: number): Section => {
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
    : { title, contents, children: subSections.map((section) => makeResumeData(section, startingHeadingLevel + 1)) }
}

export default makeResumeData
