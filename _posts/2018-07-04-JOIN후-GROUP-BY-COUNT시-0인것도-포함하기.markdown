---
title: "JOIN후 GROUP BY COUNT시 0인것도 포함하기"
date: "2018-07-04 10:31"
categories:
    - Database
tags:
    - Left Join
    - Group by
    - Count 0
---

# 조인조건에 카운트하고 싶은 값을 명시
OUTER JOIN 할 때 조인조건 ON 다음에 AND 로 다시 꼽사리 껴서 count 조건 주면 된다. OUTER JOIN 에 조인조건 이외의 다른 조건을 줄 시, 그 효과는
1. 일치하는 레코드가 있으면 여과없이 모두 결과레코드에 포함(INNER JOIN과 같음)
2. 일치하는 레코드가 없으면, 빈 값으로라도 나옴(OUTER JOIN의 특성)

조인조건이 아닌 다른 조건을 주기때문에 헷갈릴 수도 있지만, 결국 OUTER JOIN 의 특성을 그대로 가져온다!
여기서 count를 해주면, 다행히도 조인조건에 명시한 값을 카운트 해준다!!!!
> WHERE 절로 뒷북치면, 해당되지 않는 레코드는 아예 포함이 되지 않으니 주의하도록!!

## SQL 문법
```SQL
SELECT a.idx a.taskname count(b.complete) as mem_comp_cnt FROM todolist_admin_table AS a
                                               LEFT OUTER JOIN todolist AS b
                                                            ON a.idx=b.admin_idx
                                                           AND b.complete="YES"
                                                      GROUP BY a.idx, a.taskname
```

## Code Ignitor 문법
```php
$listWithMemCompCnt = $this->db()->select($this->table->admin_todolist.' a','a.idx, a.taskname, count(b.complete) as mem_comp_cnt')->join($this->table->todolist.' b','a.idx=b.admin_idx and b.complete="YES"','LEFT')->groupBy('a.idx, a.taskname')->orderBy($sort,$dir)->get();
```