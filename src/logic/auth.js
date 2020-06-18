
import { commonAPI } from '@/api/api'

const exports = {}

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
