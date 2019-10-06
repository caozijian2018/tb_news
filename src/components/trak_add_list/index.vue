<template>
    <div>
        <el-dialog :title="iscreatNew?　$t('table.create_trak'):$t('table.app_trak_edit')" @open="open()" :visible.sync="showTrak_">
            <app-list @seletApp="seletApp"  :app-id="app" v-if="iscreatNew"></app-list>
            <div class="display_flex media_flex_row_800 margin_top_10  flex_align_center">
                <div class="media_width_40_800">{{$t('table.traker_name')}} <star :not-match="required_trak_name"></star>:</div>
                <el-input type="text" v-model="name" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>
            <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.custom_param')}}: </div>
                <div class=" width_100 padding_1 tag_add_box">
                    <div class="display_flex wrop flex_jusify_space flex_align_center margin_bottom_1"   v-for="(item,index) in tag_arr" :key="item.id" :class="item.id">
                        {{item.id}} -
                        <el-input type="text" class="width_45"  v-model="item.key" :placeholder='$t("table.key")' ></el-input>
                        <el-input type="text" class="width_45"  v-model="item.dim" :placeholder='$t("table.dim")'></el-input>
                        <i class="el-icon-close cursor" @click="delTag(index)"></i>
                    </div>
                    <el-button type="primary" @click="addTag" class="width_100 margin_top_1">{{$t('table.add')}}</el-button>
                </div>
            </div>
            <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.fallback_url')}}: </div>
                <el-input type="text" v-model="fallback_url" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>

            <div v-if="!iscreatNew" class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t("table.key")}}: </div>
                <el-input type="text" readonly v-model="key" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>
            <div v-if="!iscreatNew" class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t("table.appKey2appName")}}: </div>
                <el-input type="text" readonly v-model="appKey2appName" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>

            <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.maximum_daily')}}: </div>
                <el-input type="number" v-model="cvr_daily_cap" class="" :placeholder="$t('table.representsinfinity')">
                </el-input>
            </div>
            <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                <div class="media_width_40_800">{{$t('table.repeat_clk_cnt')}}: </div>
                 <el-input type="number" v-model="repeat_clk_cnt" class="" :placeholder="$t('table.representsinfinity')">
                </el-input>
            </div>
            <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                <div class="media_width_40_800">{{$t('table.daily_max_clk')}}: </div>            
                 <el-input type="number" v-model="daily_max_clk" class="" :placeholder="$t('table.representsinfinity')">
                </el-input>
            </div>
            <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                <div class="media_width_40_800">{{$t('table.dest_url')}}: </div>            
                 <el-input type="text" v-model="dest_url" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>

            <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                <div class="media_width_40_800">{{$t("table.campaign")}}: </div>            
                 <el-input type="text" v-model="campaign" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>
            <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                <div class="media_width_40_800">{{$t("table.adgroup")}}: </div>            
                 <el-input type="text" v-model="adgroup" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>
            <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                <div class="media_width_40_800">{{$t("table.creative")}}: </div>            
                 <el-input type="text" v-model="creative" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>
            <!-- <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.regular_array')}}: </div>
                <div class=" width_100 padding_1 tag_add_box">
                    <div class="display_flex wrop flex_jusify_space flex_align_center margin_bottom_1"   v-for="(item,index) in reg_arr" :key="index">
                        <el-input type="text" class="width_45"  v-model="item.key" :placeholder="$t('table.reg_name')"></el-input>
                        <el-input type="text" class="width_45"  v-model="item.exp" :placeholder="$t('table.reg_value')"></el-input>
                        <i class="el-icon-close cursor" @click="delRag(index)"></i>
                    </div>
                    <el-button type="primary" @click="addReg" class="width_100 margin_top_1">{{$t('table.add')}}</el-button>
                </div>
            </div> -->
            
            <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.postback_url')}}: </div>
                <!-- URL tag -->
                <url-tag @getUrlBack="getUrlBack" class="width_100" :postback-url="postback_url" ref="ultag"></url-tag>
            </div>
             <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.jump_out_repeating_switch')}}: </div>
                <el-switch class="margin_top_10 width_100" v-model="jump_distinct_status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                </el-switch>
            </div>
             <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.elimination_repeating_switch')}}: </div>
                <el-switch class="margin_top_10 width_100"  v-model="distinct_cvr_postback_status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                </el-switch>
            </div>
            <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.jump_switch')}}: </div>
                <el-switch class="margin_top_10 width_100" v-model="jump_status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                </el-switch>
            </div>
            <!-- <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800"> {{$t('table.status')}}: </div>
                <el-switch class="margin_top_10 width_100" v-model="status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                </el-switch>
            </div> -->
             <div slot="footer" class="dialog-footer">
                 <!-- <el-switch class="margin_top_10" v-model="status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                </el-switch> -->
                <el-button type="primary" @click="createApp()">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import urlTag from "../url_tag"
    import appList from "../app_list"
    import {deepObjectCopy} from "../../utils"
    import star from "../star";
    export default {
        components:{
            urlTag,
            appList,
            star
        },
        props:{
            showTrak:{
                type:Boolean
            },
            trakObj:{
                type:Object
            }
        },
        computed:{
            showTrak_:{
                get(){return this.showTrak},
                set(){
                    this.$emit("closeTrak")
                },
            }
        },
        data(){
            return {
                dest_url:'',
                required_trak_name:false,
                appKey2appName:'',
                key:'',
                iscreatNew:false,
                app_arr:[],
                name:'',
                tag_arr :[], 
                app:'',
                jump_status:true,
                status:true,
                global_jump_status:true,	//全局跳转开关
                fallback_url:'',//Fallback URL
                cvr_daily_cap:0,//	每日最大转化个数,默认为0,代表不限制
                dev_distinct_status:true,	//设备排重开关
                distinct_cvr_postback_status:true,
                jump_distinct_status:true,	//跳转排重开关
                cvr_dev_distinct_rollback_time:90,//	转化设备排重回溯时间, 单位天, 最长90天, 默认90天, 存储为秒
                match_time:30,//	匹配时间窗口，默认30天，最长30天, 存储为秒
                batch_cvr_postback_status:true,//	批量转化回传开关
                postback_url:[],	//全局转化PostBack URL, 可以配置1-5个,以;隔开
                cvr_event_postback_url:'',	//转化事件回传API URL
                enable_repeat_clk:false,
                repeat_clk_cnt:0,
                daily_max_clk:0,
                campaign:'',
                adgroup:'',
                creative:"",
                reg_arr:[],
            }
        },
        methods:{
            seletApp(val){
                this.app=val;
            },
            open(){
                var trakObj=this.trakObj;
                if(!trakObj) {
                  this.iscreatNew=true;
                  this.setTrakEmpty();
                }else{
                this.iscreatNew=false;
                this.name=trakObj.name;
                var tag_arr=deepObjectCopy(trakObj.custom_param);
                var val=Object.values(tag_arr);
                var keys= Object.keys(tag_arr);
                for(var key_ in val){
                    val[key_].id=keys[key_]
                }
                this.tag_arr=val;
                // var reg_arr=deepObjectCopy(trakObj.dev_validators);
                // this.reg_arr=reg_arr;
                console.log('ssss');
                // console.log(this.reg_arr);
                if(this.$refs.ultag){
                        this.$refs.ultag.dynamicTags=trakObj.postback_url;
                    }
                this.postback_url=deepObjectCopy(trakObj.postback_url);
                this.fallback_url=trakObj.fallback_url;
                this.app=trakObj.app;
                this.cvr_daily_cap=trakObj.cvr_daily_cap;
                this.dev_distinct_status=trakObj.dev_distinct_status;	//设备排重开关
                this.distinct_cvr_postback_status=trakObj.distinct_cvr_postback_status;	//设备排重开关
                this.jump_distinct_status=trakObj.jump_distinct_status;	//设备排重开关
                this.cvr_dev_distinct_rollback_time=trakObj.cvr_dev_distinct_rollback_time/24/3600;	//设备排重开关
                this.match_time=trakObj.match_time/24/3600;	//设备排重开关
                this.batch_cvr_postback_status=trakObj.batch_cvr_postback_status;///24/3600,	//设备排重开关
                this.cvr_event_postback_url=trakObj.cvr_event_postback_url ;
                this.jump_status=trakObj.jump_status ;
                this.repeat_clk_cnt=trakObj.repeat_clk_cnt;
                this.daily_max_clk=trakObj.daily_max_clk;
                var src_level=trakObj.src_level;
                this.status = trakObj.status;
                this.appKey2appName=trakObj.appName+"("+trakObj.appKey+")";
                this.key=trakObj.key;
                this.campaign=src_level.campaign;
                this.adgroup=src_level.adgroup;
                this.creative=src_level.creative;
                this.dest_url=trakObj.dest_url;
                };
            },
            getUrlBack(res){
               this.postback_url=res;
            },
             setTrakEmpty(){
                    if(this.$refs.ultag){
                        this.$refs.ultag.dynamicTags=[];
                    }
                    this.dest_url='';
                    this.tag_arr=[];
                    this.fallback_url='';
                    this.name="";
                    this.cvr_daily_cap="";
                    this.dev_distinct_status=true,	//设备排重开关
                    this.distinct_cvr_postback_status=true,	//设备排重开关
                    this.jump_distinct_status=true;	//设备排重开关
                    this.cvr_dev_distinct_rollback_time=90,	//设备排重开关
                    this.match_time=30,	//设备排重开关
                    this.batch_cvr_postback_status=true///24/3600,	//设备排重开关
                    this.cvr_event_postback_url=''
                    this.jump_status=true;
                    this.postback_url=[];
                    this.app="";
                    this.repeat_clk_cnt=null;
                    this.daily_max_clk="";
                    this.campaign='';
                    this.adgroup='';
                    this.creative="";
                    // this.reg_arr=[];
            },
            delTag(index){
                this.tag_arr.splice(index,1);
            },
            delRag(index){
                this.reg_arr.splice(index,1);
            },
            confirmCindex(){
                var tag_arr=this.tag_arr;
                for(var i=1;i<11;i++){
                    var tag_arr_index_has=true;
                    for(var j=0;j<tag_arr.length;j++){
                        if(tag_arr[j].id=='c'+i){
                            tag_arr_index_has=false;
                            if(i==5){
                                return false;
                            }
                            break;
                        }
                    }
                    if(tag_arr_index_has){
                        return i
                    }
                }
            },
            vaify(){
                if(!this.validate_input.check(this.app)){
                    return "validate.app"
                }
                // tag_arr
                if (!this.validate_input.check(this.name)){ 
                    this.required_trak_name=true;
                    return 'validate.name_empth'
                };
                if(this.name=="organic") {
                    return "The default name for the system is not allowed (roganic)"
                }
                for(var val of this.tag_arr){
                    if(!(this.validate_input.check(val.key)&&this.validate_input.check(val.dim))){
                        return "validate.tag_empty";
                    }
                }
                if((
                    ( this.cvr_daily_cap < 0 ) ||
                    ( this.repeat_clk_cnt < 0 ) ||
                    ( this.daily_max_clk < 0))){
                    return "validate.numer"
                }
                if(this.validate_input.check(this.fallback_url,'has_val') && !this.validate_input.check(this.fallback_url,'param_url')){
                    return "validate.fallback_url"
                }
                if(this.validate_input.check(this.dest_url,'has_val') && !this.validate_input.check(this.dest_url,'param_url')){
                    return "validate.dest_url"
                }
                for(var val of this.reg_arr){
                    if(! (this.validate_input.check(val.key))){
                        return "validate.reg";
                    }
                }
               // if (!this.postback_url.length) return 'post url can`t be empty'
               
                for(var val of this.postback_url){
                    if(!this.validate_input.check(val,'param_url')){
                        return "validate.http";
                    }
                }
            },
            addTag(){
               var tag_arr=this.tag_arr;
               var hasIndex =this.confirmCindex();
                if(hasIndex){
                    tag_arr.push({key:'',dim:"" ,id:'c'+hasIndex});
                }else{
                    this.$message.error('fail')
                }
            },
            addReg(){
                this.reg_arr.push({
                    regname:"",
                    reg:'',
                })
            },
            createApp(){
                var err_text=this.vaify();
                debugger;
                if(err_text){
                    this.$message.error(this.$t(err_text));
                    return;
                }
                var tag_arr=this.tag_arr;
                var obj={};
                for(var val of tag_arr){
                  var key= val.key; 
                  var dim= val.dim 
                   obj[val.id]={key,dim}
                }
                var stringifys_tag=JSON.stringify(obj);
                this.$emit('creatTrak',{
                    name:this.name,
                    custom_param:stringifys_tag,
                    jump_status:this.jump_status,
                    fallback_url:this.fallback_url,
                    cvr_daily_cap:this.cvr_daily_cap > 0 ? this.cvr_daily_cap : 0,	 //
                    jump_distinct_status:this.jump_distinct_status,
                    postback_url:JSON.stringify(this.postback_url),
                    distinct_cvr_postback_status:this.distinct_cvr_postback_status,
                    status:this.status,
                    app:this.app,
                    repeat_clk_cnt:this.repeat_clk_cnt > 0 ? this.repeat_clk_cnt : 0, //
                    daily_max_clk:this.daily_max_clk > 0 ? this.daily_max_clk : 0,   //
                    src_level:JSON.stringify({
                        campaign : this.campaign ? this.campaign : 'campaign',
                        adgroup:this.adgroup ? this.adgroup : 'adgroup',
                        creative:this.creative ? this.creative : 'creative',
                    }),
                    dev_validators:JSON.stringify(this.reg_arr),
                    dest_url:this.dest_url ? this.dest_url : '',
                })
            }
        }
    }
</script>

<style lang='less'>
    .tag_add_box{
        border:1px solid #ddd;
        border-radius:4px;
    }
</style>