<template>
  <div>
    <el-select v-model="value" placeholder="Please select">
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
        value: this.getData,
        selectList: [
          {
            name: "IOS",
            id: 1
          },
          {
            name: "Android",
            id: 0
          }
        ]
      }
    },
    methods: {
      changeID(id) {
        this.$emit("changePlatform", {id: this.value})
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
