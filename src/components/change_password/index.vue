<template>
    <el-dialog class="changepassword_" @open="open()" :title="$t('table.change_password')"  :visible.sync="showChangeDiv_">
        <div>
            <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <el-input v-model="password" :placeholder="$t('table.please_input_new_password')"></el-input>
            </div>
            <el-button class="width_100 margin_top_10" type="primary" @click="changepassword">{{$t('table.confirm')}}</el-button>
        </div>
    </el-dialog>
</template>

<script>
    export default {
        props: {
            showChangeDiv: {
                type: Boolean,
                default: () => {
                    return true
                },
            },
            userid:{
                // type:Number
            }
        },
        computed:{
            userid_(){
                return this.userid;
            },
            showChangeDiv_:{
                get(){
                    return this.showChangeDiv
                },
                set(val){
                    this.$emit("closeChangeDiv")
                },
            }
        },
        methods: {
            open(){
                this.password='';
            },
            vaify(){
                if(!this.validate_input.check(this.password,'login_password_reg')){
                    return "validate.password";
                }
                debugger;
            },
            changepassword(){
                var err_text=this.vaify();
                if(err_text){
                    this.$msg(this.$t(err_text),'error');
                    return;
                }
                this.$request_any('users/change_pwd/'+this.userid_+'/','patch',{
                    password:this.password
                }).then(res=>{
                    console.log(res);
                    this.$msg(this.$t('table.success'));
                    this.$emit("closeChangeDiv")
                })
            },
        },
        data() {
            return {
                password: ''
            }
        }
    }
</script>

<style lang='less'>
    @media screen and (min-width: 900px) {
        #rule_box .changepassword_ .el-dialog {
            width: 30%;
        }
    }
</style>