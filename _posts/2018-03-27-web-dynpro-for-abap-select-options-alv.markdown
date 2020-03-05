---
title: "Web Dynpro For ABAP - Select Options & ALV"
date: "2018-03-27 19:50"
categories:
    - SAP
tags:
    - Web Dynpro for ABAP
---

{% include adsense.html %}

### 프로그램
항공기 운항 조회 프로그램

### 실행 화면
![1-0. 실행 화면](https://user-images.githubusercontent.com/34618693/37965573-78a44c66-3200-11e8-9d09-107ead100354.PNG)
- 항공사와 연결번호를 입력하면, 해당 비행편의 요금, 항공기종, 예약석, 정원을 출력해준다.
- Selection Screen을 통해 항공사를 검색하면, ALV를 통해 비행편의 정보가 출력된다.
- 항공사의 디폴트 입력값은 AC로 한다.

### 구성
#### 컴포넌트 정보
![1-1. 컴포넌트 정보](https://user-images.githubusercontent.com/34618693/37964278-e3c94dca-31fb-11e8-937b-e6cf4617b02b.PNG)
- Web Dynpro Explorer에서 맨 위에 있는 애플리케이션 이름을 더블클릭하면 보이는 창이다.
- 이 곳에서 프로그램에서 사용할 Component를 위 스크린샷과 같이 추가한다.
- Component는 SAP에서 미리 만들어진 것일 수도 있고, 사용자가 새로 만든 것일 수도 있다(프로그램 만들때 Component Interface 선택).

#### Component controller의 Context 정보
![1-2. Component controller의 Context 정보](https://user-images.githubusercontent.com/34618693/37964527-cda067d0-31fc-11e8-80d5-fe8cd10b687d.PNG)
- ALV는 Component Controller에 정의돼 있는 전역전인 노드만을 참조한다.
- 뷰의 Context는 참조하지 않는다.

#### MAIN 뷰의 Properties
![1-3. Main 뷰의 Properties](https://user-images.githubusercontent.com/34618693/37965408-fd0a4e34-31ff-11e8-942f-4a3c0e66b718.PNG)
- Component Controller에서 사용하기로 한 컴포넌트를, 사용할 뷰의 Properties 탭 안에서 기술해준다.
- ALV와 Select Option을 사용할 것이기 때문에 이 둘 컴포넌트를 넣어준다.

#### MAIN 뷰의 layout
![1-4. MAIN 뷰의 Layout](https://user-images.githubusercontent.com/34618693/37965473-2f4bb36a-3200-11e8-9ec4-255c03079cac.PNG)
- 맨 위의 실행화면과 같이 배치한다.
- 컴포넌트가 들어갈 부분 레이아웃은 ViewContainerUIElement로 한다.

#### MAIN 뷰의 Context
![1-5. MAIN 뷰의 Context](https://user-images.githubusercontent.com/34618693/37965809-4f5bbc94-3201-11e8-841b-c25559bd30fb.PNG)
- MAIN 뷰의 메서드 에서 LIST 노드 타입의 인터널 테이블을 만들어서 데이터을 읽는다.
- 이 때 wd_this->elements_list 라는 타입이 필요한데, 그러기 위해선 뷰에 LIST 노드가 정의돼 있어야 한다.
- Component Controller의 Context에 있는 LIST 노드와 맵핑하도록 한다.

#### MAIN 뷰의 Attributes
![1-6. MAIN 뷰의 Attributes](https://user-images.githubusercontent.com/34618693/38001505-14fd5c26-3268-11e8-902c-ea6636564c9c.PNG)
- 원래 있던 속성에 추가하여 m_handler, m_wd_select_options을 추가한다.
- m_wd_select_options은 selection screen의 컴포넌트 인터페이스를 의미한다.
- m_handler는 selection screen의 필드 추가 등의 처리를 의미한다.

{% include adsense.html %}

#### Window 구조
![1-7. Window 구조](https://user-images.githubusercontent.com/34618693/38001730-5950de06-3269-11e8-9dc5-28663a10b165.PNG)
- SELECT, ALV_VIEW 뷰에 각 컴포넌트를 임베드 한다.

#### ALV INTERFACECONTROLLER_USAGE의 CONTEXT
![1-8. ALV INTERFACECONTROLLER_USAGE의 CONTEXT](https://user-images.githubusercontent.com/34618693/38001846-146e5f24-326a-11e8-9445-8ebeb4bf14c8.png)
- 탐색기에서 컴포넌트 사용 - ALV - INTERFACECONTROLLER_USAGE에서 설정 할 수 있다.
- Component Controller의 LIST를 ALV DATA에 맵핑시켜줘야 한다.

#### MAIN 뷰의 WDDOINIT 메서드
```ruby
METHOD wddoinit .
  DATA : lt_range_table TYPE REF TO data,
         read_only TYPE abap_bool.
  DATA : lr_componentcontroller TYPE REF TO ig_componentcontroller,
         l_ref_cmp_usage TYPE REF TO if_wd_component_usage.
  DATA : rt_carrid TYPE RANGE OF s_carr_id,
         l_carrid  LIKE LINE OF rt_carrid.
  FIELD-SYMBOLS : <fs_carrid> TYPE table.

"Used Component 'SELECT_OPTIONS' 생성"
  l_ref_cmp_usage = wd_this->wd_cpuse_select_options( )..
  IF l_ref_cmp_usage->has_active_component( ) IS INITIAL.
    l_ref_cmp_usage->create_component( ).
  ENDIF.

"Attribute 'M_WD_SELECT_OPTIONS' 생성"
  wd_this->m_wd_select_options = wd_this->wd_cpifc_select_options( ).

"Selection Screen 생성"
  wd_this->m_handler = wd_this->m_wd_select_options->init_selection_screen( ).

"Select-Option 'S_CARR_ID'에 기본값 'AC' 지정"
  lt_range_table =
    wd_this->m_handler->create_range_table( i_typename = 'S_CARR_ID' ).
  ASSIGN lt_range_table->* TO <fs_carrid>.
  l_carrid-low    = 'AC'.
  l_carrid-sign   = 'I'.
  l_carrid-option = 'EQ'.
  APPEND l_carrid TO rt_carrid.
  CLEAR l_carrid.
  <fs_carrid> = rt_carrid.

"Select-Option Field 생성"
  wd_this->m_handler->add_selection_field(
              i_id = 'S_CARR_ID'
              it_result = lt_range_table
              i_read_only = read_only  ).

"2번째 Select-Option 추가"
  lt_range_table =
  wd_this->m_handler->create_range_table( i_typename = 'S_CONN_ID' ).

  wd_this->m_handler->add_selection_field(
             i_id = 'S_CONN_ID'
             it_result = lt_range_table
             i_read_only = read_only ).

"Selection screen 윗부분에 출력되는 4개의 Button 삭제"
  wd_this->m_handler->set_global_options(
      i_display_btn_cancel  = abap_false
      i_display_btn_check   = abap_false
      i_display_btn_reset   = abap_false
      i_display_btn_execute = abap_false ).
ENDMETHOD.
```
- Used Component를 생성하고, Component interface를 생성하여 m_wd_select_options에 저장한다.
- m_wd_select_options로 Selection Screen을 초기화한 후 그 리턴값을 m_handler에 저장한다.
- m_handler로 필드를 추가한다.
- 필드에 디폴트값을 넣어 줄려면, m_handler->add_selection_field를 호출할 때 들어가는 it_result 매개변수에, 값이 세팅된 range 테이블을 넣어준다.
- Selection Screen 윗부분의 4개의 불필요한 버튼을 삭제해 주려면, m_handler->set_global_options를 호출 해주면 된다.

#### 메인의 onactionselect_data 메서드(get버튼)
```ruby
METHOD onactionselect_data .
  DATA : node_list TYPE REF TO if_wd_context_node.
  DATA : rt_carrid TYPE REF TO data.
  DATA : rt_connid TYPE REF TO data.
  DATA : lt_list TYPE wd_this->elements_list.

  FIELD-SYMBOLS: <fs_carrid> TYPE table,
                 <fs_connid> TYPE table.

  rt_carrid = wd_this->m_handler->get_range_table_of_sel_field(
          i_id = 'S_CARR_ID' ).
  rt_connid = wd_this->m_handler->get_range_table_of_sel_field(
          i_id = 'S_CONN_ID' ).

  ASSIGN rt_carrid->* TO <fs_carrid>.
  ASSIGN rt_connid->* TO <fs_connid>.

  SELECT * INTO TABLE lt_list FROM sflight
   WHERE carrid IN <fs_carrid>
     AND connid IN <fs_connid>.

  node_list = wd_context->get_child_node( name = 'LIST' ).
  node_list->bind_table( lt_list ).
ENDMETHOD.
```
- get버튼을 클릭하여 이벤트가 실행되면, Selection Screen에 저장되어 있는 값을 m_handler->get_range_table_of_sel_field로 불러준다.
- 불러들어온 값을 LIST NODE에 바인딩 하면 된다.

{% include adsense.html %}