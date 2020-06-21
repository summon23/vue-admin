
import { commonAPI } from '@/api/api'
import jwt from 'jsonwebtoken'

const exports = {}

exports.validateToken = (token) => {
  const dateNow = new Date()
  const decodedToken = jwt.decode(token)
  if (decodedToken.exp < dateNow.getTime() / 1000) return false
  return true
}

exports.authUser = async (userdata) => {
  const { username, password } = userdata
  return commonAPI.post('/user/login', { username, password })
    .then(response => {
      if (response.status === 200) {
        localStorage.setItem('user-token', response.data.token)
      }
      console.log(response)
      console.log(response.data.token)
      return response.data.token
    })
}

exports.authHeader = () => {
  const userToken = localStorage.getItem('user-token')
  if (!userToken) return {}
  console.log('SSSS')
  console.log(userToken)
  return {
    'x-access-token': userToken,
  }
}

exports.doLogout = () => {
  localStorage.removeItem('user-token')
}

export default exports
