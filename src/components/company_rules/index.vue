<template>
    <div>
        <el-select v-model="permissions_" multiple placeholder="please select">
            <el-option v-for="item in rule_results" :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        props: {
            roles: {
                type:Array,
                default(){return []},
            },
            companyId:{
                default:1
            }
        },
        watch:{
            companyId(val){
                this.getRulist(val);
            }
        },
        mounted() {
            this.getRulist(this.companyId);
        },
        data() {
            return {
                rule_results: [],
            }
        },
        computed: {
            permissions_:{
                get(){
                    return this.roles;
                },
                set(val){
                    //传过去的id 数组 父组件再组成{}  对象
                    console.log(val);
                   this.$emit('selectRule', val);
                }
            }
        },
        methods: {
            getRulist(id_) {
                this.$request_any('role/list/'+id_+'/').then(res => {
                    this.rule_results = res.data.roles;
                    console.log('company listttt');
                    
                    console.log(res);
                    // {id: 22, name: "list_app", gp: "app", desc: "列出应用"}
                })
            },
            // 
        }
    }
</script>

<style lang='less'>
    
</style>