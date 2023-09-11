const initialState = {
  loggedIn: false,
  name: "Sergio Esteban Torres"
}

export function userReducer(state=initialState, action) {
  switch(action.type) {
    case NAME_CHANGED:
      return {
        ...state,
        name: action.payload
      }
    default: 
      return state
  }
}

//SELECTORS

export const getName = (state) => state.user.name
export const getLoggedIn = (state) => state.user.loggedIn

// ACTION TYPES

export const NAME_CHANGED = 'user/name'

// ACTION CREATORS
