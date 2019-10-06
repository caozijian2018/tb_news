<template>
  <div class="app-container">
    <div class="margin_top_10 filter-container">
      <div class="filter-item">
        <el-input v-model="searchData"></el-input>
      </div>
      {{$t('table.app')}}
      <div class="filter-item">
        <appList :getData="a_id" @changeApp_list="changeApp_list"></appList>
      </div>
      {{$t('table.schedule')}}
      <div class="filter-item">
        <scheduleList :getData="a_id" @changeSchedule_list="changeSchedule_list"></scheduleList>
      </div>
      {{$t('table.script')}}
      <div class="filter-item">
        <scriptList :getData="sch_id" @changeScript_list="changeScript_list"></scriptList>
      </div>
      {{$t('table.task_state')}}
      <div class="filter-item">
        <isComplate :getData="is_complate" @changeIS_complate="changeIS_complate"></isComplate>
      </div>
      <div class="filter-item">
        <el-button type="primary" icon="el-icon-search" @click="searchFun">Search</el-button>
      </div>
      <div class="filter-item">
        <el-button type="primary" @click="createData">Batch Add</el-button>
      </div>
      <div class="filter-item">
        <el-button type="primary" @click="nextStep">NEXT</el-button>
      </div>
    </div>
    <div class="margin_top_10">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
        style="width: 100%">
        <template v-for="(item,index) in headData">
          <el-table-column
            v-if="item === 'select' && showSelect && is_complate === 3"
            type="selection"
            width="80">
          </el-table-column>
          <el-table-column
            :key='item'
            v-else-if="item === 'script' || item === 'schedule'"
            width="180"
            :label="$t('table.' + item)">
            <template slot-scope="scope">
              <span>
                {{scope.row[item].name}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :key='item'
            v-else-if="item === 'phone'"
            width="180"
            :label="$t('table.' + item)">
            <template slot-scope="scope">
              <span v-if="scope.row[item] !== null">
                {{scope.row[item].tag}}
              </span>
              <span v-else></span>
            </template>
          </el-table-column>
          <el-table-column
            :key='item'
            v-else-if="item === 'package_backup_path' || item === 'recharge_amount' "
            width="220"
            :label="$t('table.' + item)">
            <template slot-scope="scope">
              <span>
              {{scope.row[item]}}
            </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('table.operation')"
            v-else-if="item === 'operation'"
            :key='item'
            width="120">
            <template slot-scope="scope">
              <el-button
                @click.native.prevent="uploadData(scope.row)"
                type="text"
                size="small">
                {{$t('table.edit')}}
              </el-button>
            </template>
          </el-table-column>
          <el-table-column
            width="120"
            :key='index'
            v-else
            :label="$t('table.' + item)">
            <template slot-scope="scope">
              <span>
              {{scope.row[item]}}
            </span>
            </template>
          </el-table-column>
        </template>

      </el-table>
      <el-pagination
        :page-sizes="[12, 30 , 50 , 80 , 100 , 1000]"
        :page-size="12"
        @size-change="handleSizeChange"
        :current-page.sync="page"
        background
        layout="total, sizes, prev, pager, next"
        :total="page_total"
        class="text_left margin_top_10"
        @current-change="changePage"
      >-->
      </el-pagination>
    </div>

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="150px"
               style='width: 500px; margin-left:50px;'>
        <div v-if="dialogStatus === 'create'">
          <el-form-item :label="$t('table.count')" prop="count">
            <el-input v-model="temp0.count"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.schedule')" prop="schedule">
            <el-select v-model="temp2.schedule" placeholder="Please select" filterable>
              <el-option v-for="item in tempList.schedule" :key="item.id" :label="item.name" :value="item.id"
                         @click.native="createSch(item.id)">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :label="$t('table.script')" prop="script">
            <el-select v-model="temp2.script" placeholder="Please select" filterable>
              <el-option v-for="item in tempList.script" :key="item.id" :label="item.name" :value="item.id"
                         @click.native="createScr(item.id)">
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div v-if="dialogStatus === 'update'">
          <el-form-item :label="$t('table.will_recharge')">
            <el-switch
              v-model="temp.will_recharge"
              active-text="True"
              inactive-text="False">
            </el-switch>
          </el-form-item>
          <el-form-item :label="$t('table.recharge_amount')">
            <el-input v-model="temp.recharge_amount"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.config')">
            <el-input v-model="temp.config"></el-input>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="toCreateData">{{$t('table.confirm')}}
        </el-button>
        <el-button v-else type="primary" @click="toUpdateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>

    <el-dialog title="Next" :visible.sync="nextShow">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="150px"
               style='width: 500px; margin-left:50px;'>
        <el-form-item label="Next Schedule ID">
          <el-select v-model="next_schedule_id" @change="changeScheduleID" placeholder="Please select" filterable>
            <el-option v-for="item in selectList0" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="Next Script ID">
          <el-select v-model="next_script_id"
                     @change="changeScriptID" placeholder="Please select" filterable>
            <el-option v-for="item in selectList"
                       :key="item.id" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="nextCreate">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import executeTime from '../execute_time'
  import executeTimezone from '../execute_timezone'
  import appList from '../app_list'
  import scheduleList from '../schedule_list'
  import scriptList from '../script_list'
  import isComplate from '../is_complate'

  export default {
    components: {
      executeTime,
      executeTimezone,
      appList,
      scheduleList,
      scriptList,
      isComplate
    },
    props: [],
    data() {
      return {
        tableData: [],
        headData: [
          "select", "id", "schedule", "script", "phone", "pids", "slave", "task_state", "will_recharge",
          "recharge_amount", "config", "is_finished", "is_success", "begin_time", "end_time",
          "create_time", "update_time", "ref_id", "is_need_reinstall", "package_backup_path",
          "app_error_log", "error_log", "prev_task", "operation"
        ],
        page: 1,
        capacity: 12,
        page_total: 0,
        searchData: "",
        fileList: [],
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogStatus: "",
        temp0: {
          counta: ""
        },
        temp: {
          will_recharge: true,
          recharge_amount: "",
          config: ""
        },
        dialogFormVisible: false,
        nextShow: false,
        app_id: null,
        script_id: null,
        editId: null,
        a_id: null,
        sch_id: null,
        scr_id: null,
        is_complate: undefined,
        selectList0: [],
        selectList: [],
        next_schedule_id: null,
        next_script_id: null,
        selectID: [],
        selection: {
          type: "selection"
        },
        tempList: {
          schedule: [],
          script: []
        },
        temp2: {
          schedule: null,
          script: null
        },
        showSelect: false
      }
    },
    methods: {
      searchFun() {
        this.getList();
        if (this.a_id > 0) {
          this.showSelect = true
        } else {
          this.showSelect = false
        }
      },
      handleSelectionChange(val) {
        this.selectID = [];
        let that = this;
        if (val.length > 0) {
          val.forEach(function (v) {
            that.selectID.push(v.id)
          })
        }
      },
      getList() {
        this.$request_any("task/", "get", {
          page: this.page || 1,
          capacity: this.capacity || 12,
          state: this.is_complate,
          app: this.a_id,
          schedule: this.sch_id || undefined,
          script: this.scr_id || undefined,
          search: this.searchData
        }).then(res => {
          this.tableData = res.results;
          this.page_total = res.count;
        });
      },
      handleSizeChange(v) {
        this.page = 1;
        this.capacity = v;
        this.getList();
      },
      changePage(page) {
        this.page = page;
        this.getList();
      },
      createData() {
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.temp0 = {
          counta: ""
        }
      },
      uploadData(data) {
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        let midone;
        midone = JSON.parse(JSON.stringify(data));
        for (let i in midone) {
          for (let j in this.temp) {
            if (i === j) {
              this.temp[j] = midone[i]
            }
          }
        }
        this.editId = data.id;
      },
      toCreateData() {
        this.$request_any("task/", "post", {
          count: this.temp0.count,
          script: this.temp2.script
        }).then(res => {
          this.dialogFormVisible = false;
          this.$message({
            message: 'Success!',
            type: 'success'
          });
          this.getList()
        });
      },
      toUpdateData() {
        this.$request_any("task/" + this.editId + "/", "patch", {
          will_recharge: this.temp.will_recharge,
          recharge_amount: this.temp.recharge_amount,
          config: this.temp.config,
          app: this.a_id
        }).then(res => {
          this.dialogFormVisible = false;
          this.$message({
            message: 'Success!',
            type: 'success'
          });
          this.getList()
        });
      },
      nextStep() {
        if (this.showSelect) {
          this.nextShow = true;
          this.$request_any("schedule/", "get", {
            page: 1,
            capacity: 999,
            app: this.a_id
          }).then(res => {
            this.selectList0 = res.results
          });
        } else {
          this.$message.error("请先选择Script");
        }

      },
      nextCreate() {
        this.nextShow = false;
        this.$request_any("inherit_task/", "post", {
          task_id_arr: this.selectID,
          script: this.next_script_id
        }).then(res => {
          this.tempList.schedule = res.results
        })
      },
      goDetail(row) {
        this.editId = row.id;
        this.$emit('goDetail', {data: this.editId, name: 'Task'})
      },
      imgAdd(e) {
        this.temp.files.push(e)
      },
      imgRemove(e) {
        this.temp.files.forEach((img, index) => {
          if (img.name == e.name) {
            this.temp.files.splice(index, 1)
          }
        })
      },
      changeApp_list(v) {
        this.a_id = v.id
        console.log("appid", v)
      },
      changeSchedule_list(v) {
        this.sch_id = v.id
      },
      changeScript_list(v) {
        this.scr_id = v.id
      },
      changeScheduleID(v) {
        this.next_schedule_id = v;
        this.$request_any("scripts/", "get", {
          page: 1,
          capacity: 999,
          schedule: this.next_schedule_id
        }).then(res => {
          this.selectList = res.results
        });
      },
      changeScriptID(v) {
        this.next_script_id = v
      },
      changeIS_complate(v) {
        this.is_complate = v.id
      },
      getSelect() {

      },
      createSch(v) {
        this.temp2.schedule = v;
        if (v) {
          this.getCreateScr()
        }
      },
      createScr(v) {
        this.temp2.script = v;
      },
      getCreateSch() {
        this.$request_any("schedule/", "get", {
          page: 1,
          capacity: 999,
          app: this.a_id
        }).then(res => {
          this.tempList.schedule = res.results
        })
      },
      getCreateScr() {
        this.$request_any("scripts/", "get", {
          page: 1,
          capacity: 999,
          schedule: this.temp2.schedule
        }).then(res => {
          this.tempList.script = res.results
        })
      }
    },
    mounted() {
      this.app_id = localStorage.appId;
      // this.getList();
      this.getCreateSch();
    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
