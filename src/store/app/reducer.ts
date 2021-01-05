import { CHANGE_THEME_COLOR, Action } from './actions'

const initState = {
  loadingTime: 2.5, // 초단위
  themeColor: '#000',
}

export const appReducer = (state: typeof initState = initState, { type, payload }: Action): typeof initState => {
  switch (type) {
    case CHANGE_THEME_COLOR:
      return {
        ...state,
        themeColor: payload,
      }
    default:
      console.error('invalid Action Type')
      return state
  }
}
