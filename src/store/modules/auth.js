import AuthLogic from '../../logic/auth'
import jwt from 'jsonwebtoken'

const user = localStorage.getItem('user-token')

const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

export default {
  namespaced: true,
  state: initialState,
  actions: {
    login ({ dispatch, commit }, userdata) {
      return AuthLogic.authUser(userdata).then(
        user => {
          console.log(user)
          commit('loginSuccess', user)
          return Promise.resolve(user)
        },
        error => {
          return Promise.reject(error)
        },
      )
    },
    logout ({ commit }) {
      AuthLogic.doLogout()
      commit('logoutSuccess')
    },
  },
  mutations: {
    loginSuccess (state) {
      console.log(state)
      state.status.loggedIn = true
      const decodedUser = jwt.decode(state)
      console.log(decodedUser)
      state.user = decodedUser
    },
    logoutSuccess (state) {
      state.status.loggedIn = false
      state.user = null
    },
  },
}
