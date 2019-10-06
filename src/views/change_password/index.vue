<template>
    <div class="width_90 margin_auto">
        <div class="margin_auto media_width_40_800 margin_top_10">
            <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                <div class="media_width_40_800">{{$t('table.new_password')}}: </div>
                <el-input type="password" class="" v-model="password">
                </el-input>
            </div>
            <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                <div class="media_width_40_800">{{$t('table.confirm_password')}}: </div>
                <el-input type="password" class=""  v-model="password_">
                </el-input>
            </div>
            <el-button  size="mini" class="float_right margin_top_10" @click="checkPass()" type="primary">{{$t('table.publish')}}
            </el-button>
        </div>
    
    </div>
</template>

<script>
    export default {
        data(){
            return {
                password:'',
                password_:""
            }
        },
        methods:{
            changePassword(){
                this.$request_any('user/'+localStorage.sp_user_id+'/','patch',{password:this.password,is_active:true}).then((res)=>{
                    this.$message({
                        message: this.$t('table.success'),
                        type: 'success'
                    });
                })
            },
            checkPass(){
              //  change_password_fail:"The password is 6 to 12 bits of numbers and letters",
    // password_disunity:"Disunity of ciphers",
                if(!this.validate_input.check(this.password,'login_password_reg')){
                    this.$msg(this.$t('table.change_password_fail'),'error');
                    return;
                }else if ( this.password!=this.password_){
                    this.$msg(this.$t('table.password_disunity'),'error');
                    return;
                }
                this.changePassword();
            },
        }
    }
</script>

<style lang='less'>
    
</style>