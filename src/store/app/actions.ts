/**
 * Action Structure
 */
export interface Action {
  type: string
  payload: ChangeThemeColorPayload // Composing Type. 액션이 늘어날 때마다  | 으로 추가하면 됨
}
type ChangeThemeColorPayload = string

/**
 * 액션 상수 (enum 으로 할까? 나중에 다시 생각해보자.)
 */
export const CHANGE_THEME_COLOR = '현재 테마 컬러 변경(컬러 체인지 애니메이션에 사용됨)'

/**
 * 액션 크리에이터 함수
 */
export const changeThemeColor = (color: string): Action => {
  return {
    type: CHANGE_THEME_COLOR,
    payload: color,
  }
}
