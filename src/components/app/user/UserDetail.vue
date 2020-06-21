<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs6">
        <va-card title="User Detail">
          <form>
            <br>
            <div class="row">
              <va-input
                v-model="userForm.username"
                type="text"
                label="User name"
                name="username"/>
            </div>

            <div class="row">
              <va-input
                v-model="userForm.first_name"
                type="text"
                label="First Name"
                name="first_name"/>
            </div>

            <div class="row">
              <va-input
                v-model="userForm.last_name"
                type="text"
                label="Last Name"
                name="last_name"/>
            </div>

            <div class="row">
              <va-input
                v-model="userForm.email"
                type="email"
                label="Email Address"
                name="email"/>
            </div>

            <template v-if="!isReadOnly">
              <div class="row">
                <va-input
                  v-model="userForm.password"
                  type="password"
                  label="Password"
                  name="password"/>
              </div>

              <div class="row">
                <va-input
                  v-model="userForm.confirm_password"
                  type="password"
                  label="Confirm Password"
                  name="confirm_password"/>
              </div>
            </template>
          </form>

          <div class="card-bottom">
            <va-button color="gray" @click="$router.push('/app/user')"> Back </va-button>
            <va-button v-if="isReadOnly" color="warning" @click="updateUserForm"> Update </va-button>
            <va-button v-else color="info" @click="submitForm"> Submit </va-button>
          </div>
        </va-card>
      </div>
    </div>
  </div>
</template>

<script>
// import { commonAPI } from '@/api/api'
import userService from '../../../logic/user'

export default {
  name: 'UserDetail',
  data () {
    return {
      isReadOnly: true,
      userForm: {
        id: '',
        username: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: '',
      },
    }
  },
  methods: {
    validateForm (e) {
      return true
    },
    submitForm (e) {
      e.preventDefault()

      if (!this.validateForm()) {
        alert('Data not Valid')
        return false
      }

      return userService.updateUserData(this.userForm)
        .then(response => {
          console.log(response)
          this.$router.push('/app/user')
        })
        .catch(err => {
          console.log(err)
        })
    },
    updateUserForm () {
      this.isReadOnly = false
      return false
    },
    getUserData (userId) {
      return userService.getUserDetail(userId)
        .then(res => {
          this.userForm = res.data
          this.userForm.password = ''
          this.userForm.confirm_password = ''
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted () {
    console.log(this.$route.params)
    this.getUserData(this.$route.params.id)
  },
}
</script>

<style scoped>

</style>
