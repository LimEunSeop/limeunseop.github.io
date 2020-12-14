# 포트폴리오 사이트 개발일지

여러곳에 분산돼 있는 경험(이력서, 포트폴리오)이 한 곳이 모인 Entry Point Site 를 제작해보도록 하겠습니다.

## Index

1. [item 선정 및 대략적인 디자인 구상](#1-item-선정-및-대략적인-디자인-구상)
2. [이력서 작성 및 데이터 구조 분석](#2-이력서-작성-및-데이터-구조-분석)
3. [마크다운 크롤링 작업](#3-마크다운-크롤링-작업)
4. [데이터 마크업 구현](#4-데이터-마크업-구현)
5. [메뉴 정립 + React Router 추가](#5-메뉴-정립--React-Router-추가)
6. [폭풍 작업](#6-폭풍-작업)

## 1. item 선정 및 대략적인 디자인 구상

스스로 디자인을 하자니 어떤 디자인을 할 지 머릿속에 전혀 떠올리지 않는 상태. 일단은 무엇을 넣을지 선정을 하고 그 item 들을 어떻게 포트폴리오 사이트에 녹여낼 지 구상하는 시간을 갖기로 하였습니다.

### item 선정

입사지원 시 회사측에서 자료를 요구할 때에는, 이력서와 포트폴리오를 분리해서 요구하므로, 이 두 개 각각에 들어갈 item 을 분류하여 범위를 명확히 나눌 필요가 있었습니다.

본인의 포트폴리오를 잘 정리한 [개발자 한 분 의 Github](https://github.com/channprj/resume)을 참고하여 이력서에 들어갈 item을 추려본 결과, 들어갈 item 은 다음과 같습니다.

- 주소, 휴대폰, 이메일, 블로그, 기타 아이디(linkedin, github 등등)
- 자신을 요약할 Summary(무슨일을 해 왔는지, 자신의 강점은 무엇인지 등등..)
- Experience(회사 경력, 수행 프로젝트)
- Education(학력, 교육사항)
- Skills
- Activities & Certificates
- Open Source Contributions

음.. 이것을 제외하여 진짜 포트폴리오를 구성해야 하는데요, 저것을 제외하여 구성해야 한다면 포트폴리오에 들어갈 것은

- 프로젝트 수행 일지
- 공부 세부 정리 내용

과 같은 세부적인 내용 정도로 결론이 섭니다. 포트폴리오의 뜻이란, "자신의 창작품을 모아둔 일종의 경력증명서" 라는 뜻을 내포하므로, 어느정도 item 분류에 관해서는 정리된듯 싶습니다.

흔히 포트폴리오 사이트를 만들때 이력서, 포트폴리오 두 가지 카테고리를 넣어 만드는 경우가 많아서 포트폴리오 라는 용어가 좀 헷갈리는데요.. 포트폴리오 사이트를 만든 김에 자기소개(이력서)를 끼워넣었다고 생각하면 편할것 같습니다.

### 대략적인 디자인 구상

[24가지 포트폴리오 사이트 예시](https://www.mockplus.com/blog/post/web-developer-portfolio)를 참고하여 네비게이션 아이템은 무엇으로 해야되는지 살펴보았습니다. 그 중 [Matthew Williams의 사이트](http://findmatthew.com/)가 가장 기본에 충실한 것 같아서 이 사이트를 참고하였고, 네비게이션 아이템은

- Home
- About : 이력서 내용
- Portfolio : 포트폴리오
- Blog
- Contact

정도로 하면 괜찮을것 같다 생각들었습니다.

가장 중요한 이력서와 포트폴리오 페이지의 내용을 채워넣어야 할텐데요, 이 부분에 있어서 고민이 좀 있습니다. 여러 사람들의 이력서를 구경해보면, 단일화 되어있지 않고 이곳 저곳에서 중복하여 관리하는 경우를 많이 볼 수 있는데요, 저는 이런 비효율적인 구조를 반드시 피하고 Original Data 를 한 곳에서 관리하여 이를 렌더링 하는 방식으로 포트폴리오 사이트를 만들고 싶습니다.

그렇게 하려면 과연 어떻게 해야할 지 2가지를 생각해 보았습니다.

1. **Github에 Markdown으로 데이터를 정리 한 후 그 자료를 크롤링한다.** 이력서를 마크다운으로 잘 작성하여 Github 에 보존할 수 있다는 장점이 있지만, 크롤링을 위해서는 이력서를 규칙에 맞춰서 작성해야 하고, JSON 같은 데이터포맷이 아니기 때문에 데이터 업데이트의 유지보수가 발생할 경우에는 예상치 못하게 규칙이 깨져버릴 수 있다는 단점이 있을것 같습니다.
2. **Github에 JSON 파일로 저장한 후 그 자료를 크롤링한다.** 이같은 경우에는 JSON 파일 자체가 DB 역할을 확실히 하므로 그 속에서 필드정의를 하는 등의 규칙을 체계화 할 수가 있어, 유지보수에 매우 유리합니다. 하지만 JSON 파일을 구성한다는 것은 매우 번거로운 일이고.. [Portfolio Index](https://github.com/LimEunSeop/my-portfolio) 같은 경우에는 Github 에서 Markdown 으로 이미 존재하고 또 그래야만 하기 때문에(indexing을 위해) JSON 파일로 따로 또 관리 한다는 것이 불편할 것입니다.

이와같이 종합해보면, 1번 방법이 최선책인것 같습니다. 정형화된 포맷으로 철저히 관리할 것을 제 스스로 약속하고, 따로 문서로 기록 해야겠습니다.

## 2. 이력서 작성 및 데이터 구조 분석

### 이력서 작성

페이지에 들어갈 이력서를 Markdown 으로 작성하여 [my-resume](https://github.com/LimEunSeop/my-resume) 레파지토리에 저장시켰습니다.

### 이력서 데이터 구조 분석

크롤링을 성공적으로 마치기 위해서는 데이터 규칙의 일관성을 확인하는 것이 중요합니다.

데이터의 개요는 아래와 같은 계층 형식으로 구성 되어있습니다.

```html
<h1>이름</h1>
<h2>Summary</h2>
<h2>Experience</h2>
<h3>직무 경험</h3>
<h3>개인 프로젝트</h3>
<h2>Education</h2>
<h3>학위</h3>
<h3>외부교육</h3>
<h2>Skills</h2>
<h3>Languages</h3>
<h3>Frameworks and Libraries</h3>
<h3>DB</h3>
<h3>Platforms</h3>
<h3>OS</h3>
<h3>Tool Techniques</h3>
<h2>Certificates</h2>
<h3>직무</h3>
<h3>어학</h3>
<h3>ETC</h3>
<h2>Open Source Contributions</h2>
<h3>Pull Requests</h3>
```

말단 Heading 에서 세부 내용을 구성하며, 구성할 수 있는 데이터는 `단락`, `1뎁스 ul`, `2뎁스 ul` 입니다. 다행히도 이같은 규칙을 잘 지켜 작성하여, 크롤링에 잘 활용할 수 있을 것으로 예상됩니다. `<h1>` Heading은 예외적으로 메인 커버에 들어갈 데이터를 표시하기 위해 하위 Heading 을 보유하지만 세부내용이 존재합니다.

저는 사이트 첫 진입 시 메인 커버를 보이도록 하고, 스크롤을 내리면 각 섹션이 다른 색상으로 구분되도록 하고 싶습니다. 그에따라 다음과 같이 Markup 을 정돈하여 향후 스타일링에 용이하도록 하였습니다.

```html
<main>
  <div class="main-cover">
    <h1>이름</h1>
  </div>
  <section>
    <h2>Summary</h2>
  </section>
  <section>
    <h2>Experience</h2>
    <h3>직무 경험</h3>
    <h3>개인 프로젝트</h3>
  </section>
  <section>
    <h2>Education</h2>
    <h3>학위</h3>
    <h3>외부교육</h3>
  </section>
  <section>
    <h2>Skills</h2>
    <h3>Languages</h3>
    <h3>Frameworks and Libraries</h3>
    <h3>DB</h3>
    <h3>Platforms</h3>
    <h3>OS</h3>
    <h3>Tool Techniques</h3>
  </section>
  <section>
    <h2>Certificates</h2>
    <h3>직무</h3>
    <h3>어학</h3>
    <h3>ETC</h3>
  </section>
  <section>
    <h2>Open Source Contributions</h2>
    <h3>Pull Requests</h3>
  </section>
</main>
```

`h1` 메인 제목쪽을 `div`로 한 번 묶어 스타일이 용이하도록 할 것이고, 그 후 새로운 `h2` 이 등장할 때마다 새로운 `section`요소의 자식으로 두어 위와같이 스타일링이 용이해 지도록 마크업을 재가공해 나갈 것입니다.

## 3. 마크다운 크롤링 작업

[2. 이력서 작성 및 데이터 구조 분석](#2-이력서-작성-및-데이터-구조-분석) 대로 마크업을 구성하기 위해서는 일단 React 에서 관리할 수 있는 객체 형식의 데이터가 필요합니다. 따라서 github 에 저장돼있는 이력서 [raw파일](https://raw.githubusercontent.com/LimEunSeop/my-resume/main/README.md)을 fetch API 로 긁어온 후, 정규식으로 데이터를 추출하여 규격화된 객체에 담아내는 작업이 필요합니다.

### 데이터 규격

typescript 로 정의한 데이터 규격은 다음과 같습니다.

```typescript
type SectionContents = Array<string | ListItem>

interface Section {
  title: string
  contents: SectionContents
  children: Array<Section>
}

interface ListItem {
  content: string
  children: Array<string>
}
```

Section 이란, 하나의 Heading 이 가지는 범위를 뜻합니다. 하위 Heading 을 children 으로 둘 수 있으며, children 에 들어가는 Section은 구조가 같습니다. 말단 Section 은 children 이 빈 배열입니다.

contents 로는 string, ListItem 2가지 종류의 데이터가 올 수 있습니다. string 이란 content 가 paragraph 성격을 띄는 단순 문자열 데이터이고, ListItem 은 Markdown 의 `- 내용` 등의 문법으로 작성된 데이터를 뜻합니다. 이력서 작성방식의 특성상, 이 둘은 혼용될 수 없어, 둘 중 하나의 데이터 배열로 contents 가 구성됩니다.

> ListItem 을 재귀방식으로 무한대로 children 을 확장 시킬 수도 있지만, 개발의 편의성을 위해, 2 depth 이상의 데이터 구조는 이력서에서 아직 필요하지 않아 2 depth 로 제한하였습니다. 향후 3 depth 이상이 필요하면 추가개발이 필요하겠지만 현재로써는 필요성이 없는 상태입니다.

### 크롤링 방식

```
# 1st depth Heading
paragraph
contents

  ## 2nd depth Heading

    ### 3rd depth Heading
    - superListItem
      - subListItem

    ### 3rd depth Heading
    - superListItem
      - subListItem
```

기본적으로 위와 같은 구조를 가진 상태에서 2단계의 과정을 통하여 이루어집니다.

1. Section 분리 작업
2. 현재 Section 의 contents 가공 작업

#### 1. Section 분리 작업

1st depth Heading 부터 시작하여, children 에 하위 Section 을 삽입해야 합니다. 이 과정은 '하위 heading 을 separator 로 하여 split' 하면 간단히 해결됩니다.

예를들어, 1st depth Heading 에서 children 삽입할 것들을 판별해야 한다면, 1 + 1 depth Heading 을 정규식패턴으로 작성하여 separator 로 split 하게 됩니다. 그러면 배열의 첫번째 요소에는 1st depth Heading 의 Contents 가 자연스럽게 배치될 것이고, 그 다음 요소로는 2nd depth Heading Section 들이 자연스럽게 배치될 것입니다.

#### 2. 현재 Section 의 contents 가공 작업

아까 획득한 배열에서 첫번째 요소를 unshift 하여 추출합니다. 그 후 `\n` 으로 split 하고, 첫번째 데이터에 `-` 가 포함되어있는지 검사하여 paragraph 인지 ListItem 인지 판단 하여 각기 다른 처리를 해 줍니다. 아까 말씀드렸듯이 Contents 로는 둘중 하나밖에 올 수 없기 때문에 섞여있는 경우에 관해서는 생각할 필요가 없습니다.

> 2nd depth Heading 의 contents 는 `[""]` 입니다. 이를 고려하여 조건에 적용시켜 2nd depth Heading 의 contents 는 빈 배열이 되도록 해야합니다. 또한 Contents 사이에 엔터로 공백을 한번 더 만든 경우가 있어, `["a", "b", "", "d"]` 와 같은 방식으로 데이터가 들어올 수 있습니다. 이 역시 빈 문자는 contents 에 삽입되지 않도록 개발해야합니다.

이 작업을 함수로 작성하여, 그 함수를 만들어진 children 에 대하여 map 함수 내에서 다시 재귀호출하면 크롤링 작업은 마치게 됩니다.

### 다음단계 고민

다음 단계에서는 이렇게 얻어진 데이터를 토대로 마크업을 마치는 작업을 진행해야 합니다. 여기서 고민해야할 것이,

- 이 데이터들을 상태로 저장해야 할까?
- 하나의 content 안에서는 데이터 가공을 어떻게 해야할까?

정도인것 같습니다. 일단은 상태로 저장될 필요는 없을것 같습니다. 왜냐하면 바뀌지 않는 속성이기도 하고, 페이지에서 정작 중요한 역할의 상태가 추가될 경우 그 상태의 관리가 용이해질 필요가 있기 때문입니다. 따라서 함수컴포넌트 밖의 상수로 관리할까 생각중입니다.

content 의 추가 가공은 또다시 힘든 작업이 될 것 같습니다. 예를들어, `[Ubion](http://www.ubion.co.kr/ubion/) (2018.05 ~ 2020.06) - Web Developer` 과 같은 링크 + 추가정보가 혼합된 마크다운은, 링크를 a 태그로 재가공 하고 그 후의 년도나 포지션 추가정보 데이터는 스타일링이 필요한 경우 span 처리를 해야할 수도 있습니다.

정말 복잡한 작업이 될 것 같습니다만, 각 섹션 별로 컴포넌트를 만들어 그 속에서만 복잡한 작업을 따로 정의하면 코드를 관리하기 많이 용이해질 것 같습니다. a 태그 재가공 같은 작업은 다른 섹션에서도 필요할 수 있으니 유틸리티 함수로 따로 만들면 괜찮을것 같습니다.

## 4. 데이터 마크업 구현

[3. 마크다운 크롤링 작업](#3-마크다운-크롤링-작업)에서 획득한 데이터 객체를 이용하여 이제 마크업을 구성하면 됩니다. 이전 단계에서 고민했던 것들의 해답을 미리 말하자면

- 데이터는 컴포넌트 밖 상수형태의 싱글톤으로 저장하는 것이 바람직 하고,
- content 안의 markdown 으로 작성돼있는 데이터는 제가 유틸함수를 새로 만드는 것보단 `showdown` 라이브러리로

만드는 것이 바람직하다는 결론이 나왔습니다.

### 컴포넌트 분리

각 섹션에 CSS Module 로 독립된 스타일링을 적용하고, 코드 유지보수를 위해 각각을 컨테이너 컴포넌트로 나누었습니다.

```html
<div className="App">
  <header></header>
  <main>
    {/* resume_data 에 있는대로 배열 idx 잘 지켜야함 */} <Cover data={{ title: resume_data.title, contents: resume_data.contents, children: [] }} />
    <summary data="{resume_data.children[0]}" />
    <Experience data="{resume_data.children[1]}" />
    <Education data="{resume_data.children[2]}" />
    <Skills data="{resume_data.children[3]}" />
    <Certificates data="{resume_data.children[4]}" />
    <OpenSourceContributions data="{resume_data.children[5]}" />
  </main>
  <footer></footer>
</div>
```

각 컨테이너 컴포넌트는 `containers` 라는 디렉터리에 저장될 것입니다. 왜냐하면 이것은 엄밀히 말해서 screen 을 일부 구성하는 컨테이너이지 컴포넌트는 아니기 때문입니다.

> CSS Module 과 견주어 Styled Component 가 있습니다. Styled Component 는 말 그대로 컴포넌트 하나를 의미하므로 독립된 컴포넌트 하나를 만들때 사용해야 합니다. 간혹 CSS class 를 유니크하게 만들기 위해 styled Component 로 페이지의 CSS 작업을 하는 경우를 심심찮게 볼 수 있는데, 그렇게 하기보단 CSS Module 기능을 사용하여 CSS 분리 및 class 스타일 적용을 통한 전통적인 CSS 작업을 하도록 합시다.

### 섹션 마크업 퍼블리싱 작업

컨테이너중 일부를 구현한 내용은 아래와 같습니다.

```javascript
import React from 'react'
import { Section } from '../App'
// @ts-ignorets
import { Heading } from '@tenon-io/tenon-ui'
import { ListItem } from '../App'
import MarkdownView from 'react-showdown'

const Education = ({ data }: { data: Section }) => {
  return (
    <Heading.LevelBoundary>
      <section>
        <Heading.H>{data.title}</Heading.H>
        {data.children.map((subSection, i) => (
          <Heading.LevelBoundary key={i}>
            <section>
              <Heading.H>{subSection.title}</Heading.H>
              <ul>
                {subSection.contents.map((listTitle, i) => (
                  <li key={i}>
                    <MarkdownView markdown={(listTitle as ListItem).content} />
                    {(listTitle as ListItem).children.length > 0 && (
                      <ul>
                        {(listTitle as ListItem).children.map((listChild, i) => (
                          <li key={i}>
                            <MarkdownView markdown={listChild} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </section>
          </Heading.LevelBoundary>
        ))}
      </section>
    </Heading.LevelBoundary>
  )
}

export default Education
```

이전의 데이터 파싱을 통해 React 에서 데이터를 구조적으로 접근이 가능하게 되었고, 제 입맛대로 마크업을 구성할 수 있게 되었습니다. Heading Level 이 유지보수하면서 변할수도 있다는 점을 고려하여 `tenon-ui` 라이브러리를 통해 헤딩레벨의 자동화를 의도했습니다. 제일 말단에 존재하는 content 들은 여전히 markdown 문법을 따르고 있는데요, 여기서 `showdown` 라이브러리를 통해 HTML 로 변환시켜주는 작업을 했습니다.

각 섹션의 마크업은 비슷한 구조를 띄어서 공통 컴포넌트로 해야될까 생각들 수도 있지만, 향후 각 섹션의 마크업이 달라질 수 있을 가능성을 고려하여 각각을 컨테이너 컴포넌트로 분리했습니다.

그러나 여전히 해결되지 않은 문제가 있습니다. content 들은 React 의 통제를 받고 있지 않으므로, 지금 상태로는 스타일링이 어렵습니다. 제가 방금 테스트한 결과,이력서 markdown 에 span 태그로 감싸서 class 를 지정해주면, 그것이 그대로 적용되는 것을 확인했는데요, 이력서 markdown 을 조작하여 세부 컨텐츠 스타일링을 하면 될것 같습니다.

### 헛수고?

이렇게 해서 보니 저는 여태 Markdown to HTML 이라는 프로그램을 만들고 있었다는 생각이 들었는데요, 이런 방식은 시중에 `showdown` 이라는 라이브러리로 널려있습니다. 아예 처음부터 `showdown` 으로 마크업을 만들어내면 얼마나 편할까? 생각들기도 했지만, **역시 제가 원하는 스타일링을 위해선, 제가 원하는 마크업을 구성**해야 했고, 그러기 위해선 데이터를 객체형태로 파싱해야만 했고, 따라서 `showdown` 의 일부 기능인 Markdown Parsing 기능은 역시 제가 스스로 구현해야만 했습니다. 그 이외에 링크나 이미지가 포함된 말단의 content 의 마크다운을 HTML 로 변환하기 위해서 `showdown` 을 도입했는데, 그것이 바람직한 선택이었던것 같습니다. 다만, Markdown 을 데이터 객체로 변환할 때, Markdown to JSON 기능을 하는 라이브러리를 사용하면 좀더 안정적으로 데이터 파싱이 가능하지 않았을까? 라는 생각도 드는데요, 어차피 일단 구현했으니 공부한 샘 치고 일단은 유지하되, 신뢰성과 안정성이 요구로 된다면 그건 향후에 라이브러리로 대체하는 유지보수의 액션을 취해야 될것 같습니다.

## 5. 메뉴 정립 + React Router 추가

메뉴를 정립하는 시간을 가지고, React Router 를 이용하여 메뉴를 구현하는 작업을 진행했습니다.

### 메뉴 정립

다른 포트폴리오 사이트는 표지가 있고 스크롤을 내리면 바로 개인정보를 표시하는 형태인데, 저는 좀 다르게 구현하고 싶었습니다.

여느 포트폴리오와 마찬가지로 단순 이력서를 비주얼적으로 꾸미는 형태가 아니라 내 메시지를 시각적으로 효과적으로 전달할 수 있는 포트폴리오 사이트를 만들고 싶습니다. 제 사이트에 처음 들어오면 저에대한 간단한 브리핑들을 부담없이 재밌는 인터렉션과 함께 보여드리도록 하고 싶습니다. 그러기 위해서 Home 이라는 메뉴를 개설하여 이것을 맨 처음에 보여지도록 했습니다. 여기서는 이력서의 Summary 항목을 가져와서 뿌리려고 합니다. 그 후 About 메뉴를 만들어 이곳에 나머지 이력서 정보를 긁어오는 방식을 취할 것입니다.

Home 화면을 어떤 방식으로 할 것인지 고민을 엄청 많이 했는데 아직 제대로된 영감을 얻지는 못하고 있습니다. 풀스택 개발자의 잠재성을 보유함과 동시에 하나의 길을 어떻게든 묵묵히, 꼭 발전하는 개발자인 제 강점을 시각적으로 효과하고 싶었습니다. 그래서 애플 홈페이지처럼 디스크립션과 함께 보석을 찾은 스크롤 애니메이션을 적용해볼지, 문이 열리는 애니메이션을 만들어 저에대한 안내 메시지를 보이도록 할지 등등 여러 고민을 해봤는데요, 혼자 기획하려니 많이 오글거리는 점이 있었습니다. 포트폴리오 사이트는 제 평생 가꿔가야할 제 업이니 천천히 생각해보며 차츰 적용하도록 하고, 일단은 전통적인 PPT 방식으로 저에대한 Summary 문구 + 추가 Icon 이나 이미지 등을 적용하는 방식으로 나갈 생각입니다.

### React Router 추가

어쨋든 Router 는 다음과 같은 모습으로 웹표준에서 자주 쓰이는 형태로 구현했습니다.

```html
<Router>
  <div className="app">
    <header>
      <Heading.H>
        <Link to="/">{resume_data.title}</Link>
      </Heading.H>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
    <main>
      <Switch>
        <Route path="/about" render={(props) => <About data={resume_data} {...props} />} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/contact" component={Contact} />
        <Route path="/" render={(props) => <Home data={resume_data} {...props} />} />
      </Switch>
    </main>
  </div>
</Router>
```

이력서 데이터는 여러 화면에서 공통으로 쓰일 수 있기 때문에 최상위 컴포넌트에서 fetch 하도록 했는데요, 하위 컴포넌트에 이 데이터를 보내는 과정에서 depth 의 한계를 좀 느꼈습니다. 아직까지는 2 depth 단위 정도로 데이터를 전달한들 별로 바람직한 방법은 아니라 생각듭니다. 향후 프로젝트 규모를 판별하여 Context API 나 Redux 로 관리할 예정인데요, 예상 규모상 Redux 는 오버스펙이라 그다지 좋은 방법은 아니라 사료됩니다. Context API 정도로 교체하는 작업을 진행할 것 같습니다.

## 6. 폭풍 작업

디자인과 아이디어 생각에 많은 시간을 보내다 작업에 착수하여 개발일지를 쓸 겨를도 없이 코딩했습니다. 아쉽지만 개발일지는 여기까지이며, 프로젝트 기술서로 다시 찾아뵙겠습니다.
