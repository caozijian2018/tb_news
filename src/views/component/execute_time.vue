<template>
  <div>
    <el-date-picker
      v-model="value"
      value-format="yyyy-MM-dd HH:mm:ss"
      type="datetime"
      placeholder="选择日期时间"
      @change="changeTime">
    </el-date-picker>
  </div>
</template>

<script>
  export default {
    components: {},
    props: ["getData"],
    watch: {
      'getData': {
        handler: function (v) {
          // this.value = ""
        },
        deep: true
      }
    },
    data() {
      return {
        value: ""
      }
    },
    methods: {
      changeTime() {
        console.log(this.value)
        this.$emit("changeExecute_time", {value: this.value})
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
