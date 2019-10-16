<template>
    <div>
        <el-dialog
            width="1100px"
            :title="imgObj ? 'Edit' : 'Create' "
            @open="open"
            :visible.sync="showTrakPage"
        >
            <div class="display_flex media_flex_row_800 flex_align_center">
                <div class="media_width_40_800">Img Name:</div>
                <el-input type="text" v-model="name" class placeholder="Img Name"></el-input>
            </div>
            <el-upload
                :on-change="imgAdd"
                :on-remove="imgRemove"
                :file-list="file_list"
                :auto-upload="false"
                multiple
                class="upload-demo filter-item"
                action="http://3.210.32.132:19788/backend/api/v1/mt/resource/"
            >
                <el-button type="primary">click upload</el-button>
            </el-upload>
            <div slot="footer" class="dialog-footer margin_top_20">
                <el-button type="primary" @click="UpImgs()">Upload</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import editor from "../editor";
export default {
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
        imgObj: {},
        showTrap: {
            type: Boolean
        }
    },
    data() {
        return {
            name: "",
            file_list: []
        };
    },
    methods: {
        vaify() {
            if (!this.validate_input.check(this.name, "has_val")) {
                return "name can`t be null";
            }
            if (!this.file_list.length) {
                return "img cant be empty";
            }
        },
        UpImgs() {
            var fmData = new FormData();
            var error_text = this.vaify()
            if (error_text){
                this.$msg(error_text)
                return;
            }
            this.file_list.forEach(file => {
                fmData.append("file", file.raw);
            });
            
            fmData.append("name", this.name);
            this.$request_any("imgs/", "post", fmData).then(res => {
                this.$msg("上传成功");
                this.$emit("close", true)
            });
        },
        imgAdd(e) {
            this.file_list.push(e);
        },
        imgRemove(e) {
            this.file_list.forEach((img, index) => {
                if (img.name == e.name) {
                    this.file_list.splice(index, 1);
                }
            });
        },
        getHtml(v) {
            console.log(v);
            this.innerhtml = v;
        },
        open() {
            var res = this.imgObj;
            this.file_list = []
            if (res) {
                this.name = res.name;
            } else {
                this.name = "";
            }
        }
    }
};
</script>

<style lang='less'>
</style>