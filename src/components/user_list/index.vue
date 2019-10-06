<template>
    <div class="" id="rule_box">
        <change-password :show-change-div="showChangeDiv" :userid="userid" @closeChangeDiv="showChangeDiv=false"></change-password>
        <el-dialog :title="$t('table.user_list')" @open="open" class="" :visible.sync="showDiv">
            <el-table  :data="users" border v-loading="listLoading" style="width: 100%">
                <el-table-column align="center" label="id" type="index" >
                </el-table-column>
                <el-table-column align="center" prop="name" :label="$t('table.username')">
                </el-table-column>
                <el-table-column align="center" :label="$t('table.state')">
                    <template slot-scope="scope">
                      <el-tag type="success" v-if="scope.row.status">{{$t('table.active')}}</el-tag>
                      <el-tag type="danger" v-else>{{$t('table.disable')}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" prop="timezone" :label="$t('table.time_zone')">
                </el-table-column>
                <el-table-column align="center" :label="$t('table.role_name')">
                    <template slot-scope="scope">
                      <el-tag v-for="item in scope.row.roles" class="margin_bottom_1 display_block" type="success" :key="item.id">{{item.name}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('table.edit')" width="300">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" v-if="show_edit_user" @click="updataUser(scope.row)">{{$t('table.edit')}}</el-button>
                        <el-button  size="mini"  v-if="show_change_user_password" plain @click="changePassWord(scope.row)">{{$t('table.change_password')}}</el-button>
                      <!-- <el-tag v-for="item in scope.row.roles" class="margin_bottom_1 display_block" type="success" :key="item.id">{{item.name}}</el-tag> -->
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
// import drogRuls from "../drog_ruls"
import bus from "../../utils/bus";
import creatRule from "../creat_rule";
import changePassword from "../change_password";
export default {
  props: {
    showTrakPage: {
      type: Boolean
    },
    companyId:{
      // default:-1,
    }
  },
  mounted() {
      bus.$on('createOrUpdateSuccess',res=>{
          console.log('bus success');
        if(this.companyId) this.getUsersOftheCompany();
      })
  },
  data() {
    return {
      listLoading: true,
      innerVisible: false,
      rule_list: [],
      rule_obj:null,
      users:[],
      showChangeDiv:false,
      userid:'',
    };
  },
  methods: {
      changePassWord(res){
          this.userid=res.id;
          this.showChangeDiv=true;
      },
      updataUser(res){
          res.company_id=this.companyId;
          this.$emit('updataUser',res);
      },
      open(){
       this.listLoading=true;

        this.getUsersOftheCompany();
      },
      getUsersOftheCompany(){
          this.$request_any('users/list/'+this.companyId+'/','get').then(res=>{
              this.listLoading=false;
              this.users=res.data.users;
          });
      },
      EditRule(val){
          this.rule_obj=val;
          this.innerVisible=true;
      },
      cloeseCreatUserRule(val){
          this.innerVisible=false;
      },
  },
  computed: {
    showDiv: {
      get() {
        return this.showTrakPage;
      },
      set(val) {
        this.$emit("closeDiv");
      }
    }
  },
  components: {
    creatRule,
    changePassword
  }
};
</script>

<style lang='less'>
@media screen and (min-width: 900px) {
  #rule_box .el-dialog {
    width: 60%;
  }
  .dialogOuters .el-dialog {
    width: 55%;
  }
}
</style>