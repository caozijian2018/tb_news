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
    </div>
    <div class="margin_top_10">
      <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
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
        <el-form-item :label="$t('table.up_script')">
          <el-upload :on-change='handleChange' :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" multiple class="upload-demo" action='http://171.221.254.162:10111/backend/api/v1/resource/'>
            <el-button size="small" type="primary">click upload</el-button>
          </el-upload>
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
    props: [],
    data() {
      return {
        crumb: [
          {
            name: "App",
            router: ""
          }
        ],
        tableData: [],
        headData: [
          "name", "path", "is_finished", "update_time", "create_time"
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
        temp: {
          name: "",
          file: []
        },
        dialogFormVisible: false,
        schedule_id: null,
        editId: null,
      }
    },
    methods: {
      getList() {
        this.$request_any("scripts/", "get", {
          page: this.page || 1,
          capacity: this.capacity || 12,
          schedule: this.schedule_id
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
        this.temp = {
          name: "",
          file: []
        };
        this.fileList = []
      },
      uploadData(data) {
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        let midone;
        midone = JSON.parse(JSON.stringify(data));
        // for (let i in midone){
        //   for (let j in this.temp) {
        //     if (i === j) {
        //       this.temp[j] = midone[i]
        //     }
        //   }
        // }
        this.temp = {
          name: midone.name,
          file: []
        };
        this.fileList = [];
        this.editId = data.id
      },
      toCreateData() {
        let fmData = new FormData();
        if(this.temp.files){
          this.temp.files.forEach(file => {
            fmData.append('files', file.raw)
          });
        }else {
          this.$message.error('未选择上传文件');
          return
        }
        // for (let i in this.temp) {
        //   if (i !== 'files') {
        //     fmData.append(i, this.temp[i])
        //   }
        // }
        fmData.append("name", this.temp.name);
        fmData.append("schedule", this.schedule_id);
        this.$request_any("scripts/", "post", fmData).then(res => {
          this.dialogFormVisible = false;
          this.$message({
            message: 'Success!',
            type: 'success'
          });
          this.getList()
        });
      },
      toUpdateData() {
        let fmData = new FormData();
        if(this.temp.files){
          this.temp.files.forEach(file => {
            fmData.append('files', file.raw)
          });
        }
        fmData.append("name", this.temp.name);
        // for (let i in this.temp) {
        //   if (i !== 'files') {
        //     fmData.append(i, this.temp[i])
        //   }
        // }
        this.$request_any("scripts/" + this.editId + "/", "patch", fmData).then(res => {
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
        this.$emit('goDetail', { data: this.editId, name: 'Task'})
      },
      searchFun() {

      },
      handleRemove(e) {
        this.temp.files.forEach((img, index) => {
          if (img.name == e.name) {
            this.temp.files.splice(index, 1)
          }
        })
      },
      handleChange(file, fileList) {
        if(fileList.length>1){
          fileList.splice(0,1)
        }
        this.temp.files = fileList
        // this.temp.files.push(file)
      },
    },
    mounted() {
      this.schedule_id = localStorage.scheduleId;
      this.getList()
    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
