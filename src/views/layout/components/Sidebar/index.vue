<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
    <el-menu mode="vertical" :show-timeout="200" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item :routes="constantRouterMap_"></sidebar-item>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { constantRouterMap } from "../../../../router/";
import { mapGetters } from "vuex";
import SidebarItem from "./SidebarItem";
var show_trak_list;
var show_company_list;
var show_app_list;

export default {
  components: {
    SidebarItem
  },
  data() {
    return {
      // constantRouterMap
      constantRouterMap
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "sidebar"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    constantRouterMap_() {
      return constantRouterMap;
    }
  }
};
</script>
