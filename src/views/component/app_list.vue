<template>
  <div>
    <el-select clearable v-model="value" @clear="clearFun" placeholder="Please select" filterable>
      <el-option v-for="item in selectList" :key="item.id" :label="item.name" :value="item.id"
                 @click.native="changeID(item.id)">
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    components: {},
    props: ["getData"],
    watch: {
      getData: function (v) {
        this.value = v
      }
    },
    data() {
      return {
        value: null,
        selectList: [],
        app_id: null
      }
    },
    methods: {
      changeID(id) {
        this.$emit("changeApp_list", {id: this.value})
      },
      clearFun(){
        this.value = null;
        this.$emit("changeApp_list", {id: this.value})
      },
      getList(v) {
        this.$request_any("app/", "get", {
          page: 1,
          capacity: 999
        }).then(res => {
          this.selectList = res.results
        });
      }
    },
    mounted() {
      // this.app_id = localStorage.appId;
      this.getList();
    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
