import { commonAPI } from '@/api/api'
import helper from '../helper'

const exports = {}

exports.getTournamentList = async () => {
  return commonAPI.get('tournament/list', {
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
