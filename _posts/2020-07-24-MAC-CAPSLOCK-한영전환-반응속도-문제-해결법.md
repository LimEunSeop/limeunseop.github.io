---
title: "MAC-CAPSLOCK-한영전환-반응속도-문제-해결법"
date: "2020-07-24 23:27"
categories:
    - MAC OS
tags:
    - CAPSLOCK
    - 한영전환
    - 반응속도
---

capslock 한영전환 키가 반응속도 느리다고 생각하신 분께 팁을 드리고자 합니다.
capslock 키는 반응속도 느린것이 아니고, 언어변환과 대문자입력을 구분하기 위해 capslock 을 누르는 행동을 구분하는것 뿐입니다.
keyboard 동작에는 간단히 2가지가 있습니다. 키를 누르는 keydown, 키를 떼는 keyup 입니다.
keydown 후 약 1초간 keyup 을 하지 않으면 capslock 에 불이 켜져 영문상태로 변하고, keydown 후 1초가 되기전에 keyup 을 한다면 한/영 전환이 이루어집니다.

우리의 관심사는 한영전환 인데요, 이 **keyup 을 확실히 해주면 한영전환이 안 되는 문제를 해결할 수 있습니다.**
**단, keydown->keyup 이 온전하게 이루어져야지 keydown->{다른키}->keyup 형태로 다른키가 침범하면 안됩니다.**
예를들어 backspace로 글자를 지우는 중간에 한/영 전환을 습관을 가지시는 분은 keydown->{backspace}->keyup 의 실수가 발생하여 한영전환이 안이루어질 수 있습니다.
꼭 backspace 로 전부 지운 후 capslock 을 누르는 습관을 들여주세요. 많이 어려운거 아니고 금방 고칠 수 있습니다. 나머지 한/영전환의 경우엔 일반적으로 글을 다 치고 한/영전환 하므로 문제없지만, 이 역시 글을 다 치고나서 capslock 을 재빨리 눌렀다 떼는 테크닉이 필요합니다.

Karabinder 같은 툴로 애플의 좋은 기본기능을 망가뜨리지 마세요. 애플의 기본철학을 준수해야 개발자로서 나은 생산성을 유도할 수 있습니다. 그 후 필요하다면 Hammerspoon 을 쓰는것을 추천합니다.(Karabinder 개인적으로 비추합니다.) 시간이 나면 제가 사용하는 Hammerspoon 코드를 공유해보도록 하겠습니다.

{% include adsense.html %}
