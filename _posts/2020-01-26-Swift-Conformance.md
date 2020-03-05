---
title: "Swift Confirmance"
date: "2020-01-26 18:05"
categories:
    - Programming
tags:
    - Swift
    - Comformance
---

## Conformance
```swift
import SwiftUI
import MapKit

struct MapView: UIViewRepresentable {
    var body: some View {
        Text("Hello World")
    }
}
```
- MapView 라는 View 오른쪽에 저렇게 표현하면, UIViewRepresentable 의 프로토콜을 따르겠다(conform)는 의미가 된다.
- 이를 UIViewRepresentable conformance 를 선언했다고 말한다. (순응하겠다고 선언한다는 의미. 걍 명사화한것이니 용어적으로 큰 의미부여는 필요없을듯)
- 다른 View 에서 이 Subclass 를 사용하기 위해 UIViewRepresentable conformance 를 선언하는 것이다.

{% include adsense.html %}
