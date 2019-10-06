<template>
    <div>
        <el-select v-model="permissions_" multiple :placeholder="$t('table.select_rule')">
            <el-option v-for="item in rule_results" :key="item.id" :label="item.desc" :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>

<script>
    export default {
        props: {
            permissions: {
                type:Array,
                default(){return []},
            }
        },
        mounted() {
            this.getRulist();
        },
        data() {
            return {
                rule_results: [],
            }
        },
        computed: {
            permissions_:{
                get(){
                    console.log(11112312312312);
                    console.log(this.permissions);
                    var arr=[];
                    for(var val of this.permissions){
                        arr.push(val.id);
                    }
                    return arr;
                },
                set(val){
                    console.log(222222);
                    console.log(val);
                    //传过去的id 数组 父组件再组成{}  对象
                   this.$emit('selectRule', val);
                }
            }
        },
        methods: {
            getRulist() {
                this.$request_any('permissions','get',{capacity:10000}).then(res => {
                    this.rule_results = res.data.results;
                    // {id: 22, name: "list_app", gp: "app", desc: "列出应用"}
                })
            },
            // 
        }
    }
</script>

<style lang='less'>
    
</style>