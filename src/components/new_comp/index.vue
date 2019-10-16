<template>
    <div>
        <el-dialog
            width="1100px"
            :title="NewsObj ? 'Edit' : 'Create' "
            @open="open"
            :visible.sync="showTrakPage"
        >
            <div class="display_flex media_flex_row_800 flex_align_center">
                <div class="media_width_40_800">Title:</div>
                <el-input type="text" v-model="title" class placeholder="title"></el-input>
            </div>
            <div class="margin_top_20 display_flex media_flex_row_800 flex_align_center">
                <div class="media_width_40_800">Author:</div>
                <el-input type="text" v-model="author" class placeholder="author"></el-input>
            </div>
            <editor class="margin_top_20" @getHtml="getHtml" :innerhtml="innerhtml"></editor>
            <div slot="footer" class="dialog-footer margin_top_20">
                <el-button @click="Uphtml()">上传html</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import editor from "../editor";
export default {
    mounted() {
        console.log("rerere");
    },
    components: {
        editor
    },
    computed: {
        showTrakPage: {
            get() {
                return this.showTrap;
            },
            set(val) {
                this.$emit("close", val);
            }
        }
    },
    props: {
        NewsObj: {},
        showTrap: {
            type: Boolean
        }
    },
    data() {
        return {
            title: "",
            author: "",
            innerhtml: ""
        };
    },
    methods: {
        vaify() {
            if (!this.validate_input.check(this.title, "has_val")) {
                return "title can`t be null";
            }
            if (!this.validate_input.check(this.author, "has_val")) {
                return "author can`t be null";
            }
            if (!this.validate_input.check(this.innerhtml, "has_val")) {
                return "innerhtml can`t be null";
            }
        },
        getHtml(v) {
            console.log(v);
            this.innerhtml = v;
        },
        Uphtml() {
            var error_text = this.vaify();
            if(error_text){
                this.$msg(error_text)
                return;
            }
            var url = this.NewsObj ? `news/${this.NewsObj.id}/` : "news/"
            var type = this.NewsObj ? "patch" : "post";
            this.$request_any(url, type, {
                title: this.title,
                author: this.author,
                innerhtml: this.innerhtml
            }).then(res => {
                console.log(3333);
                this.$emit("close", true)
            });
        },
        open() {
            var res = this.NewsObj;
            console.log(res);
            if (res) {
                this.title = res.title;
                this.author = res.author;
                this.innerhtml = res.innerhtml;

            } else {
                this.title = '';
                this.author = '';
                this.innerhtml = '';
            }
        },
        createOrupDataApp() {
            var params_obj = {
                name: 123
            };
            var err_text = this.vaify();
            if (err_text) {
                this.$msg(err_text, "error");
                return;
            }
            var url = this.NewsObj
                ? "publisher/" + this.NewsObj.id + "/"
                : "publisher";
            var method = this.NewsObj ? "patch" : "post";
            this.$request_any(url, method, params_obj).then(res => {
                this.$msg("success!");
                setTimeout(() => {
                    this.$emit("close", true);
                }, 2000);
            });
        }
    }
};
</script>

<style lang='less'>
</style>