<template>
  <div class="dashboard-container">
    <!-- <component :is="currentRole"></component> -->
    <!-- <admin-dashboard></admin-dashboard> -->
    <creat-user :show-trak-page="is_show" @ShowDiv="ShowDiv"></creat-user>
    <button @click="is_show=true">asdad</button>
  </div>
</template>

<script>

import creatUser from "../../components/creat_user"
export default {
  name: 'dashboard',
  data(){
    return{
      is_show:false,
    }
  },
  methods:{
    ShowDiv(res){
      console.log(res);
      this.is_show=res;
    }
  },
  components:{
    creatUser,
  }
}
</script>
