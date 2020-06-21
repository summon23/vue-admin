<template>
  <div class="login-form">
    <va-notification :closeable="true" v-model="successMsgFlg">
      <va-badge>
        Success
      </va-badge>
      {{successMsg}}
    </va-notification>

    <va-notification color="danger" :closeable="true" v-model="errorMsgFlg">
      <va-badge color="danger">!
      </va-badge>
      {{errorMsg}}
    </va-notification>

    <br>

    <form @submit.prevent="onsubmit">
      <va-input
        v-model="username"
        name="input-username"
        type="text"
        placeholder="Input Username"
        :label="$t('auth.email')"
        :error="!!emailErrors.length"
        :error-messages="emailErrors"
      />

      <va-input
        v-model="password"
        name="input-password"
        type="password"
        placeholder="Input Password"
        :label="$t('auth.password')"
        :error="!!passwordErrors.length"
        :error-messages="passwordErrors"
      />

      <span class="errormsg">{{message}}</span>

      <div class="auth-layout__options d-flex align--center justify--space-between">
        <va-checkbox v-model="keepLoggedIn" class="mb-0" :label="$t('auth.keep_logged_in')"/>
        <router-link class="ml-1 link" :to="{name: 'recover-password'}">{{$t('auth.recover_password')}}</router-link>
      </div>

      <div class="d-flex justify--center mt-3">
        <va-button type="submit" class="my-0">{{ $t('auth.login') }}</va-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      message: '',
      keepLoggedIn: false,
      emailErrors: [],
      passwordErrors: [],
      successMsgFlg: true,
      successMsg: 'Login Success',
      errorMsgFlg: true,
      errorMsg: 'Your session is expired, Please login again',
    }
  },
  computed: {
    formReady () {
      return !this.emailErrors.length && !this.passwordErrors.length
    },
  },
  methods: {
    onsubmit () {
      this.emailErrors = this.username ? [] : ['Email is required']
      this.passwordErrors = this.password ? [] : ['Password is required']
      if (!this.formReady) {
        return
      }
      const { username, password } = this
      this.$store.dispatch('auth/login', { username, password })
        .then((res) => {
          console.log('login success')
          console.log(res)
          this.$router.push({ name: 'dashboard' })
        }, err => {
          console.log(err)
          this.message = 'Username atau Password Salah'
        })
      // this.$router.push({ name: 'dashboard' })
    },
  },
}
</script>

<style scoped>
  .errormsg {
    color: red;
  }
</style>
