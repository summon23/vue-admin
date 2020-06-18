<template>
  <va-card title="Data Report">
    <router-link :to="{name: 'newdata'}">
      <va-button class="ma-0 mb-2 mt-1" small>Add New Data</va-button>
    </router-link>

    <va-data-table
      :fields="fields"
      :data="users"
      :per-page="5"
      no-data-label="Report Empty"
    >
      <template slot="actions" slot-scope="props">
        <va-popover :message="getStarMessage(props.rowData)" placement="top">
          <va-button
            flat small
            :color="getStarColor(props.rowData)"
            icon="fa fa-eye"
            @click="star(props.rowData)"
          />
        </va-popover>

        <va-popover :message="`${$t('tables.edit')} ${props.rowData.first_name}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-pencil" />
        </va-popover>

        <va-popover :message="`${$t('tables.delete')} ${props.rowData.first_name}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-trash" />
        </va-popover>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
// import users from '../../data/users.json'
import authLogic from '../../logic/auth'
import { commonAPI } from '@/api/api'

export default {
  name: 'TableReport',
  data () {
    return {
      users: [],
    }
  },
  computed: {
    fields () {
      return [{
        name: 'username',
        title: this.$t('tables.headings.name'),
        sortField: 'username',
        width: '25%',
      }, {
        name: 'first_name',
        title: this.$t('tables.headings.email'),
        width: '30%',
      }, {
        name: 'last_name',
        title: this.$t('tables.headings.country'),
        sortField: 'last_name',
        width: '25%',
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
  },
  methods: {
    getStarMessage (user) {
      const actionName = user.id ? this.$t('tables.unstar') : this.$t('tables.star')
      return `${actionName} ${user.last_name}`
    },
    getStarColor (user) {
      return user.id ? 'primary' : 'gray'
    },
    star ({ id }) {
      const i = this.users.findIndex(user => user.id === id)
      this.users[i].id = !this.users[i].id
    },
    getRawData () {
      commonAPI.get('user/list', {
        headers: authLogic.authHeader(),
      })
        .then(response => {
          console.log(response.data)
          const rawData = response.data
          this.users = rawData.data
        })
    },
  },
  created () {
    this.getRawData()
  },
}
</script>

<style lang="stylus" scoped>

</style>
