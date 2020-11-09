# 포트폴리오 사이트 개발일지
<<<<<<< HEAD

여러곳에 분산돼 있는 경험(이력서, 포트폴리오)이 한 곳이 모인 Entry Point Site 를 제작해보도록 하겠습니다.

=======
여러곳에 분산돼 있는 경험(이력서, 포트폴리오)이 한 곳이 모인 Entry Point Site 를 제작해보도록 하겠습니다.
>>>>>>> c1af0c6606fbff46bf2f51e1548f697d071fc4da
## Index

1. [item 선정 및 대략적인 디자인 구상](#1-item-선정-및-대략적인-디자인-구상)
2. [이력서 작성 및 데이터 구조 분석](#2-이력서-작성-및-데이터-구조-분석)

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
