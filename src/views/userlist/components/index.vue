<template>
    <div>
        <el-dialog :title="itemObj?'修改':'新增'" @open="open()" :visible.sync="showBox_">
            <div v-if="!itemObj">
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">username: </div>
                    <el-input type="text" v-model="username" class="" :placeholder="$t('table.please_input')">
                    </el-input>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">email: </div>
                    <el-input type="text" v-model="email" class="" :placeholder="$t('table.please_input')">
                    </el-input>
                </div>
    
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">user_type: </div>
                    <!-- <el-input type="text" v-model="user_type" class="" :placeholder="$t('table.please_input')">
                    </el-input> -->
                    <user-type :user-type-id="user_type" @userTypeChange="userTypeChange"></user-type>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800 company">company: </div>
                    <!--<el-input type="text" v-model="company" class="" :placeholder="$t('table.please_input')">-->
                    <!--</el-input>-->
                    <el-select v-model="company" filterable placeholder="company" clearable>
                      <el-option  v-for="item in companyArr"
                                  :key="item.id"
                                  :label="item.name"
                                  :value="item.id"
                      ></el-option>
                    </el-select>
                </div>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">country_id: </div>
                    <!-- <el-input type="text" v-model="country_id" class="" :placeholder="$t('table.please_input')">
                    </el-input> -->
                  <el-select filterable v-model='country_id' clearable class="width_100">
                    <el-option v-for="item in country_list" :key="item.code" :label="item.code" :value="item.id">
                    </el-option>
                  </el-select>
                    <!--<select-country class="width_100" :country-id="country_id" @countryChange="countryChange"></select-country>-->
                </div>
    
    
            </div>
            <div v-else>
                <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                    <div class="media_width_40_800">status: </div>
                    <div>
                        <el-switch class="margin_top_10" v-model="status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                        </el-switch>
                    </div>
                </div>
            </div>
            <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
                <div class="media_width_40_800">password: </div>
                <el-input type="text" v-model="password" class="" :placeholder="$t('table.please_input')">
                </el-input>
            </div>
    
    
    
            <div slot="footer" class="dialog-footer">
                <!-- <el-switch class="margin_top_10" v-model="status" :active-text="$t('table.active')" :inactive-text="$t('table.disable')">
                                    </el-switch> -->
                <el-button type="primary" @click="createOrUpdate()">{{$t('table.confirm')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import selectCountry from "../../../components/country"
    import userType from "../../../components/user_type"

     
    import {
        deepObjectCopy
    } from "../../../utils/index";
    export default {
        components: {
            selectCountry,
            userType
        },
        data() {
          return {
            username: "",
            email: "",
            password: "",
            user_type: 0,
            dn_result: "",
            company: "",
            country_id: null,
            country_list: [],
            status: true,
            companyArr: []
          }
        },
        mounted() {
          this.getcompanyArr();
          this.getCountry();
        },
        methods: {
             vaify(){
                if(this.itemObj){
                    if(!this.validate_input.check(this.password,'login_password_reg')){
                        return "validate.password";
                    }
                }else{
                    if(!this.validate_input.check(this.username)){
                        return "validate.username";
                    }
                    if(!this.validate_input.check(this.email,'email')){
                        return "validate.email";
                    }
                    if(!this.validate_input.check(this.password,'login_password_reg')){
                        return "validate.password";
                    }
                    if(!this.validate_input.check(this.company)){
                        return "validate.company";
                    }
                }
                
                //debugger;
            },
            userTypeChange(user_type_id){
                this.user_type = user_type_id;
            },
            countryChange(country_id){
                this.country_id = country_id;
            },
            getcompanyArr(){
              this.$request_any("company","get",{page: 1,capacity: 1000}).then(res => {
                this.companyArr = res.data.results;
              })
            },
            getCountry() {
              this.$request_any('country', 'get', {
                page: 1,
                capacity: 300,
                is_all: false
              }).then(
                res => {
                  // res.data.unshift({code:"please select keyword",id:null})
                  this.country_list = res.data.results
                }
              )
            },
            createOrUpdate() {
                var err_text = this.vaify();
                if(err_text){
                    this.$msg(this.$t(err_text),"error");
                    return;
                }
                var url = this.itemObj ? "user/" + this.itemObj.id + '/' : "user";
                var method_type = this.itemObj ? "patch" : "post";
                var obj = !this.itemObj ? {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                    user_type: this.user_type,
                    company: this.company,
                    country_id: this.country_id,
                } : {
                    password: this.password,
                    status: this.status
                };
                this.$request_any(url, method_type, obj).then(res => {
                    var notive_text = this.itemObj ? "update success" : "create success";
                    this.$msg(notive_text);
                    this.$emit('close', true);
                });
            },
            // getCountry(res) {
            //     this.country = res;
            //     this.status = res.status;
            // },
            open() {
                this.username = "";
                this.email = "";
                this.password = "";
                this.user_type = 0;
                this.dn_result = "";
                this.company = "";
                this.country_id = null;
            },
        },
        props: {
            showBox: {
                type: Boolean,
                default: true,
            },
            itemObj: {
                type: Object,
            }
        },
        computed: {
            showBox_: {
                get() {
                    return this.showBox
                },
                set() {
                    this.$emit('close')
                }
            }
        },
    }
</script>

<style lang='less'>
    .tag_add_box {
        border: 1px solid #ddd;
        border-radius: 4px;
    }
    .company .el-select{
    width: 100%;
  }
  .el-select{
    width: 100%;
  }
</style>
