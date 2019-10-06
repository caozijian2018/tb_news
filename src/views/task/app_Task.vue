<template>
  <div class="app-container">
    <div class="margin_top_10">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item,index) in crumb" @click.native="clickCrunmb(item)" :key="index">
          {{item.name}}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <appTask v-if="showCrumb === 'App'" @goDetail="goDetail"></appTask>
    <scheduleTask :appId="appId" v-else-if="showCrumb === 'Schedule'" @goDetail="goDetail"></scheduleTask>
    <scriptTask :scheduleId="scheduleId" v-else-if="showCrumb === 'Script'" @goDetail="goDetail"></scriptTask>
  </div>
</template>

<script>
  import appTask from '../component/task/appTask'
  import scheduleTask from '../component/task/scheduleTask'
  import scriptTask from '../component/task/scriptTask'
  import task from '../component/task/task'

  export default {
    components: {
      appTask,
      scheduleTask,
      scriptTask,
      task
    },
    props: [],
    data() {
      return {
        crumb: [
          {
            name: "App",
            id: ""
          }
        ],
        showCrumb: "App",
        appId: null,
        scheduleId: null,
        scriptId: null,
      }
    },
    methods: {
      clickCrunmb(v) {
        if (v.name === "App") {
         this.crumb.splice(1,this.crumb.length-1);
          this.showCrumb = "App"
        }else if (v.name === "Schedule") {
          this.crumb.splice(2,this.crumb.length-1);
          this.showCrumb = "Schedule"
        }else if (v.name === "Script") {
          this.crumb.splice(3,this.crumb.length-1);
          this.showCrumb = "Script"
        }
      },
      goDetail(v) {
        console.log(v);
        this.crumb.push({
          name: v.name,
          id: v.data
        });
        this.showCrumb = v.name;
        if(this.showCrumb === "Schedule"){
          this.appId = v.data;
          localStorage.appId = v.data
          console.log(localStorage.appId,0)
        }else if(this.showCrumb === "Script"){
          this.scheduleId = v.data;
          localStorage.scheduleId = v.data
        }else if(this.showCrumb === "Task"){
          this.scriptId = v.data;
          localStorage.scriptId = v.data
        }
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
