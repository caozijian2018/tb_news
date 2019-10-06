<template>
    <div>
        <div class="display_flex media_flex_row_800  flex_align_center margin_top_10">
            <div class="media_width_40_800">{{$t('table.select_company')}}: </div>
            <el-select v-model="company_val_" @change="seletApp" class="width_100" :placeholder="$t('table.select_company')">
                <el-option v-for="item in company_arr" :key="item.id" :label="item.name" :value="item.id">
                </el-option>
            </el-select>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            companyVal:{
            }
        },
        computed:{
            company_val_:{
                get(){
                    return this.companyVal
                },
                set(val){
                    this.$emit('seletCompany', val);
                }
            }

        },
        data() {
            return {
                company_arr: [],
                app: '',
            }
        },
        mounted() {
            this.getCompanyList();
        },
        methods: {
            seletApp(val) {
                this.$emit('seletCompany', val);
            },
            getCompanyList() {
                this.$request_any("company", 'get', {
                    capacity: 10000,
                    page:1,
                }).then(res => {
                    this.company_arr = res.data.results;
                })
            },
        }
    }
</script>

<style lang='less'>
    
</style>