<template>
  <div class="dashboard-editor-container">
    <div class=" clearfix">
      <div class="">
        <!-- <span class="display_name">{{name}}</span> -->
        <!--<span style="font-size:22px;display:inline-block;">editor : {{roles_type}}</span>-->
        <span style="font-size:22px;display:inline-block;">editor : Master</span>
      </div>
    </div>
    <div>
      <img class="emptyGif" :src="emptyGif">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import PanThumb from '@/components/PanThumb'
import GithubCorner from '@/components/GithubCorner'

export default {
  name: 'dashboard-editor',
  components: { PanThumb, GithubCorner },
  data() {
    return {
      emptyGif: 'https://wpimg.wallstcn.com/0e03b7da-db9e-4819-ba10-9016ddfdaed3',
      roles_type: "SP"
    }
  },
  mounted() {
    let sp_user_type = localStorage.sp_user_type;
    if(sp_user_type == 0){
      this.roles_type = "CP"
    }else if(sp_user_type == 1){
      this.roles_type = "SP"
    }else if(sp_user_type == 2){
      this.roles_type = "DSP"
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar',
      'roles'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .emptyGif {
    display: block;
    width: 45%;
    margin: 0 auto;
  }

  .dashboard-editor-container {
    background-color: #e3e3e3;
    min-height: 100vh;
    padding: 50px 60px 0px;
    .pan-info-roles {
      font-size: 12px;
      font-weight: 700;
      color: #333;
      display: block;
    }
    .info-container {
      position: relative;
      margin-left: 190px;
      height: 150px;
      line-height: 200px;
      .display_name {
        font-size: 48px;
        line-height: 48px;
        color: #212121;
        position: absolute;
        top: 25px;
      }
    }
  }
</style>
