---
title: "CSS absolute vs relative 핵심 종결"
date: "2020-05-02 15:49"
categories:
    - CSS
tags:
    - position
    - absolute
    - relative
---

## normal-flow
요소들이 배치되는 '기본적인 흐름'이라고 생각하면 된다. 선언된 순서대로 안 겹치고 차곡차곡 쌓이는 구조!!

## absolute
absolute 인 순간 normal-flow 를 벗어나나, offset 값이 없으면 원래 그 자리를 유지하고, 있으면 그 축을 기준으로 relative 혹은 absolute 인 부모를 시작점으로 잡는다.
<script async src="//jsfiddle.net/EunseopLim/hos812te/5/embed/html,css,result/"></script>
*top만 있을 경우, left만 있을 경우를 꼭 실습하여 정의를 정확히 이해할 것!! *

## relative
relative 는 normal-flow 유지하고 현재자리를 offset 기준으로 삼는다. 이래서 absolute 자식의 container를 relative로 자주 잡는다.
<script async src="//jsfiddle.net/EunseopLim/n38q4esa/1/embed/html,css,result/"></script>

{% include adsense.html %}
