<template>
  <div>
    <el-select v-model="value" placeholder="Please select">
      <el-option v-for="item in selectList" :key="item.id" :label="item.mac" :value="item.id"
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
      'getData': {
        handler: function (v) {
          this.value = v
        },
        deep: true
      }
    },
    data() {
      return {
        value: null,
        selectList: []
      }
    },
    methods: {
      changeID(id) {
        this.$emit("changeSlave", {id: this.value})
      },
      getList() {
        this.$request_any("slave/", "get", {page: 1, capacity: 1000}).then(res => {
          console.log(res);
          this.selectList = res.results;
        });
      }
    },
    mounted() {
      this.getList()
    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
