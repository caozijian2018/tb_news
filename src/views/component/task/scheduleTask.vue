<template>
  <div class="app-container">
    <div class="margin_top_10 flex_box">
      <div class="flex_box_item margin_right_20">
        <el-input v-model="searchData"></el-input>
      </div>
      <div class="flex_box_item margin_right_20">
        <el-button type="primary" @click="searchFun" icon="el-icon-search">Search</el-button>
      </div>
      <div class="flex_box_item margin_right_20">
        <el-button type="primary" @click="createData">Add</el-button>
      </div>
      <div class="flex_box_item margin_right_20">
        <el-button type="primary" @click="refresh">Refresh</el-button>
      </div>
    </div>
    <div class="margin_top_10">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          width="150"
          v-for="(item,index) in headData"
          :key="index"
          :label="$t('table.' + item)">
          <template slot-scope="scope">
            <span v-if="scope.row[item] === true">
              true
            </span>
            <span v-else-if="scope.row[item] === false">
              false
            </span>
            <span v-else>
              {{scope.row[item]}}
            </span>
          </template>
        </el-table-column>
        <el-table-column
          :label="$t('table.operation')"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="uploadData(scope.row)"
              type="text"
              size="small">
              {{$t('table.edit')}}
            </el-button>
            <el-button
              @click.native.prevent="goDetail(scope.row)"
              type="text"
              size="small">
              {{$t('table.detail')}}
            </el-button>
          </template>
        </el-table-column>
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
        <el-form-item :label="$t('table.name')">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.execute_time')" prop="execute_time">
          <executeTime :getData="temp.execute_time" @changeExecute_time="changeExecute_time"></executeTime>
        </el-form-item>
        <el-form-item :label="$t('table.execute_timezone')" prop="execute_timezone">
          <executeTimezone :getData="temp.execute_timezone" @changeExecute_Timezone="changeExecute_Timezone"></executeTimezone>
        </el-form-item>
        <el-form-item :label="$t('table.count')" prop="package_backup_path">
          <el-input v-model="temp.count"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" type="primary" @click="toCreateData">{{$t('table.confirm')}}
        </el-button>
        <el-button v-else type="primary" @click="toUpdateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import executeTime from '../execute_time'
  import executeTimezone from '../execute_timezone'

  export default {
    components: {
      executeTime,
      executeTimezone
    },
    props: ["appId"],
    data() {
      return {
        crumb: [
          {
            name: "App",
            router: ""
          }
        ],
        tableData: [
          {
            name: "test1"
          }
        ],
        headData: [
          "name", "execute_time", "execute_timezone","complate_percent",
          "app", "is_finished", "update_time", "create_time"
        ],
        page: 1,
        capacity: 12,
        page_total: 0,
        searchData: "",
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogStatus: "",
        temp: {
          name: "",
          execute_timezone: 0,
          execute_time: "",
          count: ""
        },
        dialogFormVisible: false,
        app_id: null,
        editId: null,
      }
    },
    methods: {
      getList() {
        this.$request_any("schedule/", "get", {
          page: this.page || 1,
          capacity: this.capacity || 12,
          app: this.app_id
        }).then(res => {
          this.tableData = res.results;
          if(this.tableData.length) {
            this.tableData.forEach((v,index) => {
              this.tableData[index].complate_percent = this.tableData[index].complate + "/" + this.tableData[index].count;
            })
          }
          console.log(this.tableData)
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
        this.temp = {
          name: "",
          execute_timezone: 0,
          execute_time: "",
          count: ""
        };
      },
      uploadData(data) {
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        let midone;
        midone = JSON.parse(JSON.stringify(data));
        for (let i in midone){
          for (let j in this.temp) {
            if (i === j) {
              this.temp[j] = midone[i]
            }
          }
        }
        this.editId = data.id
      },
      toCreateData() {
        this.$request_any("schedule/", "post", {
          name: this.temp.name,
          execute_timezone: this.temp.execute_timezone,
          execute_time: this.temp.execute_time,
          count: this.temp.count,
          app: this.app_id
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
        this.$request_any("schedule/" + this.editId + "/", "patch", {
          name: this.temp.name,
          execute_timezone: this.temp.execute_timezone,
          execute_time: this.temp.execute_time,
          count: this.temp.count,
          app: this.app_id
        }).then(res => {
          this.dialogFormVisible = false;
          this.$message({
            message: 'Success!',
            type: 'success'
          });
          this.getList()
        });
      },
      goDetail(row) {
        this.editId = row.id;
        this.$emit('goDetail', { data: this.editId, name: 'Script'})
      },
      searchFun() {

      },
      refresh() {
        this.getList()
      },
      changeExecute_time(v){
        this.temp.execute_time = v.value
      },
      changeExecute_Timezone(v){
        this.temp.execute_timezone = v.value
      },
    },
    mounted() {
      this.getList();
    },
    created() {
      this.app_id = localStorage.appId;
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
