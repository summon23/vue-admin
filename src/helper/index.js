
const exports = {}

exports.apiHeader = () => {
  const userToken = localStorage.getItem('user-token') || ''
  return {
    'x-access-token': userToken,
  }
}

export default exports
