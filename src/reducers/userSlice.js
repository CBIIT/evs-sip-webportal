import { baseServer } from '../api'
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  currentUser: {},
}

export function fetchUser() {
  return async function (dispatch) {
    try {
      const response = await fetch(`${baseServer}/auth/session`)
      const value = await response.json()
      dispatch(setUser(value))
    } catch (e) {
      dispatch(setUser({ error: String(e) }))
    }
  }
}

export function updateUserSession() {
  return async function (dispatch) {
    try {
      const response = await fetch(`${baseServer}/auth/update-session`)
      const value = await response.json()
      dispatch(setUser(value))
    } catch (e) {
      dispatch(setUser({ error: String(e) }))
    }
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.currentUser = action.payload
    },
    resetUser: (state, action) => {
      state.currentUser = {}
    },
  },
})

const { setUser, resetUser } = userSlice.actions

export default userSlice.reducer
