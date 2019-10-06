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
            width="150"
            v-else-if="item !== 'operation' && item !== 'platform'"
            :label="$t('table.' + item)">
            <template slot-scope="scope">
                <span>
                {{scope.row[item]}}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            :label="$t('table.operation')"
            v-else
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
        <el-form-item :label="$t('table.country')">
          <country class="filter-item" :getData="temp.country" @changeCountry="changeCountry"></country>
        </el-form-item>
        <el-form-item :label="$t('table.platform')" prop="platform">
          <platform class="filter-item" :getData="temp.platform" @changePlatform="changePlatform"></platform>
        </el-form-item>
        <el-form-item :label="$t('table.uuid')" prop="uuid">
          <el-input v-model="temp.uuid"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.tag')" prop="tag">
          <el-input v-model="temp.tag"></el-input>
        </el-form-item>
        <el-form-item :label="$t('table.slave')" prop="slave">
          <slave class="filter-item" :getData="temp.slave" @changeSlave="changeSlave"></slave>
        </el-form-item>
        <el-form-item :label="$t('table.is_idle')">
          <el-switch
            v-model="temp.is_idle"
            active-text="true"
            inactive-text="false">
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('table.is_stop')">
          <el-switch
            v-model="temp.is_stop"
            active-text="true"
            inactive-text="false">
          </el-switch>
        </el-form-item>
        <el-form-item :label="$t('table.can_recharge')">
          <el-switch
            v-model="temp.can_recharge"
            active-text="true"
            inactive-text="false">
          </el-switch>
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
  import country from '../component/country'
  import platform from '../component/platform'
  import slave from '../component/slave'

  export default {
    components: {
      country,
      platform,
      slave
    },
    props: [],
    data() {
      return {
        tableData: [],
        headData: ["platform", "slave", "tag", "uuid", "last_heartbeat", "create_time", "update_time",
          "country_name", "can_recharge", "is_idle", "status", "is_stop", "operation"],
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogStatus: "",
        temp: {
          country: 1,
          platform: 1,
          uuid: "",
          tag: "",
          slave: "",
          is_idle: true,
          is_stop: true,
          can_recharge: true
        },
        dialogFormVisible: false,
        editId: null,
        page: 1,
        capacity: 12,
        page_total: 0
      }
    },
    methods: {
      getList() {
        this.$request_any("phone/", "get", {
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
        this.page = page;
        this.getList();
      },
      createData() {
        this.dialogStatus = 'create';
        this.dialogFormVisible = true;
        this.temp = {
          country: 1,
          platform: 1,
          uuid: "",
          tag: "",
          slave: "",
          is_idle: true,
          is_stop: true,
          can_recharge: true
        }
      },
      uploadData(data) {
        this.dialogStatus = 'update';
        this.dialogFormVisible = true;
        this.temp = JSON.parse(JSON.stringify(data));
        if (data.status === 0) {
          this.temp.status = true
        } else if (data.status === 1) {
          this.temp.status = false
        }
        this.editId = data.id
      },
      toCreateData() {
        this.$request_any("phone/", "post", {
          country: this.temp.country,
          platform: this.temp.platform,
          uuid: this.temp.uuid,
          tag: this.temp.tag,
          slave: this.temp.slave,
          ip: this.temp.ip,
          is_idle: this.temp.is_idle,
          is_stop: this.temp.is_stop,
          can_recharge: this.temp.can_recharge
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
        this.$request_any("phone/" + this.editId + "/", "patch", {
          country: this.temp.country,
          platform: this.temp.platform,
          uuid: this.temp.uuid,
          tag: this.temp.tag,
          slave: this.temp.slave,
          ip: this.temp.ip,
          is_idle: this.temp.is_idle,
          is_stop: this.temp.is_stop,
          can_recharge: this.temp.can_recharge
        }).then(res => {
          this.dialogFormVisible = false;
          this.$message({
            message: 'Success!',
            type: 'success'
          });
          this.getList()
        });
      },
      changePlatform(v) {
        this.temp.platform = v.id
      },
      changeCountry(v) {
        this.temp.country = v.id
      },
      changeSlave(v) {
        this.temp.slave = v.id
      }
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
