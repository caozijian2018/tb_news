<template>
  <div>
    <el-select v-model="execute_timezone" placeholder="Please select">
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
        this.execute_timezone = v
      }
    },
    data() {
      return {
        execute_timezone: this.getData,
        selectList: [
          {
            name: "0",
            id: "0"
          },
          {
            name: "8",
            id: "8"
          }
        ]
      }
    },
    methods: {
      changeID(id) {
        this.$emit("changeExecute_Timezone", {value: id})
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
