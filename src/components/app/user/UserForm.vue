<template>
  <div class="form-elements">
    <div class="row">
      <div class="flex xs6">
        <va-card title="Create User">
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

            <template>
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
            <va-button color="info" @click="submitForm"> Submit </va-button>
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
  name: 'UserForm',
  data () {
    return {
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

      const userPayload = this.userForm
      delete userPayload.id
      return userService.createUser(userPayload)
        .then(response => {
          console.log(response)
          this.$router.push('/app/user')
        })
        .catch(err => {
          console.log(err)
        })
    },
  },
  mounted () {
    // console.log(this.$route.params)
    // this.getUserData(this.$route.params.id)
  },
}
</script>

<style scoped>

</style>
