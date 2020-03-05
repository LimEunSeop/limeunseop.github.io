---
title: "HTML block item 한줄배치 CSS Trick"
date: "2018-10-05 14:26"
categories:
    - HTML
    - CSS
tags:
    - table
    - inline-block
---

{% include adsense.html %}

## **display: table** or **display:inline-block** 을 이용한 방법
white-space 떄문에 생기는 li요소간 1space를 제거하기 위해 ul 요소에 ```font-size:0``` 적용한다. li 요소에는 ```display:inline-block```을 적용하고, left padding에 간격을 적용하는데, 박스사이즈를 고정하기 위하여 ```box-sizing:border-box```를 적용해야한다. 또한 flexLayout의 ```justify-content: space-between``` 와 같은 효과를 적용하기 위해, ul 요소의 왼쪽 margin에 -패딩값 을 적용한 후 100% width를 적용한다. 이 때 왼쪽 margin 으로 인해 삐져나온 부분 떄문에 반응형 웹에서 스크롤바가 발생할 수 있으므로, 상위태그에 ```overflow:hidden``` 하는것은 필수이다. table은 ul에 ```display:table```, li에 ```display:table-cell```을 적용하면 된다. 테이블을 여러개의 div로 구성하면서 table-row를 이용하여 여러줄을 구성한다면, 반응형에 유연하게 대처하지 못한다. 따라서, 이것은 데스크탑환경에서 한줄짜리 리스트일떄만 사용하는 것이 바람직하다. 이렇게 해도 결국 화면크기 줄어들 때 inline-block 으로 변환시킨다. 그래서 내 생각으로는 아예 처음부터 inline-block 으로 가는것이 바람직할것 같다.

### HTML
```html
<div class="table-wrapper">
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>
</div>
```

### CSS
table로 적용하고 싶을 때는, ul 에 ```display: table```, li에 ```display: table-cell```을 적용해주면 된다.
```css
.table-wrapper {
    overflow: hidden;
}
ul {
    margin-left: -20px;
    width: 100%;
    font-size:0;
}
li {
    box-sizing: border-box;
    display: inline-block;
    width: 33.33333333333%;
    padding-left: 20px;
    font-size: 12px;
}
```

{% include adsense.html %}