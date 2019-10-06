<template>
    <div class="" id="rule_box">
        <el-dialog :title="$t('table.role_list')" @open="open" class="" :visible.sync="showDiv">
            <!-- <el-dialog title="内层 Dialog" :visible.sync="innerVisible" @close="cloeseCreatUserRule" class="dialogOuters" append-to-body> -->
            <creat-rule :ruleObj="rule_obj" :innerVisible="innerVisible" ref="ruleRef" @creatUserRuleSuccess="cloeseCreatUserRule" :company-id="companyId"></creat-rule>
            <!-- </el-dialog> -->
            <div class="filter-container">
                <el-button class="filter-item float_right" v-if="show_add_rule" @click="addUseruls()" style="margin-left: 10px;" type="primary" icon="el-icon-circle-plus">{{$t('table.add_rule_user')}}</el-button>
            </div>
        <!-- // company: 1, name: "txxx", id: 2, perms: "maintain_offer", desc: "", status:true -->
            <el-table  :data="rule_list" border v-loading="listLoading" style="width: 100%">
                <el-table-column align="center" prop="name" :label="$t('table.role_name')">
                </el-table-column>
                <el-table-column align="center" prop="desc" :label="$t('table.role_desc')">
                </el-table-column>
                <el-table-column align="center" :label="$t('table.state')">
                    <template slot-scope="scope">
                      <el-tag type="success" v-if="scope.row.status">{{$t('table.active')}}</el-tag>
                      <el-tag type="danger" v-else>{{$t('table.disable')}}</el-tag>
                      <!-- <el-tag v-for="item in scope.row.perms" class="margin_bottom_1 display_block" type="success" :key="item">{{item}}</el-tag> -->
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('table.permissions')">
                    <template slot-scope="scope">
                      <el-tag v-for="item in scope.row.perms" class="margin_bottom_1 display_block" type="success" :key="item.id">{{item.desc}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" :label="$t('table.edit')" width="300"  v-if="show_one_edit_rules">
                    <template slot-scope="scope">
                      <el-button type="primary" size="small" v-if="show_one_edit_rules" @click="EditRule(scope.row)" icon="el-icon-edit">{{$t('table.edit')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import appList from "../app_list";
// import drogRuls from "../drog_ruls"
import timeZone from "../time_zone";
import rulesSelect from "../rules_select";
import creatRule from "../creat_rule";

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
    // console.log('rrrrrr');
   // this.getCompanyRulelist();
  },
  data() {
    return {
      listLoading: true,
      innerVisible: false,
      rule_list: [],
      rule_obj:null,
    };
  },
  methods: {
      open(){
       this.listLoading=true;

        this.getCompanyRulelist();
      },
      EditRule(val){
          this.rule_obj=val;
          this.innerVisible=true;
      },
      addUseruls(){
          this.rule_obj=null,
          this.innerVisible=true;
      },
      cloeseCreatUserRule(val){
          this.innerVisible=false;
          this.getCompanyRulelist();
      },
    getCompanyRulelist() {
      this.$request_any("role/list/"+this.companyId+"/", "get").then(res => {
       this.rule_list=res.data.roles;
       this.listLoading=false;
      });
    },
    selectRule(res) {
      this.roles = res;
    },

    choseTime(val) {
      this.timezone = val;
    },
    seletApp(val) {
      this.company = val;
    }
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
    appList,
    timeZone,
    // drogRuls,
    rulesSelect,
    creatRule
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