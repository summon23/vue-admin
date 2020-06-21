<template>
  <va-card title="User Management">
    <div class="row align--center">
      <div class="flex xs12 md12">
        <router-link :to="{name: 'new-usermanagent'}">
          <va-button class="ma-0 mb-2 mt-1" small>Add New User</va-button>
        </router-link>
      </div>

      <div class="flex xs12 md6">
        <va-input
          placeholder="Search by Email Address or Username"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="usersGridData"
      :loading="loading"
      :totalPages="totalPages"
      api-mode
      @page-selected="getRawData"
      :per-page="5"
      no-data-label="User Empty"
    >
      <template slot="actions" slot-scope="props">
        <va-popover message="View" placement="top">
          <va-button flat small color="gray" icon="fa fa-eye" @click="updateForm(props.rowData)"/>
        </va-popover>

        <va-popover message="Delete" placement="top">
          <va-button flat small color="gray" icon="fa fa-trash" @click="deleteForm(props.rowData)"/>
        </va-popover>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import authLogic from '../../../logic/auth'
import { commonAPI } from '@/api/api'

export default {
  name: 'UserManagementGrid',
  data () {
    return {
      perPage: 2,
      totalPages: 3,
      usersGridData: [],
      loading: false,
    }
  },
  computed: {
    fields () {
      return [{
        name: 'username',
        title: 'Username',
        sortField: 'username',
        width: '20%',
      }, {
        name: 'first_name',
        title: 'Firstname',
        sortField: 'first_name',
        width: '20%',
      }, {
        name: 'last_name',
        title: 'Lastname',
        sortField: 'last_name',
        width: '20%',
      }, {
        name: 'email',
        title: 'Email',
        sortField: 'Email',
        width: '25%',
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
  },
  methods: {
    getRawData (page = 1) {
      this.loading = true

      const params = {
        limit: this.perPage,
        page,
      }

      commonAPI.get('user/list', {
        params,
        headers: authLogic.authHeader(),
      })
        .then(response => {
          console.log(response.data)
          const rawData = response.data
          this.usersGridData = rawData.data
          this.totalPages = rawData.total_pages
          this.loading = false
        })
    },
    updateForm (userData) {
      console.log(userData)
      this.$router.push(`/app/user/${userData.id}`)
    },
    deleteForm (userData) {
      console.log(userData)
    },
  },
  created () {
    this.getRawData()
  },
}
</script>

<style scoped>

</style>
