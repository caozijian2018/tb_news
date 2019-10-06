<template>
    <div id="el-tag">
        <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)">
            {{tag}}
        </el-tag>
        <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
    </div>
</template>

<script>
    export default {
        props:{
            postbackUrl:{
                type:Array,
                default(){
                    return [];
                }
            }
        },
        data() {
            return {
                dynamicTags: this.postbackUrl,
                inputVisible: false,
                inputValue: ''
            };
        },
        watch:{
            postbackUrl(val){
                // alert(val);
                this.dynamicTags=val;
            }
        },
        methods: {
            handleClose(tag) {
                this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1);
                this.$emit("getUrlBack",this.dynamicTags);
            },
    
            showInput() {
                this.inputVisible = true;
                this.$nextTick(_ => {
                    this.$refs.saveTagInput.$refs.input.focus();
                });
            },
    
            handleInputConfirm() {
                let inputValue = this.inputValue;
                if (inputValue) {
                    this.dynamicTags.push(inputValue);
                }
                this.$emit("getUrlBack",this.dynamicTags);
                this.inputVisible = false;
                this.inputValue = '';
            }
        }
    }
</script>

<style lang="less">
#el-tag{
    .el-tag{
        margin-right:10px;
    }
    .el-tag+.el-tag {
        margin-left: 0px;
        margin-right:10px;
        margin-bottom:10px;
        margin-top:10px;

    }
    
    .button-new-tag {
        margin-left: 0px;
        height: 32px;
        margin-right:10px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    
    .input-new-tag {
        width: 90px;
        margin-left: 0px;
        margin-right:10px;
        // margin-bottom:10px;
        // margin-top:10px;
        // vertical-align: bottom;
    }
}
</style>