const initialState = {
  users: [],
}

// root reducer
export default function reducer(state = initialState, action = { type: null }) {
  switch (action.type) {
    case 'users/userAdded': {
      const user = action.payload
      return {
        ...state,
        [user.id]: user,
      }
    }

    case 'users/changedStatus': {
      const userId = action.payload
      const user = state[userId]
      return {
        ...state,
        [userId]: {
          ...user,
          active: user.active !== 'Y' ? 'Y' : 'N',
        },
      }
    }

    case 'users/todosLoaded': {
      const users = {}
      action.payload.forEach((user) => {
        users[user.id] = user
      })
      return {
        users,
      }
    }

    default:
      return state
  }
}
