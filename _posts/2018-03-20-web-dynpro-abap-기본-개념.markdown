---
layout: "single"
title: "Web Dynpro ABAP 기본 개념"
date: "2018-03-20 17:48"
---

# Component Controller
- **Window와 View를 관리하는 총 책임자.**
- 한 프로그램에 하나만 있다.
- Component Controller의 Context에 Attribute를 정의하면, 모든 뷰에서 이곳에 접근할 수 있다.

# Window
- **한 화면을 의미.**
- 하나의 window에는 여러개의 뷰를 구성할 수 있다. 그렇지만 하나의 view밖에 보일 수 없다.
- 뷰를 구성하기 위해선 윈도우가 필수이다.

# View
- **유저에게 보이는 화면의 최소단위.**
- 레이아웃과 버튼, 텍스트 등을 포함한다.

# Plug
- **화면간 이동을 위해 필요한 연결점.**
- 전선이 전기를 받기 위해 플러그를 꽂듯이, 화면간 연결을 위해서는 플러그 정의가 필수이다.
- 매개변수를 정의해서 넘겨줄 수 있다.
- IN/OUTBOUND Plug를 각 화면에 정의한 후, 두 플러그를 연결하여 **네비게이션** 링크를 만들어주면 끝.
- Window에도 Plug가 있고, View에도 Plug가 있다.

# Context
- **각 요소와 관련된 정보를 담는 곳** 이라고 안드로이드 공부할 때 부터 알고 있었음.
- 그렇지만 지금 상태에서는, **Node와 element, Attribute 등의 데이터를 담는 곳** 이라고 생각하는 것이 편하겠다.
> Context는 하나의 데이터베이스에 대응된다. 그 이유는 읽다보면 알 것이다.

# Node
- **Attribute의 모임을 의미한다.**
- Node는 Attribute를 구조로 하는 여러개의 element를 가지는데, 이는 레코드에 대응된다.
- 이를 통해 미루어 짐작해보자면, Node는 하나의 테이블, Element는 레코드, Attribute는 필드로 비유할 수 있다.
> Node를 생성할 때, 0..1과 같이 Cardinality를 지정하는 부분이 나온다. 앞부분은 디폴트로 하나의 레코드를 만들것인가를 의미하는 것이고, 뒷부분은 레코드 하나로 관리될 것인지, 여러개로 관리될 것인지 정하는 부분이다.

# Element
- **Node가 가지고 있는 레코드를 의미한다.**

# Attribute
- **Element의 필드를 의미한다.**

# Action
- **이벤트메서드의 이름을 의미한다.**
- 레이아웃을 구성할 때, 버튼에 Action을 지정할 수 있는데, 이렇게 클릭이벤트의 메서드를 설정할 수 있다.

# if_wd_context_element와 if_wd_context_node 클래스
- if_wd_context_node : 하나의 Node, Node와 관련된 Context 데이터를 꺼네는 메서드가 있다.
- if_wd_context_element : 하나의 Element, Element와 관련된 Context 데이터를 꺼네는 메서드가 있다.

# Node, Element, Attribute 관계표
![Node, Element, Attribute 관계표](https://user-images.githubusercontent.com/34618693/37676125-6511a518-2cba-11e8-80fd-29f7caee52b8.PNG)


- DB로 생각하면 쉽다. Node 안에 Element가 있고, Element 안에 Attribute가 있다. 결국엔 Attribute를 불러와 값을 읽어야 하기 때문에, Root Node를 가리키는 wd_context에서 getElement 메서드를 호출하여 Element를 가져오고, 가져온 Element에서 getAttribute 메서드를 호출하여 값을 가져온다.
- Element에 Node가 있다면, getNode로 그 Node를 가져올 수 있다.


>- Node 밑에 Node가 있고, 그 Node만 가져오고 싶을 때, Node의 getChildNode라는 메서드를 바로 호출하여 가져올 수 있다. 편의상 생긴 메서드이다.
>- Element에서 하위레벨의 Node를 바로 가져오고 싶을 때는, getChildNode 메서드를 호출하면 된다. 이것도 역시 편의상 생긴 메서드이다.
>- 테이블에서, 괄호가 있는 메서드는 위에서 설명했 듯이 편의상 생긴 메서드 이므로, 처음 공부할 때는 괄호가 없는 메서드를 이해하면 된다.





#### ↓ 아직 제대로 학습하지 못한 부분, 소스와 함께 자세한 예제 학습할 것.
> 뷰의 attribute 3개 wd_context, wd_this, wd_comp_controller 랑 친숙해져야 함.
- wd_context : 각각의 컨텍스트
- wd_this(이 뷰 자체)
- wd_comp_controller : 최상위의 componentcontroller를 바라보는것. 컴포넌트 컨트롤러에 정의된 데이터를 전역적으로 쓸 수 있음.

> 다음페이지 : 버튼버튼클릭 -> 액션실행-> go_fire -> outbount plug 실행 -> imbound plug 실행
