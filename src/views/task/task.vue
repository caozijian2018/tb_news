<template>
    <div>
      <task></task>
    </div>
</template>

<script>
  import task from '../component/task/task'
    export default {
        components: {
          task
        },
        props: [],
        data() {
            return {
                msg: ''
            }
        },
        methods: {},
        mounted() {

        },
        created() {

        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
