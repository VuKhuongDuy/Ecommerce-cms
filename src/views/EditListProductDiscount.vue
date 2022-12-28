<template>
  <div class="col-xl-12">
    <div class="form-group mb-3">
      <label class="form-label" for="phone">Các filters</label>
      <div v-for="(filter, index) in filters" :key="index">
        <div class="form-group mb-3">
          <table>
            <tr>
              <td>Tên filters</td>
              <td>
                <input v-model="filter.name" type="text" class="form-control" id="username" placeholder="Giá trị">
              </td>
            </tr>
            <tr>
              <td>
                Danh sách
              </td>
              <td>
                <input v-model="filter.value[jndex]" type="text" class="form-control" id="username"
                  placeholder="Giá trị" v-for="(text, jndex) in filter.value" :key="jndex"
                  @input="(event) => addOrDelTextFilter(event, index, jndex)">
              </td>
            </tr>
            <tr>
              <td colspan="2">
                <div style="width: 100%">
                  <button type="button" class="btn btn-default" style="width: 100%" @click="addFilters">+</button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
  <button type="button" data-bs-dismiss="modal" class="btn btn-primary pr-2"
    @click="(event) => saveParentFilter(event, filters)">Save</button>
  <!-- toasts-container props-->
</template>
<script>
import * as lodash from "lodash"

const DefaultFilter = {
  name: "Tên filter",
  value: ["Giá trị 1"]
}

export default {
  props: {
    filtersList: []
  },
  data() {
    return {
      filters: [],
    }
  },
  mounted() {
    this.filters = lodash.cloneDeep(this.filtersList.map(filter => {
      if (Array.isArray(filter.value))
        filter.value.push("")
      else
        filter.value = [filter.value, ""]
      return filter
    }))
  },
  methods: {
    addOrDelTextFilter(event, index, jindex) {
      const text = event.target.value
      if (!text && this.filters[index].value.length > 2) {
        this.filters[index].value.splice(jindex, 1)
      }

      const lengthNotNull = this.filters[index].value.filter(t => t).length
      if (lengthNotNull === this.filters[index].value.length) {
        this.filters[index].value.push("")
      }

    },
    addFilters() {
      this.filters.push(lodash.cloneDeep(DefaultFilter))
    },
    saveParentFilter(event, filters) {
      this.$emit('saveParentFilter', lodash.cloneDeep(this.filters));

    }
  }
}
</script>
<style scoped>
.form-create {
  max-width: 50%;
}
</style>