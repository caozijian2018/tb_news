<template>
    <div>
        <add-user-or-update :item-obj="itemObj" :show-box="showBox" @close="close"></add-user-or-update>
        <div class="app-container">
            <div class="filter-container text_right">
                <el-button size="large" type="primary" @click="addOrUpdate()">Add User</el-button>
            </div>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column align="center" prop="username" label="username">
                </el-table-column>
                <el-table-column align="center" prop="email" label="email">
                </el-table-column>
                <el-table-column align="center" prop="user_type" label="user_type">
                </el-table-column>
                <el-table-column align="center" prop="company" label="company">
                </el-table-column>
                <el-table-column align="center" label="company">
                    <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="addOrUpdate( scope.row )">Edit</el-button>
</template>
                </el-table-column>
            </el-table>
            <el-pagination background layout="prev, pager, next" :page-size="12" :total="count" class="text_center margin_top_10" @current-change="getUserList">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import AddUserOrUpdate from "./components/index"
    
    export default {
        components: {
            AddUserOrUpdate
        },
        mounted() {
            this.getUserList();
        },
        data() {
            return {
                tableData: [],
                showBox: false,
                itemObj: null,
                count: 0,
            }
        },
        methods: {
            close(res) {
                this.showBox = false;
                if (res) {
                    this.getUserList()
                }
            },
            addOrUpdate(res) {
                this.itemObj = res ? res : null;
                this.showBox = true;
            },
            getUserList(page = 1) {
                this.$request_any("user/", 'get', {
                    page,
                    capacity: 12
                }).then(res => {
                    console.log(res);
                    this.count = res.data.count;
                    this.tableData = res.data.results;
                })
            }
        }
    }
</script>

<style lang='less'>
    
</style>