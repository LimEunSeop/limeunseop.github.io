---
title: "Javascript 객체 속성값 읽기"
date: "2016-11-15 17:19"
categories:
    - Javascript
tags:
    - undefined
    - 속성 참조
---

{% include adsense.html %}

## 서적

자바스크립트 핵심 가이드



## 어느 부분?

Page : 41

Chapter : 3. 객체

Section : 2. 속성값 읽기



## 개념

### 객체의 존재하지 않는 속성을 참조했을 때, undefined가 반환된다.

- 존재하지 않는 속성을 참조했을 경우, undefined 말고 디폴트값을 반환하고 싶을 때, 오른쪽에 (\|\| + 표현식) 을 덧붙여주면 된다.

ex) var status = flight.status \|\| "unknown";



### undefined의 속성을 참조했을 때, TypeError 예외가 발생된다.

- TypeError를 피하고 싶을때, 왼쪽에 (상위 객체명 + &&) 을 덧붙여주면 된다.

ex) var model = flight.equipment && flight.equipment.model;