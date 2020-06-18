import axios from 'axios'

const commonAPIInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
})

export {
  commonAPIInstance,
}
