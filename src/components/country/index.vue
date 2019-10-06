<template>
  <div>
    <el-select filterable v-model='country_id_' clearable class="width_100">
      <el-option v-for="item in country_list" :key="item.code" :label="item.code" :value="item.code">
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  props: {
    countryId: {
      type: ''
    }
  },
  computed: {
    country_id_: {
      get() {
        return this.countryId
      },
      set(val) {
        this.$emit('countryChange', val)
      }
    }
  },
  data() {
    return {
      country_list: [],
      country_id: ''
    }
  },
  mounted() {
    this.getCountry()
  },
  methods: {
    getCountry() {
      this.$request_any('country', 'get', { 
        page: 1, 
        capacity: 300,
        is_all: false
      }).then(
        res => {
          // res.data.unshift({code:"please select keyword",id:null})
          this.country_list = res.data.results
        }
      )
    }
  }
}
</script>
