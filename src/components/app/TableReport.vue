<template>
  <va-card title="Data Report">
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

        <va-popover :message="`${$t('tables.edit')} ${props.rowData.fullName}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-pencil" />
        </va-popover>

        <va-popover :message="`${$t('tables.delete')} ${props.rowData.fullName}`" placement="top">
          <va-button flat small color="gray" icon="fa fa-trash" />
        </va-popover>
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import users from '../../data/users.json'
import { commonAPIInstance } from '@/api/api'

export default {
  data () {
    return {
      users: users.slice(0, 6),
    }
  },
  computed: {
    fields () {
      return [{
        name: 'title',
        title: this.$t('tables.headings.name'),
        sortField: 'fullName',
        width: '25%',
      }, {
        name: 'body',
        title: this.$t('tables.headings.email'),
        width: '30%',
      }, {
        name: 'id',
        title: this.$t('tables.headings.country'),
        sortField: 'country',
        width: '25%',
      }, {
        name: '__slot:actions',
        dataClass: 'text-right',
      }]
    },
  },
  methods: {
    getStarMessage (user) {
      const actionName = user.starred ? this.$t('tables.unstar') : this.$t('tables.star')
      return `${actionName} ${user.fullName}`
    },
    getStarColor (user) {
      return user.starred ? 'primary' : 'gray'
    },
    star ({ id }) {
      const i = this.users.findIndex(user => user.id === id)
      this.users[i].starred = !this.users[i].starred
    },
    getRawData () {
      commonAPIInstance.get('posts')
        .then(response => {
          console.log(response.data)
          const rawData = response.data
          this.users = rawData
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
