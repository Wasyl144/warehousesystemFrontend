<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="WH"
      title="WarehouseSystem"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: 'Dashboard',
            icon: 'ni ni-tv-2 text-primary',
            path: '/dashboard',
          }"
        />

        <sidebar-item
          :link="{
            name: 'Icons',
            icon: 'ni ni-planet text-blue',
            path: '/icons',
          }"
        />
        <sidebar-item
          :link="{
            name: 'My Profile',
            icon: 'ni ni-single-02 text-yellow',
            path: '/profile',
          }"
        />
        <sidebar-item
            v-if="can('items.index')"
          :link="{
            name: 'Items',
            icon: 'ni ni-collection text-red',
            path: '/items',
          }"
        />
        <sidebar-item
          :link="{
            name: 'QR Scanner',
            icon: 'ni ni-mobile-button',
            path: '/qrscanner',
          }"
        />
      </template>
      <template v-slot:managment>
        <sidebar-item
            v-if="can('categories.index')"
            :link="{
            name: 'Categories',
            icon: 'ni ni-tv-2 text-primary',
            path: '/categories',
          }"
        />

        <sidebar-item
            v-if="can('role.index')"
          :link="{
            name: 'Roles',
            icon: 'ni ni-planet text-red',
            path: '/roles',
          }"
        />
        <sidebar-item
            v-if="can('user.index')"
            :link="{
            name: 'Users',
            icon: 'ni ni-user-run text-red',
            path: '/users',
          }"
        />
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
