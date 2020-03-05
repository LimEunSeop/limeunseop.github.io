---
title: "Web Dynpro For ABAP - Sales Order Create&Display details"
date: "2018-03-21 00:01"
categories:
    - SAP
tags:
    - Web Dynpro for ABAP
---
{% include adsense.html %}

### 프로그램
Sales Order Create&Display details
### Window 구성
![1-1. Window List](https://user-images.githubusercontent.com/34618693/37882890-f2d636e0-30e1-11e8-89dd-fb8a127cb1d2.PNG)
### Context 구성 - CREATE, DISPLAY 뷰 둘다 동일
![1-2. Context](https://user-images.githubusercontent.com/34618693/37882931-2e11c530-30e2-11e8-9b3e-11988c25f13c.PNG)
### 화면
#### 초기화면
![1-3. 초기화면](https://user-images.githubusercontent.com/34618693/37882945-5382ba86-30e2-11e8-848e-08f7714adbd0.PNG)
#### Create 화면
![1-4. Create 화면](https://user-images.githubusercontent.com/34618693/37882946-5806fa86-30e2-11e8-875a-6e6ca916362a.PNG)
#### Display 화면
![1-5. Display 화면](https://user-images.githubusercontent.com/34618693/37882948-5a729aa0-30e2-11e8-9cc9-bb311d1c540d.PNG)
### 기능
#### Create
- 하나의 영업오더문서의 헤더, 아이템 정보를 입력하고 저장한다.

#### Display
- 헤더에 해당되는 영업오더문서의 리스트가 여러개 뜬다.
- 하나의 문서를 클릭하면 아이템 상세정보가 아래의 테이블에 나타난다.


### 소스코드
#### Create
##### 초기화 메서드(Inbound Plug 메서드)
```ruby
METHOD handlefrom_menu .
  DATA : lo_head_node TYPE REF TO if_wd_context_node,
         lo_item_node TYPE REF TO if_wd_context_node.
  DATA : lw_head TYPE wd_this->element_head,
         lw_item TYPE wd_this->element_item,
         lt_item TYPE wd_this->elements_item.

"아이템 가져오기"
  lo_head_node = wd_context->get_child_node( name = 'HEAD' ).
  lo_head_node->bind_element( new_item = lw_head ).
  lo_head_node->set_lead_selection_index( 1 ). "wd_context는 Init. Lead Selection이 되어있기때문에 필요없었지만, 이번엔 그렇지 않기 때문에 필요하다."
  lo_item_node = lo_head_node->get_child_node( name = 'ITEM' ).

  DO 10 TIMES.
    lw_item-posnr = sy-index * 10.
    APPEND lw_item TO lt_item.
  ENDDO.
  lo_item_node->bind_elements( new_items = lt_item ).

ENDMETHOD.
```
- 입력필드가 활성화 되기 위해, HEAD와 ITEM 노드에 Element를 삽입하는 소스.
- HEAD는 입력필드가 하나 있기 때문에, 1개만 생성해주고, 그 Element의 자식노드인 ITEM은 여러 아이템이 들어올 수 있기 때문에, 10개를 생성해준다.

##### Save Button 이벤트 핸들러
```ruby
METHOD onactionclick_savebutton .
  DATA : lo_head_node TYPE REF TO if_wd_context_node,
         lo_item_node TYPE REF TO if_wd_context_node.
  DATA : lw_head TYPE wd_this->element_head,
         lw_item TYPE wd_this->element_item,
         lt_item TYPE wd_this->elements_item.

* 노드 읽어오기
  lo_head_node = wd_context->get_child_node( name = 'HEAD' ).
  lo_head_node->set_lead_selection_index( 1 ).
  lo_item_node = lo_head_node->get_child_node( name = 'ITEM' ).
* 테이블 읽어오기
  lo_head_node->get_static_attributes( IMPORTING static_attributes = lw_head ).
  lo_item_node->get_static_attributes_table( IMPORTING table = lt_item ).
* 더미데이터 지우기 (헤더는 더미데이터가 한 레코드였고, 값이 세팅되었기 때문에, 작업 필요없다)
  DELETE lt_item WHERE matnr = ''.
* DB에 반영
  MODIFY zorhd FROM lw_head.
  LOOP AT lt_item INTO lw_item.
    lw_item-vbeln = lw_head-vbeln.
    MODIFY lt_item FROM lw_item TRANSPORTING vbeln.
  ENDLOOP.
  MODIFY zorit FROM TABLE lt_item.
* 저장 후 화면 싹다 밀기 (Inbound Plug의 초기화 메소드를 다시 호출하면 됨)
  wd_this->fire_to_self_plg(
  ).

ENDMETHOD.
```
- HEAD와 ITEM 노드의 값을 불러와 비어있는 레코드를 삭제한다.
- HEAD의 레코드는 바로 CBO테이블에 저장한다.
- ITEM의 레코드는 루프를 돌아 vbeln(오더번호)를 헤더와 같이 세팅해 준 다음, CBO테이블에 반영한다.
- 마지막에 Inound Plug 메소드를 다시 호출하는 구문을 넣어준다 (저장 후 필드를 비우기 위해)

{% include adsense.html %}

#### Display
##### 초기화 메서드(Inbound Plug 메서드)
```ruby
METHOD handlefrom_menu .
  DATA : lo_head_node TYPE REF TO if_wd_context_node.
  lo_head_node = wd_context->get_child_node( name = 'HEAD' ).
  lo_head_node->set_lead_selection_index( 0 ).
ENDMETHOD.
```
- 초기상태에, 아무것도 선택되어있지 않도록 하기위함.
- 따라서, 레코드를 선택하더라도 Display버튼을 다시 누르면 아무것도 선택되어 있지 않는 상태로 돌아옴.

##### Supply Function For setting HEAD
```ruby
METHOD set_head .
  DATA : lo_head_node TYPE REF TO if_wd_context_node.
  DATA : lt_head      TYPE wd_this->elements_head.
  lo_head_node = wd_context->get_child_node( name = 'HEAD' ).

  IF lt_head IS INITIAL.
    SELECT * INTO TABLE lt_head
      FROM zorhd.
  ENDIF.

  lo_head_node->bind_table( new_items = lt_head ).

ENDMETHOD.
```
- HEAD 테이블이 보여지기 시작하면 호출되는 메서드
- CBO테이블의 내용을 SELECT하여 Node에 바로 반영

##### Supply Function For setting ITEM
```ruby
METHOD set_item .
  DATA : lo_head_node TYPE REF TO if_wd_context_node,
         lo_item_node TYPE REF TO if_wd_context_node.
  DATA : lo_head_selected_element TYPE REF TO if_wd_context_element.
  DATA : lw_head TYPE wd_this->element_head,
         lt_item TYPE wd_this->elements_item.
  lo_head_node = wd_context->get_child_node( name = 'HEAD' ).
  lo_head_selected_element = lo_head_node->get_lead_selection( ). "lead selection 말고 paranet_element 매개변수 이용하자!!!!"
  lo_head_selected_element->get_static_attributes( IMPORTING static_attributes = lw_head ).
  IF lt_item IS INITIAL.
    SELECT * INTO TABLE lt_item
      FROM zorit
     WHERE vbeln = lw_head-vbeln.
  ENDIF.
  lo_item_node = lo_head_selected_element->get_child_node( name = 'ITEM' ).
  lo_item_node->bind_table( new_items = lt_item ).
ENDMETHOD.
```
- ITEM 테이블이 보이기 시작하면 호출되는 메서드
- HEAD 테이블의 레코드가 선택되면 호출된다.
- 선택된 HEAD를 불러다 ITEM을 CBO테이블에서 SELECT하여 NODE에 바인딩한다.


# 부모노드와 자식노드의 Supply Function 호출 관계
#### 부모노드의 레코드를 선택하면, 노드 입장에서는 해당 레코드에 속해있는 자식노드가 Focusing 된다. 이는 곧, 자식노드의 Supply Function을 Trigger하기 때문에, 헤더선택->상세내역 조회 식으로 프로그래밍이 가능하다.

{% include adsense.html %}