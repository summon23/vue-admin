import axios from 'axios'

const jsonPlaceholderAPI = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

const commonAPI = axios.create({
  // baseURL: 'http://hilancode.com:8888',
  baseURL: 'http://127.0.0.1:8888',
})

export {
  jsonPlaceholderAPI,
  commonAPI,
}
