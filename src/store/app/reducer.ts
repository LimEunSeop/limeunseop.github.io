import { CHANGE_THEME, Action } from './actions'

const initState: { loadingTime: number; theme: string | null } = {
  loadingTime: 2.5, // 초단위
  theme: null,
}

export const appReducer = (state: typeof initState = initState, { type, payload }: Action): typeof initState => {
  switch (type) {
    case CHANGE_THEME:
      return {
        ...state,
        theme: payload,
      }
    default:
      console.error('invalid Action Type')
      return state
  }
}
