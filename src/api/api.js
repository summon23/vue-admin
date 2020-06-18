import axios from 'axios'

const jsonPlaceholderAPI = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

const commonAPI = axios.create({
  baseURL: 'http://localhost:8888',
})

export {
  jsonPlaceholderAPI,
  commonAPI,
}
