<template>
  <div>
    <el-select v-model="value" placeholder="Please select" filterable>
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
        selectList: []
      }
    },
    methods: {
      changeID(id) {
        this.$emit("changeCountry", {id: this.value})
      },
      getList() {
        this.$request_any("country/", "get").then(res => {
          this.selectList = res;
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
