<template>
    <div class="app-container">
        <news-obj :show-trap="showTrap" @close="close" :news-obj="NewsObj"></news-obj>
        <div class="filter-container">
            <el-button
                class="filter-item add_trak"
                style="margin-left: 10px;"
                @click="CreateOrEditNews()"
                type="primary"
            >Create News</el-button>
        </div>
        <el-table :data="list" border style="width: 100%" v-loading="loading">
            <el-table-column align="center" label="title">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="innerhtml">
                <template slot-scope="scope">
                    <span>{{scope.row.innerhtml}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="readed_number">
                <template slot-scope="scope">
                    <span>{{scope.row.readed_number}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="author">
                <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="Edit">
                <template slot-scope="scope">
                    <el-button
                        type="primary"
                        class="meidia_margin_top_3"
                        @click="CreateOrEditNews(scope.row)"
                        size="small"
                        icon="el-icon-edit"
                    >Edit</el-button>
                    <el-button
                        type="danger"
                        class="meidia_margin_top_3"
                        @click="DeleteNews(scope.row.id)"
                        size="small"
                        icon="el-icon-delete"
                    >Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            :page-sizes="[12, 100, 300, 400, 1000, 2000]"
            @size-change="SizeChange"
            background
            :current-page.sync="page"
            layout="total, prev,sizes, pager, next"
            :page-size="page_size"
            :total="total"
            class="text_center margin_top_10"
            @current-change="pageChange"
        ></el-pagination>
    </div>
</template>

<script>
import newsObj from "../../components/new_comp";
export default {
    components: {
        newsObj
    },
    data() {
        return {
            list: [],
            loading: false,
            page: 1,
            page_size: 12,
            total: 0,
            file_list: [],
            showTrap: false,
            NewsObj: "",
            editor2: ""
        };
    },
    mounted() {
        this.getNewsList();
    },
    methods: {
        DeleteNews(id) {
            this.$confirm("此操作将永久删除该新闻, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    this.$request_any("news/" + id + "/", "delete").then(res => {
                        this.$message({
                            type: "success",
                            message: "删除成功!"
                        });
                        this.getNewsList()
                    });
                    
                })
            
        },
        close(v) {
            this.showTrap = false;
            if (v) {
                this.page = 1;
                this.getNewsList();
            }
        },
        CreateOrEditNews(v) {
            this.NewsObj = v;
            this.showTrap = true;
        },
        pageChange(page) {
            this.page = page;
            this.getNewsList();
        },
        SizeChange(v) {
            this.page = 1;
            this.page_size = v;
            this.getNewsList();
        },
        getNewsList() {
            this.loading = true;
            this.$request_any("news/", "get", {
                page: this.page,
                capacity: this.page_size
            }).then(res => {
                this.loading = false;
                this.list = res.results;
                this.total = res.count;
            });
        }
    }
};
</script>
<style lang='less'>
</style>
