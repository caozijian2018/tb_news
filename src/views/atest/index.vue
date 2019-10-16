<template>
    <div>
        <div id="div3" ref="www">

        </div>
        <button @click="showHtml()">
            显示内容111
        </button>
        <button @click="Uphtml()">
            上传html
        </button>
        <button @click="login()">
            login
        </button>
        
    </div>
</template>

<script>
import E from 'wangeditor'

export default {
    mounted(){
        this.editor2 = new E('#div3')
        this.editor2.create()
    },
    data() {
        return {
            editor2: "",
            file_list: [],
            fileList: [
                {
                    name: "wwww.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                },
                {
                    name: "food2.jpeg",
                    url:
                        "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
                }
            ]
        };
    },
    methods: {
        showHtml(){
            alert(1)
            console.log(document.querySelector("#div3"))
            console.log(this.$refs.www)
            console.log(this.editor2.txt.html())
        },
        Uphtml() {
            this.$request_any("news/", "post", {title: "习近平访问TB", author:"xxx",innerhtml: this.editor2.txt.html()}).then(
                res => {
                    console.log(res);
                }
            );
        },
        login() {
            this.$request_any("login/", "post", {full_name:"caocao",password: "a12345678"}).then(
                res => {
                    console.log(res);
                }
            );
        },
        UpExcel() {
            let fmData = new FormData();
            this.file_list.forEach(file => {
                fmData.append("file", file.raw);

            });
            fmData.append("name", "你好世界")
            this.$request_any("imgs/", "post", fmData).then(
                res => {
                    console.log(res);
                    this.$msg(
                        $t("table.upload_tracker_count").replace(
                            "{}",
                            res.count
                        )
                    );
                }
            );
            debugger;
        },
        imgRemove(e) {
            this.file_list.forEach((img, index) => {
                if (img.name == e.name) {
                    this.file_list.splice(index, 1);
                }
            });
        },
        imgAdd(e) {
            this.file_list.push(e);
        },
        submitUpload() {
            this.$refs.upload.submit();
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        }
    }
};
</script>
<style lang='less'>
</style>

