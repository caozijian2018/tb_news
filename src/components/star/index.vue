<template>
 <el-tooltip class="item" effect="dark" :content="$t('table.this_is_required')" placement="top">
      <i  style="color:#e4393c;font-size:10px;" class=" iconfont icon-xingxing animated" :class="{shake:not_match_}"></i>
  </el-tooltip>
</template>

<script>
export default {
    props:{
      notMatch:{
        type:Boolean,
      }
    },
    watch:{
      notMatch(newv){
        alert(111);
        if ( newv ) {
          this.not_match_ = true ; 
          setTimeout(()=>{
            this.not_match_ = false;
          },222000)
        }
      }
    },
    data(){
      return {
        not_match_:false,
      }
    },
}

</script>
<style lang='less'>
</style>