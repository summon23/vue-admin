<template>
  <va-card title="Tournament Management">
    <div class="row align--center">
      <div class="flex xs12 md12">
        <!-- <router-link :to="{name: 'new-usermanagent'}">
          <va-button class="ma-0 mb-2 mt-1" small>Add New User</va-button>
        </router-link> -->
      </div>

      <div class="flex xs12 md6">
        <va-input
          placeholder="Search by Tournament Date"
          removable
        >
          <va-icon name="fa fa-search" slot="prepend" />
        </va-input>
      </div>
    </div>

    <va-data-table
      :fields="fields"
      :data="rowGridData"
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

        <!-- <va-popover message="Delete" placement="top">
          <va-button flat small color="gray" icon="fa fa-trash" @click="deleteForm(props.rowData)"/>
        </va-popover> -->
      </template>
    </va-data-table>
  </va-card>
</template>

<script>
import authLogic from '../../../logic/auth'
import { commonAPI } from '@/api/api'

export default {
  name: 'TournamentManagementGrid',
  data () {
    return {
      perPage: 2,
      totalPages: 3,
      rowGridData: [],
      loading: false,
    }
  },
  computed: {
    fields () {
      return [{
        name: 'name',
        title: 'Event Name',
        sortField: 'name',
        width: '20%',
      }, {
        name: 'class',
        title: 'Class',
        sortField: 'class',
        width: '20%',
      }, {
        name: 'channel_id',
        title: 'Channel',
        sortField: 'channel',
        width: '20%',
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

      commonAPI.get('tournament/list', {
        params,
        headers: authLogic.authHeader(),
      })
        .then(response => {
          console.log(response.data)
          const rawData = response.data
          this.rowGridData = rawData.data
          this.totalPages = rawData.total_pages
          this.loading = false
        })
    },
    updateForm (rowData) {
      console.log(rowData)
      this.$router.push(`/app/tournament/${rowData.id}`)
    },
    deleteForm (rowData) {
      console.log(rowData)
    },
  },
  created () {
    this.getRawData()
  },
}
</script>

<style scoped>

</style>
