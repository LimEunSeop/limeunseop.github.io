# 포트폴리오 사이트 프로젝트 기술서

<a href="https://limeunseop.github.io">![link](https://img.shields.io/badge/link-https%3A%2F%2Flimeunseop.github.io-brightgreen)</a>

여러곳에 분산돼 있는 경험(이력서, 포트폴리오)이 한 곳에 모인 Entry Point Site.

- 수행기간: 2020.11 ~ 2020.12
- 확장성을 고려하고 유지보수의 이점을 취하기 위해 SPA 형태의 React 로 개발하였습니다. 또한 크롤링 하는 데이터가 정형화된 포맷을 꼭 따라야 하므로 TypeScript 을 사용하였습니다.
- Github에 있는 마크다운 데이터를 스크래핑하여 데이터의 일관성을 확보하였습니다.
- 사용기술: React, ES6+, TypeScript, HTML, Sass, Sass_Module

<details close>
<summary>전체 Table of Contents(목차) 보기</summary>
<div markdown="1">

- [포트폴리오 사이트 프로젝트 기술서](#포트폴리오-사이트-프로젝트-기술서)
  - [포트폴리오 제작 경위](#포트폴리오-제작-경위)
  - [프로젝트 특징](#프로젝트-특징)
  - [프로젝트 안내](#프로젝트-안내)
    - [사용기술](#사용기술)
    - [디렉터리 구조](#디렉터리-구조)
    - [모듈별 설명](#모듈별-설명)
      - [Navigation (src/components/AppNavigation)](#navigation-srccomponentsappnavigation)
      - [Loader (src/components/Loader)](#loader-srccomponentsloader)
      - [HOC (src/hoc)](#hoc-srchoc)
      - [Home 화면 (src/screens/Home.tsx)](#home-화면-srcscreenshometsx)
      - [About 화면 (src/screens/About.tsx)](#about-화면-srcscreensabouttsx)
      - [Blog (src/screens/Blog.tsx)](#blog-srcscreensblogtsx)
- [포트폴리오 사이트 개발일지](#포트폴리오-사이트-개발일지)
  - [Index](#index)
  - [1. item 선정 및 대략적인 디자인 구상](#1-item-선정-및-대략적인-디자인-구상)
    - [item 선정](#item-선정)
    - [대략적인 디자인 구상](#대략적인-디자인-구상)
  - [2. 이력서 작성 및 데이터 구조 분석](#2-이력서-작성-및-데이터-구조-분석)
    - [이력서 작성](#이력서-작성)
    - [이력서 데이터 구조 분석](#이력서-데이터-구조-분석)
  - [3. 마크다운 크롤링 작업](#3-마크다운-크롤링-작업)
    - [데이터 규격](#데이터-규격)
    - [크롤링 방식](#크롤링-방식)
      - [1. Section 분리 작업](#1-section-분리-작업)
      - [2. 현재 Section 의 contents 가공 작업](#2-현재-section-의-contents-가공-작업)
    - [다음단계 고민](#다음단계-고민)
  - [4. 데이터 마크업 구현](#4-데이터-마크업-구현)
    - [컴포넌트 분리](#컴포넌트-분리)
    - [섹션 마크업 퍼블리싱 작업](#섹션-마크업-퍼블리싱-작업)
    - [헛수고?](#헛수고)
  - [5. 메뉴 정립 + React Router 추가](#5-메뉴-정립--react-router-추가)
    - [메뉴 정립](#메뉴-정립)
    - [React Router 추가](#react-router-추가)
  - [6. 폭풍 작업](#6-폭풍-작업)
  </div>
  </details>

## 포트폴리오 제작 경위

제 경력에 관한 모든것을 한 곳에 정리하고 관리가 용이하도록 하기 위함입니다.
개발자로서 일을 하고 공부를 하다보면, 공부 정리 및 경력관리를 위해 보통은 블로그 및 채용사이트 이력서를 관리하거나, 개인이 파일로 정리합니다. 하지만 채용사이트는 링크드인, 프로그래머스, 로켓펀치 등등 여러가지가 있어 각각의 이력서를 관리하기란 매우 번거로운 일이었고, 이는 곧 제대로 정리되지 않은 정보에 대한 막연한 두려움을 안겨줬습니다.

따라서 제 경력에 관한 모든것을 한 곳에 정리하고 관리가 용이하도록 하는 시스템을 구축하는 것은 제 개발자 인생에서의 숙원사업이었습니다. 이 곳에 개발자로서의 저를 모두 담아내도록 노력하였고, 앞으로도 쭉 이곳에 저를 표현할 예정입니다.

## 프로젝트 특징

제 시스템은 크게 [이력서 마크다운 데이터](https://github.com/LimEunSeop/my-resume), [포트폴리오 웹](https://limeunseop.github.io) 두 가지로 이루어져 있으며, 포트폴리오 웹이 이력서 마크다운을 크롤링하여 그 정보를 바탕으로 렌더링이 이루어집니다. [이력서 마크다운 데이터](https://github.com/LimEunSeop/my-resume)가 데이터베이스 역할을 하는 것이지요. 때문에 [이력서 마크다운 데이터](https://github.com/LimEunSeop/my-resume)만 관리하더라도 포트폴리오 페이지가 자동으로 구성됩니다.

그 외에도 블로그 RSS 피드 및 연락처 정보까지 크롤링하기 때문에 제 정보를 알고 싶은 분은 제 [포트폴리오 웹](https://limeunseop.github.io)만 서핑하셔도 간편히 모든 정보를 알 수가 있습니다.

## 프로젝트 안내

### 사용기술

- **프론트엔드 라이브러리**: `React` + `Typescript` 를 사용하여 React 와 관련된 타입, 크롤링 데이터 타입을 적용한 코딩을 하였습니다.
- **상태관리**: 처음엔 ~~Context API~~를 사용하였으나, 코드가 깔끔하지 못하여 Redux 로 변경하였습니다. 재사용 가능한 컴포넌트들은 props mapping 이 유지보수에 좋을것 같아 `connect` HOC 사용하였으며, Redux 사용이 명백한 것들은 재사용성이 떨어지더라도 간편함을 위해 `useSelect`, `useDispatch` Hooks 를 사용했습니다.
- **스타일링**: `SASS Module`, `grid`, `flex`, `styled-component`, `rem unit sizing` 를 실험적으로 적극 사용하였고, 애니메이션 또한 적극적으로 사용하도록 노력했습니다.
- **HOC**: Loader 렌더링 하기, 스크롤 위치 감지하여 HTML 요소에 animate 클래스 추가하기 기능은 원래는 없어도 되는 기능이므로 원래 컴포넌트 구조를 유지하면서 해당 기능을 필요시 붙일 수 있도록 HOC 방식을 채택했습니다.
- **Heading 자동구성**: tenon-ui 라는 라이브러리를 사용하여 헤딩 구조에 변동이 있을 경우, 이전에 작성되었던 헤딩 레벨이 자동으로 유연하게 변경되도록 하였습니다.
- **canvas API**: 데이터의 length 에 따라 UI가 동적으로 그려지도록 개발해봤습니다.
- **애니메이션**: 각 메뉴의 Cover와 About 화면에 애니메이션기능을 활용하기 위해 이것저것 실험적으로 넣어봤습니다.
- **차트 라이브러리**: Chart.js 로 간단한 Bar 타입 차트를 그리고, Cytoscape.js 로 여러 노드를 연결시키는 UI를 표현했습니다.
- **styled-component 사용시점**: 제 개인적인 소견으론, styled-component 를 너무 남발할 경우 코드 가독성 및 유지보수에 좋지 않은 영향을 끼친것 같았습니다. props 에 따라 style 이 변경돼야 할 경우, inline style 을 통해 충분히 처리 가능했으므로, `StyledContainer 나 StyledLink` 같은 styled-component 로 묶은 애매모호한 컴포넌트를 만들지 않았고, 최대한 inline 스타일 + SCSS Module 만으로 해결하려고 많이 노력했습니다. 그러다 정말로 단독으로 컴포넌트로 모듈화가 필요하고, 이것이 HTML 가독성에 더 좋겠다 판단이 들었을 때 styled-component 를 사용하였습니다. 또한 svg 애니메이션을 사용하기 위해서는 무조건 styled-component 를 사용하여 svg 애니메이션이 용이하도록 하였습니다.

### 디렉터리 구조

```
├── components
├── containers
│   ├── Home
│   │   ├── Cover.tsx
│   │   ├── Cover.module.scss
│   │   └── ...
│   ├── About
│   │   ├── Cover.tsx
│   │   ├── Cover.module.scss
│   │   └── ...
│   └── ...
├── hoc
├── screens
│   ├── Home.tsx
│   ├── About.tsx
│   └── ...
├── styles
└── utils
```

- **components**: Loader, Navigation, Button 등의 재사용 할 만한 작은 단위의 컴포넌트를 모았습니다.
- **containers**: screens 디렉터리 내에 존재하는 한 화면 단위에서 분리된 부분화면을 구성하기 위한 디렉터리입니다. 각 모듈별로 SCSS Module 을 적용하여 충돌이 없고 자유로운 스타일링이 가능하도록 했습니다.
- **hoc**: 앱 구조에 영향을 미치지는 않으면서 필요한 기능을 재사용하기 위하여 hoc 를 만들었습니다.
- **screens**: 화면단위의 컴포넌트가 들어있는 디렉터리입니다. App.tsx 에서 이쪽으로 라우팅합니다.
- **styles**: Sass 상수, 함수, 전역 스타일 등을 모으기위한 디렉터리입니다.
- **utils**: 기타 JS 유틸함수를 넣었습니다.

### 모듈별 설명

프로그램 전체를 아우르는 Navigatin, Loader, HOC 를 설명드린 후, 각 메뉴(Home, About, Portfolio, Blog, Contact)에서 사용된 기술을 설명드리도록 하겠습니다.

#### Navigation (src/components/AppNavigation)

![네비게이션 gif](https://github.com/LimEunSeop/assets/blob/master/images/portfolio/Navigation.gif?raw=true)
Props 로 NavLink 정보들을 배열로 받아 NavItem 으로 보이도록 렌더링 합니다. 그 후 뒷배경으로 현재 메뉴의 색깔을 보이도록 Props 를 전달받습니다.

네비게이션의 등장&퇴장의 원할한 애니메이션 및 hidden 처리를 위해 setTimeout 을 사용하여 네비게이션 active 와 hidden 여부의 시간차를 뒀는데요, 굳이 hidden 처리를 하는 이유는 접근성을 지키기 위함입니다. 스크린리더를 사용하여 서핑시에는, 네비이션이 감춰진 상태인 경우 보이지 않아야겠죠.

그런데 setTimeout 을 사용할 경우, Navigation 버튼을 연속으로 여러번 클릭 시에 이벤트 시간이 꼬여 네비게이션의 애니메이션이 원활하게 동작하지 않을 수 있습니다. 이를 방지하기 위하여 setTimeout 함수 실행 전에 clearTimeout 을 호출하여 이전의 Timeout 이벤트를 확실히 제거하도록 하였습니다.

아직 접근성 문제가 해결된 것이 아닙니다. 일단은 시간관계상 키보드접근성 문제를 해결하지 못했는데요, 네비게이션이 열릴 경우 `Tab`을 누르면 네비게이션 안에서만 포커스가 이동하도록 나중에 Javascript 작업을 진행할 예정입니다.

#### Loader (src/components/Loader)

![로더 gif](https://github.com/LimEunSeop/assets/blob/master/images/portfolio/Loader.gif?raw=true)
제 로더의 컨셉은 '맥세이프' 입니다. 맥세이프 악세서리를 사지 않더라도 그 UI 의 즐거움을 간접적으로나마 체험하고 싶었습니다.

이 Loader 컴포넌트는 Props로 currentThemeColor(현재 색깔), loadingTime(애니메이션 시간), nextColor(다음색깔)을 전달받아 **현재 색깔**에서 **애니메이션 시간**동안 **다음색깔**로 변경되는 애니메이션이 구현되어 있습니다.

애니메이션은 '다음 색깔 배경' 위에 '현재색깔 배경' 을 겹쳐 놓고, 맥세이프 애니메이션이 실행됨과 동시에 '현재색깔 배경'의 투명도를 서서히 0으로 바뀌어 자연스럽게 '다음 색깔 배경' 으로 바꾸도록 했는데요, 이 과정에서 `styled-component` 가 필요하다는 것을 느끼고 적극 활용했습니다. svg 파일또한 ReactComponent 로 import 시켜서 그 컴포넌트를 styled-component 로 정의하여 애니메이션이 용이하도록 설정했습니다.

위에서 언급드린 loadingTime 변수를 styled-component 에서 Props 로 받아 애니메이션의 속도가 다 같이 일관적으로 조정이 되도록 프로그래밍 하였으니 시간이 나시면 파일을 보시어 참고해주시면 감사드리겠습니다.

#### HOC (src/hoc)

React Component 를 매개변수로 받는 **withContainerAnimate** 라는 HOC 를 만들어, 스크롤이 해당 컴포넌트의 offsetTop 에 접근하면 그 Component 에 animate 라는 클래스가 추가되도록 하는 기능을 구현했습니다. 스크롤 이벤트 핸들러가 불필요하게 많이 호출되는 것을 방지하기 위하여, underscore 라이브러리의 throttle 이라는 함수를 활용하였습니다. 또한 창 크기 변경으로 인해 Component 의 offsetTop 을 재조정하기 위하여 resize 이벤트 핸들러도 코딩하였습니다.

**withCoverAnimate** 라는 HOC 는, withContainerAnimate 의 기능을 확장하여, 스크롤 하여도 얼마간은 화면이동이 이루어지지 않고 animate 클래스만 추가하여 애니메이션이 발생하도록 외부에 뷰포트 높이의 3배가량의 Container 를 더 만들고 그 안에서 화면이 `position: sticky` 로 움직이도록 하였습니다.

**withLoader** 라는 HOC 는, 아까 말씀드린 Loader 컴포넌트를 화면 컴포넌트(src/screen)에 붙이기 위한 HOC로, 네비게이션이 이동하여 화면이 보이기 전에 Loader 가 보이도록 하여 네비게이션의 자연스러움을 불어넣은 HOC 라고 할 수 있겠습니다.

이 3가지의 HOC 모두 레이아웃의 구조에 영향을 미치지 않는 요소이므로, HOC 로 제작하여 기능을 주입해주도록 만든것입니다.

#### Home 화면 (src/screens/Home.tsx)

단순 퍼블리싱으로 이루어진 화면이므로, Cover 애니메이션 이외에, Semantic 하게 짠 HTML 위주로 살펴봐주시면 감사하겠습니다.

#### About 화면 (src/screens/About.tsx)

이 화면에서, [이력서 마크다운 데이터](https://github.com/LimEunSeop/my-resume)를 크롤링하여 json으로 재구성 후 그 데이터를 기반으로 화면을 자동으로 렌더링 하는 로직이 구현되어 있습니다. 이력서 크롤링 하는 로직은 포트폴리오 사이트 개발일지의 [마크다운 크롤링 작업](#3-마크다운-크롤링-작업) 섹션을 참고바라며, 각 부분에서 어떤 테크닉을 사용했는지 차근차근 설명드리도록 하겠습니다.

- **직무경험 (src/containers/About/Experience/JobExperience.tsx)**
  ![](https://github.com/LimEunSeop/assets/blob/master/images/portfolio/Work%20Experience.png?raw=true)
  앞으로 추가될 여러 직무경험에 유연하게 대응하기 위하여, 남색 모양의 선 부분을 canvas API 를 이용하여 그렸는데요, 직무경험의 Length 에 따라 더 길게 표시되고, 그 그림에 데이터가 알맞게 안착되도록 CSS 코딩을 신중하게 했습니다. 여태 CSS의 `position: relative` 속성은 absolute 의 컨테이너 정도로만 활용했었는데, 이번에 relative 를 제 역할에 맞게 제대로 사용해보게 되어 제 나름대로 가장 뿌듯했던 부분중의 하나였습니다.

canvas API 를 활용한 컴포넌트는 `src/components/HistoryBackground/` 를 살펴봐 주시기 바랍니다.

- **개인프로젝트 (src/containers/About/Experience/PersonalProjects.tsx)**
  ![](https://github.com/LimEunSeop/assets/blob/master/images/portfolio/Personal%20Projects.png?raw=true)
  단순 크롤링된 데이터를 나타낸 것이므로 특별한 것은 없습니다.

- **Education (src/containers/About/Education.tsx)**
  ![](https://github.com/LimEunSeop/assets/blob/master/images/portfolio/Education.png?raw=true)
  책효과를 내기위해 border에 색깔주고 radius 처리 했으며, 종이부분은 반복 gradient 이용했습니다.

- **Certificates (src/containers/About/Certificates/Certificates.tsx)**
  ![](https://github.com/LimEunSeop/assets/blob/master/images/portfolio/Certificates.png?raw=true)
  단순 크롤링 하여 구성한 화면입니다.

- **Open Source Contributions (src/containers/About/OpenSourceContributions.tsx)**
  ![](https://github.com/LimEunSeop/assets/blob/master/images/portfolio/Opensource.png?raw=true)
  Chart.js 라이브러리를 사용하여 렌더링 하였습니다. 데이터는 오픈소스 기여 항목의 length 를 계산하여 차트에 할당했습니다.

- **Skills (src/containers/About/Skills.tsx)**
  ![](https://github.com/LimEunSeop/assets/blob/master/images/portfolio/Skills.png?raw=true)
  cytoscape.js 라이브러리를 사용하여 이 곳에 들어갈 Node(동그라미), Edge(실선)데이터를 전부 크롤링한 데이터를 프로그래밍 하여 재구성 후 할당하였고, 각각의 그룹별로 색깔이 구분되도록 스타일링 처리를 하였습니다.

#### Blog (src/screens/Blog.tsx)

[저의 medium 블로그](https://dmstjq92.medium.com)의 포스팅을 API 를 통하여 불러오려 했으나, API 가 존재하지 않는것 같아 rss 피드의 xml 데이터를 json 으로 변환 후 렌더링 하는 방식을 채택했습니다. rss 피드 GET 요청 시 CORS 문제를 해결하기 위해 CORS anywhere 라는 CORS 프록시를 이용하였습니다.

---

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
ts
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
