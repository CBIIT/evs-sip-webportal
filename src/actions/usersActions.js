const userAdded = (user) => ({ type: 'users/userAdded', payload: user })

const changedStatus = (userId) => ({
  type: 'users/changedStatus',
  payload: userId,
})

const usersLoaded = (users) => ({
  type: 'users/usersLoaded',
  payload: users,
})

const usersActions = {
  userAdded,
  changedStatus,
  usersLoaded,
}

export default usersActions
