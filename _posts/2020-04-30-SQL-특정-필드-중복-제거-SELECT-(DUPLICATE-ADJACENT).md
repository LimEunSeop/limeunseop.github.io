---
title: "SQL 특정 필드 중복 제거 SELECT (DUPLICATE ADJACENT)"
date: "2020-04-30 13:26"
categories:
    - SQL
tags:
    - 중복제거
    - duplicate adjacent
    - 필드중복
    - SELECT
---

## 문제인식
### 상황
- 여러 학생이 검사를 수행한다. 시기가 지나면 검사를 다시 수행할 수 있다. 따라서 한 학생당 여러 검사내역이 존재한다.
- 특정 날짜에 대하여 그 날짜를 기준으로 최근 검사 점수를 가져오고 싶다.
- ABAP 이라는 언어에는 ```DUPLICATE ADJACENT``` 라는 키워드로 쉽게 처리할 수 있지만 다른 SQL 에서는 이를 처리할 키워드가 없다.
### 해결방안
- WHERE 절에 부속쿼리를 줄 수 있는 방법을 선택했다.
- 부속쿼리문의 ```WHERE``` 절에 중복을 판별할 필드를 현재 레코드와 비교하여 ```COUNT(*)``` 한다.
- 이러면 특정 필드에 대하여 현재 레코드와 중복되는 갯수를 구하게 되는데, 원하는 갯수를 비교연산자로 판별하여 레코드를 걸러내면 된다.
- 예를들어, 필자는 모든 학생의 최근검사결과 1개씩을 가져오고 싶다. 그렇다면 일단 '학생'테이블을 기준으로 '검사결과'테이블과 ```LEFT JOIN``` 하여 모든 학생이 수행한 모든 검사 데이터를 불러온다. 여기서 ```WHERE``` 조건으로 ```0 = (SELECT COUNT(*) FROM 검사결과 WHERE midx=a.midx AND end_date>a.end_date)``` 식으로 주면 된다. 이는 '나보다 큰것의 갯수가 0, 즉 나보다 큰것이 없으면 출력하라. 제일 큰것을 출력하라는 의미가 되는것이다.
- 사실 이를 마지막 WHERE 조건에 주는것 보다, 조인조건 ON 에 줘야 속도가 더 잘 나온다. (*조인조건에 주는것은 OUTER 조인일 경우 조건탈락시 LEFT 레코드 하나만 남고 RIGHT 레코드는 NULL로 남게된다. 이것이 완전필터링 되는 WHERE 절 과의 차이이다. 이것이 괜찮다, 필요하다 싶으면 적극적으로 조인조건 ON에 조건을 주어도 무방하다.)
## SQL 코드
```sql
SELECT
m.name, a.point,
FROM member_table m
LEFT JOIN diagnosis_answer_table a ON m.idx=a.midx
AND 0 = (SELECT COUNT(*) FROM diagnosis_answer_table
          WHERE midx=a.midx AND end_date>a.end_date) 
```

{% include adsense.html %}
