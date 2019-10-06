<template>

  <div class="app-container">
    <div class="filter-container">
      <el-input class="filter-item" v-model="keywords" style="width:200px"></el-input>
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="searchByKeyWords">{{$t('table.search')}}</el-button>
      <!-- <el-button style='margin:0 0 20px 20px;' type="primary" icon="document" @click="exportExcel" >{{$t('excel.export')}} excel</el-button> -->
      <el-button v-if="showaddtrak" class="filter-item float_right add_trak" style="margin-left: 10px;"  @click="trakListAddOrEdit()" type="primary" icon="el-icon-circle-plus">{{$t('table.create_trak')}}</el-button>
    </div>
    <el-table :data="traklist" v-if="traklist" border style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')" type="index"  fixed width="75">
      </el-table-column>
      <el-table-column align="center" :label="$t('table.appKey2appName')">
        <template slot-scope="scope">
            <span>{{scope.row.appName}}({{scope.row.appKey}})</span>
          </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.key')" >
          <template slot-scope="scope">
            <span>{{scope.row.key}}</span>
          </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.traker_name')"  >
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
      </el-table-column>
       <el-table-column class-name="status-col" :label="$t('table.state')">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status" type="success" class="margin_top_1">
              {{$t('table.active')}}  
            </el-tag>
            <el-tag v-else type="danger" class="margin_top_1">
              {{$t('table.disable')}}  
            </el-tag>
        </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.daily_max_clk')">
          <template slot-scope="scope">
            <span >{{scope.row.daily_max_clk==0?'infinite':scope.row.daily_max_clk}}</span>
          </template>
      </el-table-column>
      <el-table-column  align="center" :label="$t('table.maximum_daily')">
          <template slot-scope="scope">
            <span >{{scope.row.cvr_daily_cap==0?'infinite':scope.row.cvr_daily_cap}}</span>
          </template>
      </el-table-column>
      <!-- <el-table-column width="150px" align="center" :label="$t('table.custom_param')">
        <template slot-scope="scope">
          <span v-for="item in scope.row.key2val" :key="item.key">
            <el-tag class="display_block margin_bottom_1">{{item.key}} {{item.dim}}</el-tag>
          </span>
        </template>
      </el-table-column> -->
      <el-table-column align="center" :label="$t('table.repeat_clk_cnt')">
        <template slot-scope="scope">
          <span>{{scope.row.repeat_clk_cnt==0?"infinite":scope.row.repeat_clk_cnt}}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :label="$t('table.click_url')">
        <template slot-scope="scope">
          <span>{{scope.row.tracker_url}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" :label="$t('table.create_date')">
        <template slot-scope="scope">
          <span>{{scope.row.create_dt|timeSplit}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" fixed="right" class="" :label="$t('table.actions')" width="170" class-name="small-padding fixed-width">
        <template slot-scope="scope" class="display_flex flex_align_center">
          <!-- {{scope.row.status}} -->
          <div class="display_flex flex_jusify_space flex_align_center">
            <el-switch class="" v-model="scope.row.jump_status" @change="trakerStatusChange(scope.row,scope.row.jump_status)">
            </el-switch>
            <el-button class="" type="primary" v-if="show_trak_setting" size="mini" @click="trakListAddOrEdit(scope.row,1)">
              {{$t('table.edit')}}</el-button>
            <i class="iconfont icon-qianseban-" @click="goDataStatistics(scope.row)" style="font-size:30px;"></i>
          </div>
        </template>
      </el-table-column>
      </el-table>
    <trak-add-edit :trak-obj="trakObj" @creatTrak="creatTrak" :show-trak="showTrak" @closeTrak="showTrak=false"></trak-add-edit>
    <el-pagination background layout="prev, pager, next" :page-size="12" :total="count" class="text_center margin_top_10" @current-change="getTrakList">
    </el-pagination>
  </div>
</template>

<script>
//老司机
  import * as Driver from 'driver.js' // import driver.js
  import 'driver.js/dist/driver.min.css' // import driver.js css
  import steps from './defineSteps'
  import platform_list from "../../utils/platform"
  import trakAddEdit from "../../components/trak_add_list"
  // import { parseTime } from '../../utils'
  import waves from '@/directive/waves' // 水波纹指令
  var page_glo=1;
  var isEdit_glo;
  var trak_id;
  import {
    parseTime
  } from '@/utils'
  var chaned_id;
  // arr to obj ,such as { CN : "China", US : "USA" }
  
  export default {
    name: 'complexTable',
    mounted() {
      setTimeout(()=>{
        if(!localStorage.has_to_trak) this.guide();
      },200);
      this.getTrakList();
      // setTimeout((()=>{}),200)
      localStorage.has_to_trak=1;
    },
    directives: {
      waves
    },
    components:{
      trakAddEdit
    },
    data() {
      return {
        keywords:'',
        driver: null,
        showTrak:false,
        platform_value: 0,
        package_name: '',
        platform_list: platform_list,
        name: "",
        dest_url: "",
        admin_user: "",
        admin_pwd: "",
        status: true,
        company_name: "",
        domain: "",
        dialogFormVisible: false,
        dialogStatus: '',
        createTrakVisit:true,
        app_id:'',
        traklist:[],
        count:12,
        trakObj:null,
      }
    },
    methods: {
      searchByKeyWords(){
        if( !this.validate_input.check( this.keywords ) ){
          this.getTrakList();
          return;
        }
        this.$request_any('tracker/filter/'+this.keywords+'/').then((res)=>{
          this.traklist = res.data;
          this.count=1;
        })
      },
      goDataStatistics(res){
        console.log(res);
        this.$router.push({
          name:"data_statistics",
          query:res
        })
      },
      trakerStatusChange(res,jump_status){
        console.log(res);
        console.log(jump_status);
        isEdit_glo=true;
        trak_id=res.id;
        this.creatTrak({
          jump_status
        });
      },
      //导出excel
      formatJson(filterVal, jsonData) {
        return jsonData.map((val,index_) => {
          var single_excel=filterVal.map(val_ => {
            return val[val_]
            }
          )
          single_excel.unshift(++index_);
          return single_excel;
          }
        )
      },
      exportExcel(){
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['index','id','name','fallback url','trak url','create time']
          const filterVal = ['id','name','fallback_url','tracker_url','create_dt']
          const list = this.traklist
          const data = this.formatJson(filterVal, list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename:'trak 列表',
            autoWidth: true
          })
          this.downloadLoading = false
        })
      },
      guide() {
        this.driver = new Driver()
        this.driver.defineSteps(steps)
        this.driver.start()
      },
      changeNum(res){
        console.log(res);
      },
      showEdit(){
        this.$store.state.showTrakPage=true
      },
      getTrakList(page=1){
        page_glo=page;
        this.$request_any("tracker",'get',{
          page:page
        }).then(res=>{
          this.count=res.data.count;
          for(var val of res.data.results){
          val.key2val=Object.values(val.custom_param);
          }
          this.traklist=res.data.results;
          // if(!localStorage.has_to_trak) this.guide();
        }).catch(res=>{
        })
      },
      trakListAddOrEdit(res,isEdit){
        console.log(res);
        isEdit_glo=isEdit;
        trak_id=res?res.id:'';
        this.showTrak=true;
        this.$store.state.isEdit=isEdit;
        this.$store.state.trakObj=res;
        this.trakObj=res;
        this.$store.state.showTrakPage=true;
      },
      creatTrak(res){
        var url_=isEdit_glo?"tracker/"+trak_id+'/':"tracker";
        var method_=isEdit_glo? "patch" : "post" ;
        this.$request_any(url_,method_,res).then(res=>{
        this.$msg(this.$t("table.success"));
        this.showTrak=false;
        this.getTrakList(page_glo);
        })
      },
    }
  }
</script>

<style lang="less">
  #add_company label {
    width: 130px !important;
  }
  
  @media screen and (max-width: 900px) {
    .el-dialog {
      width: 90%;
    }
  }
</style>

