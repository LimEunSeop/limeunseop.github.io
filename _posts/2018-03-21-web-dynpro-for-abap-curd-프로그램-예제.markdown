---
layout: "single"
title: "Web Dynpro For ABAP - 영업오더 CURD 프로그램 예제"
date: "2018-03-21 00:00"
categories:
    - SAP
tags:
    - Web Dynpro for ABAP
---

### 프로그램
영업오더 CRUD 프로그램

### Context 구성
![1-1. MAIN뷰 Context List](https://user-images.githubusercontent.com/34618693/37882149-acdb1f62-30db-11e8-9ff6-9e797690994c.PNG)

### 화면
![영업오더 CURD 프로그램 초기화면](https://user-images.githubusercontent.com/34618693/37882091-fcafbfa8-30da-11e8-82b8-8ce5df64f97a.PNG)

### 기능
- Save : 입력했던 주문 리스트를 CBO 테이블에 반영
- Select : 선택한 레코드를 아래의 테이블로 끌어오는 기능
- Delete : 선택한 레코드 삭제
- Insert : 선택한 레코드 위로 새로운 빈 레코드 생성

### 소스코드
#### TAB 노드의 Supply Function
```ruby
METHOD set_table_data .
  DATA : lw_table TYPE wd_this->element_tab,
         lt_table TYPE wd_this->elements_tab,
         lv_len_of_dummy_element TYPE i.

  SELECT * INTO TABLE lt_table FROM zjwl.

  IF sy-dbcnt < 10. "10개의 레코드를 보여야 하는데, 레코드가 없다면 부족한 만큼 더미데이터를 체운다."
    lv_len_of_dummy_element = 10 - sy-dbcnt.
  ENDIF.

  DO lv_len_of_dummy_element TIMES.
    APPEND lw_table TO lt_table.
  ENDDO.

  node->bind_table( lt_table ).
ENDMETHOD.
```
- 입력 가능한 Input Field를 만들기 위해, 빈 레코드를 노드에 삽입한다.
- zjwl 인터널 테이블에서 레코드를 읽어온다.
- 레코드 수가 10개 이하인 경우, 10개의 Input Field를 맞추기 위해, 나머지 수의 빈 레코드를 삽입한다.


#### Save
```ruby
METHOD onactionclick_savebutton .
  DATA : lo_node_tab TYPE REF TO if_wd_context_node.
  DATA : lt_tab TYPE wd_this->elements_tab,
         lw_tab TYPE wd_this->element_tab.

  lo_node_tab = wd_context->get_child_node( name = 'TAB' ).
  lo_node_tab->get_static_attributes_table( IMPORTING table = lt_tab ).
  DELETE lt_tab WHERE matnr = ''.
  MODIFY zjwl FROM TABLE lt_tab.
ENDMETHOD.
```
- 테이블 역할을 하는 TAB 노드를 불러다가 들어있는 레코드 들을 불러옴
- 불러온 레코드 들을 인터널 테이블로 세팅하고 빈 레코드를 DELETE 한다.
- DELETE 하고 남은 레코드는, Save의 실제 대상이다. MODIFY 를 통해 Save를 완료한다.


#### Select
```ruby
METHOD onactionclick_selectbutton .
  DATA : lo_node_tab    TYPE REF TO if_wd_context_node,
         lo_node_select TYPE REF TO if_wd_context_node.
  DATA : lt_element_tab TYPE wdr_context_element_set,
         lw_element_tab TYPE REF TO if_wd_context_element.
  DATA : lt_tab TYPE wd_this->elements_tab,
         lw_tab TYPE wd_this->element_tab.

  lo_node_tab = wd_context->get_child_node( name = 'TAB' ).
  lt_element_tab = lo_node_tab->get_selected_elements( ).

  LOOP AT lt_element_tab INTO lw_element_tab.
    lw_element_tab->get_static_attributes( IMPORTING static_attributes = lw_tab ).
    APPEND lw_tab TO lt_tab.
    CLEAR lw_tab.
  ENDLOOP.

  lo_node_select = wd_context->get_child_node( name = 'SELECT' ).
  lo_node_select->bind_table( new_items = lt_tab set_initial_elements = abap_false ).
ENDMETHOD.
```
- TAB 노드에서 선택된 레코드 들을 SELECT 노드에 따로 삽입한다.
- node에서 get_selected_static_attributes 메서드가 있다면 코드가 짧아지겠지만, get_selected_elements( ) 메서드 밖에 없다.
- 그래서 element를 루프를 돌아서 다시 인터널 테이블 세팅해야 한다.


#### Delete
```ruby
METHOD onactionclick_deletebutton .
  DATA : lo_node_tab TYPE REF TO if_wd_context_node.
  DATA : lt_selected_element_tab TYPE wdr_context_element_set,
         lw_element_tab          TYPE REF TO if_wd_context_element.
  DATA : lt_tab TYPE wd_this->elements_tab,
         lw_tab TYPE wd_this->element_tab.

  lo_node_tab = wd_context->get_child_node( name = 'TAB' ).
  lt_selected_element_tab = lo_node_tab->get_selected_elements( ).
  LOOP AT lt_selected_element_tab INTO lw_element_tab. "화면상의 레코드 삭제 + 실제 삭제할 레코드 세팅"
    lo_node_tab->remove_element( lw_element_tab ).
    lw_element_tab->get_static_attributes( IMPORTING static_attributes = lw_tab ).
    APPEND lw_tab TO lt_tab.
    CLEAR lw_tab.
  ENDLOOP.
  DELETE zjwl FROM TABLE lt_tab.
ENDMETHOD.
```
- Select와 마찬가지로, 선택된 레코드를 삭제하는 메서드 이기 때문에, get_selected_elements( ) 에서 element Set을 얻은 후에 작업한다.


#### Insert
```ruby
METHOD onactionclick_insertbutton .
  DATA : lo_node_tab TYPE REF TO if_wd_context_node.
  DATA : lw_tab TYPE wd_this->element_tab.
  DATA : lv_selected_index TYPE i.

  lo_node_tab = wd_context->get_child_node( name = 'TAB' ).
  lv_selected_index = lo_node_tab->get_lead_selection_index( ).

  IF lv_selected_index > 0.
    lo_node_tab->bind_element(
        new_item             = lw_tab
        set_initial_elements = abap_false
        index                = lv_selected_index ).

  ELSE.
    lo_node_tab->bind_element(
        new_item             = lw_tab
        set_initial_elements = abap_false ).
  ENDIF.
ENDMETHOD.
```
- 선택한 인덱스를 뽑아 그 인덱스에 빈 레코드를 삽입한다.
- lv_selected_index가 0보다 작다면, 레코드를 선택하지 않는것을 의미하므로, 마지막 줄에 삽입한다.
