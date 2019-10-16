<template>
    <div>
        <div id="div4"></div>
    </div>
</template>

<script>
import E from "wangeditor";
export default {
    props: {
        innerhtml: {
            type: String,
            default: ""
        }
    },
    mounted() {
        this.editor2 = new E("#div4");
        this.editor2.customConfig.onchangeTimeout = 1000;
        this.editor2.customConfig.onchange = (html) => {
            this.$emit("getHtml",this.editor2.txt.html())
        }
        this.editor2.create();
        this.editor2.txt.html(this.innerhtml)
    },
    data(){
        return {
            editor2: ""
        }
    },
    watch: {
        innerhtml(newv, oldv){
            this.editor2.txt.html(newv)
        },
    },
    methods: {
        // showHtml(){
        //     console.log(this.editor2.txt.html())
        // },
    }

};
</script>
<style lang='less'>
</style>