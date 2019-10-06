<template>
        <el-select v-model="user_type_id_" class="width_100">
            <el-option v-for="item in user_type_list"  :key="item.id" :label="item.name" :value="item.id">
            </el-option>
        </el-select>
</template>

<script>
    export default {
        props:{
            userTypeId:{
                type:Number
            }
        },
        computed:{
            user_type_id_:{
                get(){
                    return this.userTypeId
                },
                set(val){
                    this.$emit('userTypeChange', val);
                }
            }
        },
        data() {
            return {
                user_type_list: [{id: 0, name: "CP"}, {id: 1, name: "SP"}, {id: 2, name: "DSP"}],
                country_id:'',
            }
        },
        mounted(){

        },
        methods: {
           
        },
    }
</script>

<style lang='less'>
    
</style>
