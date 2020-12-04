// styledComponent 에서도 함수를 사용하기 위해 만든 유틸들입니다.
// styles/configs.scss 에 수정사항이 발생할 경우 번거롭지만 여기도 수정해야 합니다.

const global_base_font_size: number = 16 // px 단위

export function rem(pixel: number): string {
  return pixel / global_base_font_size + 'rem'
}

export function em(pixel: number): string {
  return pixel / global_base_font_size + 'em'
}

const exports = {
  rem,
  em,
}

export default exports
