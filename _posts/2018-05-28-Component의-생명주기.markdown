---
title: "Component의 생명주기"
date: "2018-05-28 15:54"
categories:
    - React.JS
tags:
    - Component
    - 생명주기
---

# 생명주기란
**객체의 상황에 따른 메소드의 호출순서.** 적절한 곳에 적절한 로직을 넣음으로써 원하는 기능을 정의할 수 있고, 한 편으로는 최적화를 할 수도 있다.

## Component 생성
![Image Alt 텍스트](/assets/images/component_lifecycle/create_component.png)

#### constructor(props)
- 컴포넌트가 처음 만들어질 때 실행된다.
- 여기서 기본 state를 설정할 수 있다.

#### componentWillMount()
- 컴포넌트가 DOM 위에 만들어지기 전(render메서드가 호출되기 전)에 실행된다.
- **따라서 DOM을 조작할 수 없다.**

#### render()
- 컴포넌트를 DOM 위에 렌더링 하는 메서드

#### ComponentDidMount()
- 컴포넌트 생성, 즉 첫 렌더링 마치고 실행된다.
- 이 안에서 다른 Javascript Framework 연동 및 setTimeout, setInterval 및 AJAX 사용이 가능하다.
- **여기서는 DOM 처리를 할 수 있다.**


## Component 업데이트
![Image Alt 텍스트](/assets/images/component_lifecycle/update_component.png)

#### componentWillReceiveProps(nextProps)
- props를 받을 때 실행된다.
- props에 따라 state를 업데이트 할 때 사용하면 유용하다
- 이 안에서 setState를 해도 괜찮다.

#### shouldComponentUpdate(nextProps, nextState)
- props/state 가 변경되었을 때 리렌더링을 할지 말지 정한다.
- 실제로 사용할 때는 필요한 비교를 하고 값을 반환해야 한다. (ex. return nextProps.id !==  this.props.id)
- JSON.stringify 를 사용하여 여러 field 를 편하게 비교할 수도 있다.

#### componentWillUpdate(nextProps, nextState)
- 컴포넌트 업데이트 전 실행된다.
- 여기서는 setState 절대 사용하지 말것. 무한루프 도니까.

#### componentDidUpdate(prevProps, prevState)
- 컴포넌트가 리렌더링을 마친 후 실행된다.
- 여기서도 setState 사용하지 말 것!!!!


## Component 제거
#### componentWillUnmount()
- 컴포넌트가 사라지기 전에 실행된다.
- Destructor(소멸자, 파괴자)와 같은 역할을 정의하고 싶을 때 여기서 하면 된다.

## ★꿀팁★
### construct : 객체생성
### mount : 첫 렌더링
### update : 리렌더링(re-rendering)
### unmount : DOM 회수
### Will : 이전
### Did : 이후

#### Ex) ComponentWillUpdate : 컴포넌트 업데이트 될거야~. 그니깐 업데이트 전 이라는 의미
