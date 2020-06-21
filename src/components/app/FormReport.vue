<template>
  <div class="form-elements">
    <div class="row">
      <form
        @submit="submitForm">
        <label>Report Name</label>
        <va-input
          v-model="reportName"
          type="text"
          name="report_name"/>
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import { commonAPI } from '@/api/api'

export default {
  name: 'FormReport',
  data () {
    return {
      reportName: '',
    }
  },
  methods: {
    validateForm (e) {
      if (this.reportName === '') return false
      return true
    },
    submitForm (e) {
      e.preventDefault()

      if (!this.validateForm()) {
        alert('data not valid')
        return false
      }

      commonAPI.post('posts', {
        title: 'dummypost',
        body: this.reportName,
        userId: 1122,
      }, {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      }).then(res => {
        console.log(res)
        this.reportName = ''
      }).catch(err => {
        console.log(err)
      })
      console.log(this.reportName)
    },
  },
}
</script>

<style lang="stylus" scoped>

</style>
