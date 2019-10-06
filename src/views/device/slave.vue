<template>
    <div class="app-container">
      <!--<div class="filter-container">-->
        <!--<el-button type="primary" @click="createData">Create</el-button>-->
      <!--</div>-->
      <div class="margin_top_10">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            v-for="(item,index) in headData"
            :prop="item"
            :key="index"
            :label="$t('table.' + item)">
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
        <el-form ref="dataForm" :model="temp" label-position="left" label-width="150px" style='width: 500px; margin-left:50px;'>
          <el-form-item :label="$t('table.mac')">
            <el-input v-model="temp.mac"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.ip')" prop="ip">
            <el-input v-model="temp.ip"></el-input>
          </el-form-item>
          <el-form-item :label="$t('table.status')" prop="status">
            <el-switch
              v-model="temp.status"
              active-text="在线"
              inactive-text="离线">
            </el-switch>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button v-if="dialogStatus=='create'" type="primary" @click="toCreateData">{{$t('table.confirm')}}</el-button>
          <el-button v-else type="primary" @click="toUpdateData">{{$t('table.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
        components: {},
        props: [],
        data() {
            return {
              tableData: [],
              headData: ["ip", "status", "last_heartbeat", "create_time", "update_time"],
              textMap:{
                update: 'Edit',
                create: 'Create'
              },
              dialogStatus: "",
              temp: {
                mac: "",
                ip: "",
                status: true
              },
              dialogFormVisible: false,
              editId: null,
              page: 1,
              capacity: 12,
              page_total: 0
            }
        },
        methods: {
          getList(){
            this.$request_any("slave/", "get", {
              page: this.page || 1,
              capacity: this.capacity || 12
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
            this.page =  page;
            this.getList();
          },
          createData(){
            this.dialogStatus = 'create';
            this.dialogFormVisible = true;
            this.temp = {
              mac: "",
              ip: "",
              status: true
            }
          },
          uploadData(data){
            this.dialogStatus = 'update';
            this.dialogFormVisible = true;
            this.temp = JSON.parse(JSON.stringify(data));
            if(data.status === 0){
              this.temp.status = true
            }else if(data.status === 1){
              this.temp.status = false
            }
            this.editId = data.id
          },
          toCreateData(){
            if(this.temp.status){
              this.temp.status = 0
            }else {
              this.temp.status = 1
            }
            this.$request_any("slave/", "post", {
              mac: this.temp.mac,
              ip: this.temp.ip,
              status: this.temp.status
            }).then(res => {
              this.dialogFormVisible = false;
              this.$message({
                message: 'Success!',
                type: 'success'
              });
              this.getList()
            });
          },
          toUpdateData(){
            if(this.temp.status){
              this.temp.status = 0
            }else {
              this.temp.status = 1
            }
            this.$request_any("slave/" + this.editId + "/", "patch", {
              mac: this.temp.mac,
              ip: this.temp.ip,
              status: this.temp.status
            }).then(res => {
              this.dialogFormVisible = false;
              this.$message({
                message: 'Success!',
                type: 'success'
              });
              this.getList()
            });
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
