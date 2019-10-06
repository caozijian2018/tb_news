<template>
    <div>
        <el-dialog :title="trakObj ? $t('table.edit_app') : $t('table.create_app') " @open="open" :visible.sync="showTrakPage">
            <!-- 系统级别的app设置 -->
            <div v-if="isAppSystemSetting">
                <div class="display_flex media_flex_row_800  flex_align_center">
                    <div class="media_width_40_800">{{$t('table.app_name')}}: </div>
                    <el-input type="text" v-model="name" class="" :placeholder="$t('table.please_input')">
                    </el-input>
                </div>
                <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                    <div class="media_width_40_800">{{$t('addapp.platform')}}: </div>
                    <el-select class="filter-item width_100" v-if="platform_list" v-model="platform_value">
                        <el-option v-for="item in platform_list" :key="item.value" :label="item.platform" :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                    <div class="media_width_40_800">{{$t('addapp.packge_or_website')}}: </div>
                    <el-input type="text" class="" v-model="package_name" :placeholder="$t('table.please_input')">
                    </el-input>
                </div>
                <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                    <div class="media_width_40_800">{{$t('table.dest_url')}}: </div>
                    <el-input type="text" v-model="dest_url" class="" :placeholder="$t('table.please_input')">
                    </el-input>
                </div>
                <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                    <div class="media_width_40_800">{{$t('table.status')}}: </div>
                    <el-switch class="margin_top_10 width_100" v-model="status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                    </el-switch>
                </div>
            </div>
            <!-- 非系统级别的app设置 -->
            <div v-else>
                <!-- <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                    <div class="media_width_40_800">{{$t('table.repeat_click')}}: </div>
                    <el-switch class="margin_top_10" v-model="enable_repeat_clk" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                    </el-switch>
                </div> -->
    
                <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                    <div class="media_width_40_800">{{$t('table.repeat_clk_cnt')}}: </div>
                    <el-input type="number" v-model="repeat_clk_cnt" class="" :placeholder="$t('table.representsinfinity')">
                    </el-input>
                </div>
                <!-- enable_repeat_clk:false,
                    repeat_clk_cnt:false, -->
                <!--  -->
                <div class="display_flex media_flex_row_800 margin_top_10 flex_align_center">
                    <div class="media_width_40_800">{{$t("table.fallback_url")}}: </div>
                    <el-input type="text" v-model="fallback_url" class="" :placeholder="$t('table.please_input')">
                    </el-input>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t('table.cvr_daily_cap')}}: </div>
                    <el-input type="number" v-model="cvr_daily_cap" class="" :placeholder="$t('table.representsinfinity')">
                    </el-input>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t("table.cvr_dev_distinct_rollback_time")}}: </div>
                    <el-input type="number" v-model="cvr_dev_distinct_rollback_time" class="" :placeholder="$t('table.representsinfinity')">
                    </el-input>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t("table.match_time")}}: </div>
                    <el-input type="number" v-model="match_time" class="" :placeholder="$t('table.representsinfinity')">
                    </el-input>
                </div>
                 <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t("table.daily_maxnum_click")}}: </div>
                    <el-input type="number" v-model="daily_max_clk" class="" :placeholder="$t('table.representsinfinity')">
                    </el-input>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t("table.post_back_url")}}: </div>
                    <url-tag class="width_100" @getUrlBack="getUrlBack" :postbackUrl="postback_url"></url-tag>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t("table.global_jump_status")}}: </div>
                    <el-switch class="margin_top_10 width_100" v-model="global_jump_status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                    </el-switch>
                </div>
    
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t("table.dev_distinct_status")}}: </div>
                    <el-switch class="margin_top_10 width_100" v-model="dev_distinct_status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                    </el-switch>
                </div>
    
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t("table.jump_distinct_status")}}: </div>
                    <el-switch class="margin_top_10 width_100" v-model="jump_distinct_status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                    </el-switch>
                </div>
    
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">{{$t("table.batch_cvr_postback_status")}}: </div>
                    <el-switch class="margin_top_10 width_100" v-model="batch_cvr_postback_status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                    </el-switch>
                </div>
            </div>
            <div v-if="trakObj">
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                        <div class="media_width_40_800">{{$t('table.key')}}: </div>
                        <el-input type="text" v-model="key" readonly class="" placeholder="Please input">
                        </el-input>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                        <div class="media_width_40_800">{{$t('table.token')}}: </div>
                        <el-input type="text" v-model="token" readonly class="" placeholder="Please input">
                        </el-input>
                </div>
               
            </div>
            <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">{{$t('table.regular_array')}}: </div>
                <div class=" width_100 tag_add_box">
                    <div class="display_flex wrop flex_jusify_space flex_align_center margin_bottom_1"   v-for="(item,index) in reg_arr" :key="index">
                        <el-input type="text" class="width_45"  v-model="item.key" :placeholder="$t('table.reg_name')"></el-input>
                        <el-input type="text" class="width_45"  v-model="item.exp" :placeholder="$t('table.reg_value')"></el-input>
                        <i class="el-icon-close cursor" @click="delRag(index)"></i>
                    </div>
                    <el-button type="primary" @click="addReg" class="width_100 margin_top_1">{{$t('table.add')}}</el-button>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="createOrupDataApp()">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import platform_list from "../../utils/platform"
    import {deepObjectCopy} from "../../utils"
    import urlTag from "../url_tag"
    export default {
        components: {
            urlTag
        },
        computed: {
            showTrakPage: {
                get() {
                    return this.showTrap
                },
                set(val) {
                    this.$emit('close', val);
                }
            }
        },
        props: {
            showTrap: {
                type: Boolean,
            },
            trakObj: {
                type: Object
            },
            isAppSystemSetting: {
                type: Boolean,
            }
        },
        data() {
            return {
                reg_arr:[],
                name: "",
                platform_list: platform_list,
                platform_value: '',
                package_name: "",
                status: true,
                dest_url: "",
                repeat_clk_cnt: '',
                global_jump_status: true, //全局跳转开关
                fallback_url: '', //Fallback URL
                cvr_daily_cap: '', //	每日最大转化个数,默认为0,代表不限制
                dev_distinct_status: true, //设备排重开关
                jump_distinct_status: true, //跳转排重开关
                cvr_dev_distinct_rollback_time: 90, //	转化设备排重回溯时间, 单位天, 最长90天, 默认90天, 存储为秒
                match_time: 30, //	匹配时间窗口，默认30天，最长30天, 存储为秒
                batch_cvr_postback_status: true, //	批量转化回传开关
                postback_url: [], //全局转化PostBack URL, 可以配置1-5个,以;隔开
                cvr_event_postback_url: '', //转化事件回传API URL
                daily_max_clk:'',
                key:'',
                token:"",
            }
        },
        methods: {
            addReg(){
                this.reg_arr.push({
                    key:"",
                    exp:'',
                })
            },
            delRag(index){
                this.reg_arr.splice(index,1);
            },
            open() {
                var res = this.trakObj;
                if (res) {
                    this.global_jump_status = res.global_jump_status;
                    this.fallback_url = res.fallback_url;
                    this.cvr_daily_cap = res.cvr_daily_cap; //	每日最大转化个数,默认为0,代表不限制
                    this.dev_distinct_status = this.dev_distinct_status; //设备排重开关
                    this.jump_distinct_status = res.jump_distinct_status; //跳转排重开关
                    this.cvr_dev_distinct_rollback_time = res.cvr_dev_distinct_rollback_time / 24 / 3600; //	转化设备排重回溯时间, 单位天, 最长90天, 默认90天, 存储为秒
                    this.match_time = res.match_time / 24 / 3600; //	匹配时间窗口，默认30天，最长30天, 存储为秒
                    this.batch_cvr_postback_status = res.batch_cvr_postback_status; //	批量转化回传开关
                    this.postback_url = res.postback_url; //全局转化PostBack URL, 可以配置1-5个,以;隔开
                    this.name = res.name;
                    this.platform_value = res.platform;
                    this.package_name = res.package_name;
                    this.status = res.status;
                    this.dest_url = res.dest_url;
                    this.repeat_clk_cnt = res.repeat_clk_cnt;
                    this.daily_max_clk=res.daily_max_clk;
                    this.key=res.key;
                    this.token=res.token;
                    var reg_arr=deepObjectCopy(res.dev_validators);
                    this.reg_arr=reg_arr;
                } else {
                    this.global_jump_status = true;
                    this.fallback_url = '';
                    this.cvr_daily_cap = 0; //	每日最大转化个数,默认为0,代表不限制
                    this.dev_distinct_status = false; //设备排重开关
                    this.jump_distinct_status = false; //跳转排重开关
                    this.cvr_dev_distinct_rollback_time = 90; //	转化设备排重回溯时间, 单位天, 最长90天, 默认90天, 存储为秒
                    this.match_time = 30; //	匹配时间窗口，默认30天，最长30天, 存储为秒
                    this.batch_cvr_postback_status = true; //	批量转化回传开关
                    this.postback_url = []; //全局转化PostBack URL, 可以配置1-5个,以;隔开
                    this.name = '';
                    this.platform_value = 0;
                    this.package_name = '';
                    this.status = true;
                    this.dest_url = '';
                    this.repeat_clk_cnt = 0;
                    this.daily_max_clk=0;
                    this.reg_arr=[];
                }
            },
            getUrlBack(res) {
                this.postback_url = res;
            },
            vaify(){
                if(this.isAppSystemSetting){
                    if(!this.validate_input.check(this.name)){
                        return "validate.app_name";
                    }
                    if(!this.validate_input.check(this.package_name)){
                        return "validate.package_name_empty";
                    }
                    if(!this.validate_input.check(this.dest_url,'param_url')){
                        return "validate.dest_url";
                    }
                //    var is_right_dest_url_name = this.validate_input.check(this.dest_url);
                }else{
                    if(this.validate_input.check(this.fallback_url , 'has_val' ) && !this.validate_input.check(this.fallback_url,'param_url')){
                        return "validate.fallback_url";
                    }
                    if(
                        ( this.repeat_clk_cnt < 0 ) || 
                        ( this.cvr_dev_distinct_rollback_time < 0 )  || 
                        ( this.match_time < 0 ) || 
                        ( this.daily_max_clk < 0) || 
                        ( this.cvr_daily_cap < 0 )
                    ){
                        return "validate.numer"
                    }
                    for(var val of this.postback_url){
                        if(!this.validate_input.check(val,'param_url')){
                            return "validate.post_back_url"
                        }
                    }
                    // postback_url
                    // cvr_daily_cap cvr_dev_distinct_rollback_time match_time daily_max_clk
                }
            },
            createOrupDataApp() {
                var params_obj={
                    name: this.name,
                    platform: this.platform_value,
                    package_name: this.package_name,
                    status: this.status,
                    dest_url: this.dest_url,
                    global_jump_status: this.global_jump_status,
                    fallback_url: this.fallback_url,
                    cvr_daily_cap: this.cvr_daily_cap > 0 ? this.cvr_daily_cap :0, //
                    dev_distinct_status: this.dev_distinct_status,
                    jump_distinct_status: this.jump_distinct_status,
                    cvr_dev_distinct_rollback_time: this.cvr_dev_distinct_rollback_time > 0 ?  this.cvr_dev_distinct_rollback_time * 24 * 3600 : 90 * 24 *3600, //
                    match_time: this.match_time > 0 ?  this.match_time * 24 * 3600 : 30 * 24 *3600, //
                    batch_cvr_postback_status: this.batch_cvr_postback_status,
                    postback_url: JSON.stringify(this.postback_url),
                    repeat_clk_cnt: this.repeat_clk_cnt > 0 ? this.repeat_clk_cnt :0, //
                    daily_max_clk:this.daily_max_clk > 0 ? this.daily_max_clk :0,   //

                    dev_validators:JSON.stringify(this.reg_arr),
                };
                debugger;
                var  err_text=this.vaify();
                if(err_text){
                    this.$msg(this.$t(err_text),'error');
                    return;
                }
                this.$emit('createOrupDataApp', params_obj);
            }
        }
    }
</script>

<style lang='less'>
    
</style>