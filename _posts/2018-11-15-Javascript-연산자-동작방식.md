---
title: "Javascript 연산자 동작방식"
date: "2016-11-15 18:18"
categories:
    - Javascript
tags:
    - Short Circuit
    - 논리연산자
---

## 서적

자바스크립트 핵심 가이드



## 어느 부분?

Page : 42

Chapter : 3. 객체

Section : 2. 속성값 읽기





## 연구를 하게된 계기

자바스크립트 에서는 undefined의 속성을 참조하려 할 떄, TypeError 예외가 발생하는데, 이 예외를 방지하기 위하여

```javascript
var model = flight.equipment && flight.equipment.model
```

형식으로 코드를 작성하면, ```flight.equipment```가 ```undefined``` 일 경우 논리연산자 &&에 의해 ```undefined```가 반환되어 안전하게 TypeError 예외를 피할수 있다는 사실을 알게되었다.



그리고, 반대로 ```flight.equipment.model``` 이 실제로 존재하는 경우를 생각해 보았다. var model 에는 flight.equipment.model이 들어가게 되고, 물론 의도대로 일이 진행되긴 한다. 하지만 C언어에서의 논리연산자 개념을 되짚어 봤을때, "논리연산자는 원래 참 혹은 거짓(true,false 혹은 1,0)을 반환하는것 아닌가?" 라는 의문점이 생겼다.



여기서, 자바스크립트의 논리연산자는 C와는 조금 다른 방식으로 동작한다는 점을 깨닫고, 그것을 알아내고자 결심하였다.





## 연구 과정

1. 실제로 존재하는 속성과, 존재하지 않는 속성 두가지를 준비한다.

2. && 연산일 경우, || 연산일 경우, 피연산자 위치를 교환했을 경우 총 4가지 경우의 값을 비교한다.





## 연구결과

1. 자바스크립트의 논리연산자 에서도 쇼트서킷(Short-Circuit)이 적용된다.

- 따라서, ```flight.equipment && flight.equipment.model``` 의 표현식 에서 ```flight.equipment```가 undefined일 경우, &&연산자의 오른쪽 항 까지 가지 않고 undefined가 반환되어 종료된다.



2. 자바스크립트에서의 거짓값은 false, null, undefined, ''(빈 문자열), 0, NaN 이고, 이를 제외한 값은 모두 참이다.



3. 논리연산자는 최종 판별한 참, 거짓 값을 있던 그대로 반환한다.

예를들어, true && '' 은 거짓값이었던 ''을 그대로 반환한다.

따라서, ```flight.equipment && flight.equipment.model``` 가 거짓값이 아닌 경우, 쇼트서킷에 의해 최종 판별된 ```flight.equipment.model``` 값이 그대로 반환되는 것이다.