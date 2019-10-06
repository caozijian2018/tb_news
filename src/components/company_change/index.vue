<template>
      <el-dialog :title="$t('table.edit')"  :visible.sync="changeCompany_" @open="open">
      <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
        <div class="media_width_20_800">{{$t('table.describe')}}: </div>
         <el-input type="text" v-model="desc" class="" placeholder="Please input">
        </el-input>
      </div>
      <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
        <div class="media_width_20_800">{{$t('table.traking_domain')}}: </div>
         <el-input type="text" v-model="tracking_domain" class="" placeholder="Please input">
        </el-input>
      </div>
      <el-switch
        class="margin_top_10"
        v-model="status"
        :active-text="$t('table.active')"
        :inactive-text="$t('table.disable')">
      </el-switch>
      <div slot="footer" class="dialog-footer">
        <el-button  type="primary" @click="submitChange()">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
</template>

<script>
export default {
    props:{
        changeCompany:{
            type:Boolean,
            default:false,
        },
        companyObj:{
            type:Object
        }
    },
    computed:{
        changeCompany_:{
            get(){
                return this.changeCompany
            },
            set(){
                this.$emit("closeChange")
            }
        }
    },
    data(){
        return {
            desc:'',
            tracking_domain:'',
            status:true,
        }
    },
    methods:{
        vaify(){
            // if()
            if(!this.validate_input.check(this.desc)){
                return "validate.describe";
            }
            if(!this.validate_input.check(this.tracking_domain,'param_url')){
                return "validate.http";
            }
        },
        open(){
            var res = this.companyObj;
            this.desc = res.desc;
            this.tracking_domain = res .tracking_domain;
            this.status = res.status;
            console.log(this.companyObj);
        },
        submitChange(){
            var err_text = this.vaify();
            if(err_text){
                this.$msg(this.$t(err_text),'error');
                return;
            }
            var obj={
                desc:this.desc,
                tracking_domain:this.tracking_domain,
                status:this.status,
            }
            console.log(obj);
            this.$emit("changeCompany",obj)
        },
    }
}

</script>
<style lang='less'>
</style>