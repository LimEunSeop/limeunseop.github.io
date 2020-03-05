---
title: "Immutability Helper와 spread 연산자"
date: "2018-05-28 15:52"
categories:
    - React.JS
tags:
    - Immutability Helper
    - Spread Operator
---

{% include adsense.html %}

## 배열로 이루어진 state 수정할 때
state를 수정할 때는, 무조건 setState 함수를 사용하고 내부의 값이 완전히 바뀌어야 하는 조건이 있다. 따라서 배열을 수정할 때에는 push함수 말고 concat 함수를 이용해야한다.

## immutablity Helper
- 배열과 객체를 조금더 쉽게 수정하기 위한 도구.
- Facebook에서 만든 immutable.js 를 사용한다.

### Documentation 및 JSBin
- Documentation : https://facebook.github.io/react/docs/update.html
- JSBin : http://jsbin.com/ligusep/edit?js,output

### 설치 및 적용법
- 설치 : ```npm install --save react-addons-update```
- 적용 : ```import update from 'react-addons-update'```

### 원소 추가
```Javascript
this.setState({
    list: update(
        this.state.list,
        {
            $push: [newObj, newObj2]
        }
    )
});
```
**update 함수의 새로운 리턴값을 list에 덮어써야 한다.** 첫번째 인수로는 변경할 대상, 두번째는 명령의 모음을 객체로 정리해놓는다. 이 때, $push 명령의 인수는 1개라도 무조건 배열로 감싸줘야 한다.

### 원소 제거
```Javascript
this.setState({
    list: update(
        this.state.list,
        {
            $splice: [[index, 1]]
        }
    )
});
```
배열의 index 아이템부터 시작해서 1개의 요소를 제거하겠다는 의미. **여러개 삭제할 때 인덱스가 변동된다는 점 주의**

### 배열 원소 수정
```javascript
this.setState({
    list: update(
        this.state.list,
        {
            [index]: {
                field: { $set: "value" },
                field2: { $set: "value2" }
            }
        }
    )
});
```
list 배열 index번째 인덱스의 field 와 field2 값을 변경하겠다는 의미

### 객체 수정
```javascript
let object = {
    a: '1',
    b: '2',
    c: {
        d: '3',
        e: '4',
        f: {
            change_this_value: '0',
            this_stays_same: '0'
        }
    }
}

let changed = update(object, {
    c: {
        f: {
            change_this_value: {
                $set: "5"
            }
        }
    }
});
```
그냥 객체의 구조에 맞게 트리타다가 변경할 필드 만났으면 안에 객체로된 명령을 적어주면 된다.

{% include adsense.html %}

## ES6 Spread
Imutability Helper 말고도 ES6에서 새로 제공되는 Spread 연산자를 이용하여 데이터를 조작할 수도 있다.

### Documentation 및 JSBin
- Documentation : https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Operators/Spread_operator
- JSBin : http://jsbin.com/siruha/edit?js,output

### 설치 및 적용법
- 설치 : ```npm install --save babel-preset-stage-0```
- 적용 : webpack.config.js 파일 안에서 preset에 'stage-0' 을 추가하면 된다.

### 객체 수정
```javascript
let object = {
    a: '1',
    b: '2',
    c: {
        d: '3',
        e: '4',
        f: {
            change_this_value: '0',
            this_stays_same: '0'
        }
    }
}

let changed = {
    ...object,
    c: {
        ...object.c,
        f: {
            ...object.c.f,
            change_this_value: '5'
        }
    }
}
```
{...object} 라고 하면 object의 값이 나온다. {...object, c:{...}} 라고 하면 object의 c를 수정하겠다는 의미이다. 이처럼 무언가를 수정하려면 앞에 꼭 어떤 객체를 수정해야 하는지 Spread Operator와 함께 정의해야 한다.

### 배열 수정
```javascript
let array = [1,2,3,4,5,6];
let changed = [ ...array, 7 ]; // 새로운 값 추가
let changed = [ ...array.slice(0,2) ]; // 0번째 요소부터 2-1번째 요소를 추출
// *splice는 배열 자체를 바꾸는 것이기 때문에 하면 안됨.
let changed = [ ...array.slice(0,2), '수정', ...array.slice(3, array.length - 1) ];
```

{% include adsense.html %}