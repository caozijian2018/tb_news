<template>
  <div>
    <el-select v-model="value" placeholder="Please select" filterable>
      <el-option v-for="item in selectList" :key="item.name" :label="item.name" :value="item.id"
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
        value: undefined,
        selectList: [
          {
            name: "All",
            id: undefined
          },{
            name: "Wait",
            id: 0
          },{
            name: "Start",
            id: 1
          },{
            name: "Complete",
            id: 2
          },{
            name: "Success",
            id: 3
          }
        ],
        app_id: null
      }
    },
    methods: {
      changeID(id) {
        this.$emit("changeIS_complate", {id: this.value})
      },
      clearFun(){
        this.value = null;
        this.$emit("changeIS_complate", {id: this.value})
      }
    },
    mounted() {
    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
