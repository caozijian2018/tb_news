<template>
    <div>
        <div class="display_flex flex_jusify_space media_wrop_800" id="drag_div">
        <Kanban :key="2" class="kanban working media_width_40_800"  :list="list2" :options="options" header-text="Working" />
        <Kanban :key="3" class="kanban done media_width_40_800" :list="rule_results" :options="options" header-text="Done" />
    </div>
    <div class="overflow_hidden">
        <el-button  type="primary" class="media_width_20_800 margin_top_10 float_right" @click="selectRule()">{{this.$t('table.confirm')}}</el-button>
    </div>
    </div>
    
</template>

<script>
    import Kanban from '@/components/Kanban'
    export default {
        name: 'dragKanban-demo',
        components: {
            Kanban
        },
        mounted(){
            this.getRulist();
        },
        methods:{
            selectRule(){
                this.$emit('selectRule',this.list2);
            },
            getRulist(){
                this.$request_any('permissions').then(res=>{
                    this.rule_results=res.data.results;
                    // {id: 22, name: "list_app", gp: "app", desc: "列出应用"}
                })
            }
        },
        data() {
            return {
                rule_results:[],
                options: {
                    group: 'mission'
                },
                list2: [
                ],
                list3: [{
                        name: 'Mission',
                        id: 8
                    },
                    {
                        name: 'Mission',
                        id: 9
                    },
                    {
                        name: 'Mission',
                        id: 10
                    }
                ]
            }
        }
    }
</script>

<style lang="scss">
    #drag_div {
        .kanban {
            &.working {
                .board-column-header {
                    background: #f9944a;
                }
            }
            &.done {
                .board-column-header {
                    background: #2ac06d;
                }
            }
        }
    }
</style>

