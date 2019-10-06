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
        <template v-for="(item,index) in headData">
          <el-table-column
            width="80"
            v-if="item === 'platform'"
            :label="$t('table.' + item)">
            <template slot-scope="scope">
              <span v-if="scope.row[item] == '1'">
                IOS
              </span>
              <span v-else-if="scope.row[item] == '0'">
                Android
              </span>
            </template>
          </el-table-column>
          <el-table-column
            width="180"
            v-else-if="item !== 'operation' && item !== 'platform'"
            :label="$t('table.' + item)">
            <template slot-scope="scope">
                <span>
                {{scope.row[item]}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            v-else
            :label="$t('table.operation')"
            width="150">
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
        <el-form-item :label="$t('table.platform')" prop="platform">
          <platform class="filter-item" :getData="temp.platform" @changePlatform="changePlatform"></platform>
        </el-form-item>
        <el-form-item :label="$t('table.name')">
          <el-input v-model="temp.name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.app_file')">
          <el-upload :on-change='handleChange' :on-remove="handleRemove" :file-list="fileList" :auto-upload="false" multiple class="upload-demo" action=''>
            <el-button size="small" type="primary">Package</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('table.resc_file')">
          <el-upload :on-change='handleChange2' :on-remove="handleRemove2" :file-list="fileList_resc" :auto-upload="false" multiple class="upload-demo" action=''>
            <el-button size="small" type="primary">Resc</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item :label="$t('table.package_name')" prop="package_name">
          <el-input v-model="temp.package_name"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.package_backup_path')" prop="package_backup_path">
          <el-input v-model="temp.package_backup_path"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.offer_url')" prop="package_backup_path">
          <el-input v-model="temp.offer_url"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.country')">
          <country class="filter-item" :getData="temp.country" @changeCountry="changeCountry"></country>
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
  import country from '../country'
  import platform from '../platform'

  export default {
    components: {
      country,
      platform
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
          "platform", "name", "package", "package_name", "package_backup_path",
          "country_name", "update_time", "create_time","operation"
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
          platform: 1,
          name: "",
          package_name: "",
          package_backup_path: "",
          offer_url: "",
          country: null,
          files: [],
          resc_file: []
        },
        tempCopy: {},
        fileList: [],
        fileList_resc: [],
        editId: null,
        dialogFormVisible: false,
      }
    },
    methods: {
      getList(){
        this.$request_any("app/", "get", {
          page: this.page || 1,
          capacity: this.capacity || 12,
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
          platform: 1,
          name: "",
          package_name: "",
          package_backup_path: "",
          offer_url: "",
          country: null,
          files: [],
          resc_file: []
        };
        this.fileList = []
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
        this.temp.files = [];
        this.temp.resc_file = [];
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
        if(this.temp.resc_file){
          this.temp.resc_file.forEach(file => {
            fmData.append('resc_file', file.raw)
          });
        }
        for (let i in this.temp) {
          if (i !== 'files' && i !== 'resc_file') {
            fmData.append(i, this.temp[i])
          }
        }
        this.$request_any("app/", "post", fmData).then(res => {
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
        if(this.temp.resc_file){
          this.temp.resc_file.forEach(file => {
            fmData.append('resc_file', file.raw)
          });
        }
        for (let i in this.temp) {
          if (i !== 'files' && i !== 'resc_file') {
            fmData.append(i, this.temp[i])
          }
        }
        this.$request_any("app/" + this.editId + "/", "patch", fmData).then(res => {
          this.dialogFormVisible = false;
          this.$message({
            message: 'Success!',
            type: 'success'
          });
          this.getList()
        });
      },
      goDetail(row,txt) {
        this.editId = row.id;
        if (txt === "task") {
          this.$emit('goDetail', { data: this.editId, name: 'Task' })
        }else {
          this.$emit('goDetail', { data: this.editId, name: 'Schedule' })
        }

      },
      searchFun() {

      },
      changePlatform(v) {
        this.temp.platform = v.id
      },
      changeCountry(v) {
        this.temp.country = v.id
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
      handleRemove2(e) {
        this.temp.resc_file.forEach((img, index) => {
          if (img.name == e.name) {
            this.temp.resc_file.splice(index, 1)
          }
        })
      },
      handleChange2(file, fileList) {
        if(fileList.length>1){
          fileList.splice(0,1)
        }
        this.temp.resc_file = fileList
        // this.temp.files.push(file)
      },
    },
    mounted() {
      this.getList()
    },
    created() {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
