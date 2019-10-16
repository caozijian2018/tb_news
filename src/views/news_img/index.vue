<template>
    <div class="app-container">
        <create-or-edit-img @close="close" :show-trap="showTrap" :img-obj="imgObj"></create-or-edit-img>
        <div class="filter-container">
            <el-button
                class="filter-item add_trak"
                style="margin-left: 10px;"
                @click="changeOrEditImg()"
                type="primary"
            >Create Img</el-button>
        </div>
        <el-table :data="list" border style="width: 100%" v-loading="loading">
            <el-table-column align="center" label="name">
                <template slot-scope="scope">
                    <span>{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="img">
                <template slot-scope="scope">
                    <img style="width: 100px;" :src="'http://106.52.237.64:12000/backend/static/'+scope.row.package" alt />
                </template>
            </el-table-column>
            <el-table-column align="center" label="img">
                <template slot-scope="scope">
                    <span>{{'http://106.52.237.64:12000/backend/static/'+scope.row.package}}</span>
                </template>
            </el-table-column>
            <!-- <el-table-column align="center" label="Edit">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        class="meidia_margin_top_3"
                        @click="changeOrEditImg(scope.row)"
                        size="small"
                        icon="el-icon-edit"
                    >Edit</el-button>
                </template>
            </el-table-column> -->
        </el-table>
        <el-pagination
            :page-sizes="[12, 100, 300, 400, 1000, 2000]"
            @size-change="SizeChange"
            background
            :current-page.sync="page"
            layout="total, prev,sizes, pager, next"
            :page-size="page_size"
            :total="count"
            class="text_center margin_top_10"
            @current-change="pageChange"
        ></el-pagination>
    </div>
</template>

<script>
import CreateOrEditImg from "../../components/img_comp"
export default {
    components:{
        CreateOrEditImg
    },
    data() {
        return {
            list: [],
            loading: false,
            page: 1,
            page_size: 12,
            count: 0,
            showTrap: false,
            imgObj: ""
        };
    },
    mounted() {
        this.getImgsList();
    },
    methods: {
        close(v){
            this.showTrap = false;
            if (v){
                this.getImgsList();
            }
        },
        pageChange(page) {
            this.page = page;
            this.getImgsList();
        },
        SizeChange(v) {
            this.page = 1;
            this.page_size = v;
            this.getImgsList()
        },
        changeOrEditImg(v) {
            this.imgObj = v;
            this.showTrap = true
        },
        getImgsList() {
            this.loading = true;
            this.$request_any("imgs/", "get", {
                page: this.page,
                capacity: this.page_size
            }).then(res => {
                this.loading = false;
                this.list = res.results;
                this.count = res.count;
            });
        },
         
    }
};
</script>
<style lang='less'>
</style>
