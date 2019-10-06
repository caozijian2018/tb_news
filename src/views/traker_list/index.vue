<template>

  <div class="app-container">
    <div class="filter-container">
      <el-button class="filter-item float_right" style="margin-left: 10px;" @click="trakListAddOrEdit()" type="primary" icon="el-icon-circle-plus">{{$t('addapp.add_app')}}</el-button>
    </div>
    <el-table :data="traklist" v-if="traklist" border style="width: 100%">
      <el-table-column align="center" :label="$t('table.id')" width="65">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
      </el-table-column>
      <el-table-column width="150px" align="center" :label="$t('table.date')">
        <template slot-scope="scope">
          <span>{{scope.row.create_dt|timeSplit}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150px" align="center" label="custom param">
        <template slot-scope="scope">
          <span v-for="item in scope.row.key2val" :key="item.key">
            
            <el-tag class="display_block margin_bottom_1">{{item.key}} ---> {{item.dim}}</el-tag>
          </span>
        </template>
      </el-table-column>
  
      <el-table-column max-width="140px" :label="$t('addapp.trak_name')">
          <template slot-scope="scope">
            <span class="link-type" >{{scope.row.name}}</span>
            <!-- <el-tag>{{scope.row.type | typeFilter}}</el-tag> {{scope.row.title}}-->
          </template>
      </el-table-column>
      <el-table-column width="190px" align="center" :label="$t('table.trakingurl')">
          <template slot-scope="scope">
            <span>{{scope.row.tracker_url}}</span>
            <!-- {{scope.row.author}}  -->
          </template>
        </el-table-column>
      
      <el-table-column width="120px" align="center" :label="$t('table.maximum_daily')">
          <template slot-scope="scope">
            <span >{{scope.row.cvr_daily_cap==0?'infinite':scope.row.cvr_daily_cap}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" :label="$t('table.jump_switch')">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.jump_status" type="success" class="margin_top_1">
              {{$t('table.active')}}  
            </el-tag>
            <el-tag v-else type="danger" class="margin_top_1">
              {{$t('table.disable')}}  
            </el-tag>
          </template>
        </el-table-column>
       <el-table-column width="120px" align="center" :label="$t('table.spare_url')">
          <template slot-scope="scope">
            <span >{{scope.row.fallback_url}}</span>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" :label="$t('table.duplicate_removal')">
          <template slot-scope="scope">
             <el-tag v-if="scope.row.distinct_cvr_postback_status" type="success" class="margin_top_1">
              {{$t('table.active')}}  
            </el-tag>
            <el-tag v-else type="danger" class="margin_top_1">
              {{$t('table.disable')}}  
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column width="160px" align="center" :label="$t('table.postback_url')">
          <template slot-scope="scope">
            <el-tag type="success" v-for="item in scope.row.postback_url" :key="item" class="display_block width_100" style="margin:5px 0">
              {{item}}
            </el-tag>
          </template>
        </el-table-column>

      <el-table-column class-name="status-col" :label="$t('table.state')" width="100">
        <template slot-scope="scope">
          
          <el-tag v-if="scope.row.status" type="success" class="margin_top_1">
              {{$t('table.active')}}  
            </el-tag>
            <el-tag v-else type="danger" class="margin_top_1">
              {{$t('table.disable')}}  
            </el-tag>
        </template>
      </el-table-column>
      <!-- input -->
      <el-table-column align="center" :label="$t('table.actions')" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="trakListAddOrEdit(scope.row,1)">
            {{$t('table.edit')}}</el-button>
        </template>
      </el-table-column>
      </el-table>
    <!-- 弹出册 -->
    <trak-add @creatTrak="creatTrak" :show-trak="showTrak" @closeTrak="showTrak=false"></trak-add>
    <el-pagination background layout="prev, pager, next" :page-size="12" :total="count" class="text_center margin_top_10" @current-change="getTrakList">
        </el-pagination>
  </div>
</template>

<script>
  import platform_list from "../../utils/platform"
  import trakAdd from "../../components/trak_add_list"

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
      this.getTrakList();
    },
    directives: {
      waves
    },
    components:{
      trakAdd
    },
    data() {
      return {
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
      }
    },
    methods: {
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
        }).catch(res=>{
        })
      },
      trakListAddOrEdit(res,isEdit){
        //显示弹窗
        isEdit_glo=isEdit;
        trak_id=res?res.id:'';
        this.showTrak=true;
        this.$store.state.isEdit=isEdit;
        this.$store.state.trakObj=res;
        this.$store.state.showTrakPage=true;
      },
      creatTrak(res){
        var url_=isEdit_glo?"tracker/"+trak_id+'/':"tracker";
        var method_=isEdit_glo? "patch" : "post";
        this.$request_any(url_,method_,res).then(res=>{
          this.$message({
            message: this.$t('table.success'),//'操作成功',
            type: 'success'
        })
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

