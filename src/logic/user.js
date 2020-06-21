import { commonAPI } from '@/api/api'
import helper from '../helper'

const exports = {}

exports.getUserList = async () => {
  return commonAPI.get('user/list', {
    headers: helper.apiHeader(),
  })
    .then(response => {
      return response.data
    })
    .catch(() => {
      return null
    })
}

exports.getUserDetail = async (userId) => {
  console.log(userId)
  return commonAPI.get(`user/detail/${userId}`, {
    headers: helper.apiHeader(),
  })
    .then(response => {
      return response.data
    })
    .catch(err => {
      console.log(err)
      return err
    })
}

exports.updateUserData = async (userData) => {
  const { id } = userData
  return commonAPI.put(`user/update/${id}`, userData, {
    headers: helper.apiHeader(),
  })
    .then(response => {
      return response.data
    })
    .catch(() => {
      return null
    })
}

exports.createUser = async (userData) => {
  return commonAPI.post('user/register', userData, {
    headers: helper.apiHeader(),
  })
    .then(response => {
      return response.data
    })
    .catch(() => {
      return null
    })
}

exports.deleteUser = async (userId) => {
  return commonAPI.delete(`user/delete/${userId}`, {}, {
    headers: helper.apiHeader(),
  })
    .then(response => {
      return response.data
    })
    .catch(() => {
      return null
    })
}

export default exports
