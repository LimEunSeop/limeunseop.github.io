---
title: "display table 속성 요소 height transition"
date: "2018-11-24 16:00"
categories:
    - HTML
    - CSS
tags:
    - table
    - transition
    - max-height
    - block
---

## height 속성을 이용한 transition 방법
사실 height 속성으로는 transition 처리가 되지 않는다. 이에 대체되는 방법은, max-height:0; overflow:hidden; 으로 줬다가 커질때는 max-height를 넉넉하게 주면 된다.
<iframe width="100%" height="300" src="//jsfiddle.net/EunseopLim/nqsvLcd8/1/embedded/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
### 문제점
대부분의 display 속성을 가지는 요소들한테 잘 통한다. 하지만, display:table 속성을 가지는 요소한테는 max-height가 통하지 않는다. 이유는 모르겠지만 그냥 통하지 않는다.

### 해결 방법
#### 1. 숨겨진 상태를 display:block; 로 한다.
display 속성이 table 이외인 거의 모든 것들은 max-height가 통한다. 그 중 가장 만만한 block 을 선택했다.
#### 2. open 되는 상태를 display:table; 로 원상복구한다.
- 여기서 'display:none; 하면 되지 않느냐?' 하는 의문이 들 수도 있다. 그렇지만, transition은 display:none -> display:아무거나 의 변화를 적용할 수 없으므로, 숨김상태를 block 으로 한 것이다.
- 여전히 문제가 존재한다. display 가 갑자기 다른것으로 변화했기 때문에 padding의 변화라던지 그런건 transition 처리가 되지만 내부의 item 은 그냥 반짝하고 보이는 문제가 생긴다. 반쪽짜리 transition이 돼버리는 것이다. 그 해결법은 바로 다음에 있다.
#### 3. 내부의 item도 max-height와 transition 을 적용해준다.
- 따라서, 내부의 item도 앞에서 한 것과 같이 max-height 를 조정해주고 똑같은 transition 값을 적용해야 한다.
- 여기서 또 의문점이 생긴다. 그럼 먼저 했던 transition 속성을 지워도 되지 않는가? 이것도 역시 불가능 하다. open 되는 상태로는 정상적으로 간다. max-height 가 커지면, height 는 그냥 content 크기에 맞춰서 증가하기 때문이다. 그렇지만, max-height가 다시 0으로 되면, 인정사정 봐줄것 없이 height가 0으로 바뀐다. 따라서, container 에도 transition 을 유지하여 max-height가 0이 되는 상황에서 내부의 아이템이 유연하게 줄어들도록 해야하는 것이다.

### CSS
테이블 안의 각 행이 또 다시 테이블을 머금는 구조이다.
여기서의 height 속성 transition의 container 가 되는 주체는 li.scorecard-detail 이고, item 은 내부에 존재하는 ul[data-role=table] 이다.
```css
ul[data-role=table] > li.scorecard-detail {display:block; max-height:0; overflow:hidden; background-color:#e9edf0; transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);}
ul[data-role=table] > li.scorecard-detail > ul[data-role=table] {max-height:0; overflow:hidden; margin:0; transition: all 0.8s cubic-bezier(0.215, 0.61, 0.355, 1);}
ul[data-role=table] > li.scorecard-detail.opened {display:table; max-height:1000px; padding:20px 0;}
ul[data-role=table] > li.scorecard-detail.opened > ul[data-role=table] {max-height:1000px;}
```