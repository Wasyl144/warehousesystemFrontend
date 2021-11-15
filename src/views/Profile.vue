<template>
  <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"/>
  <div class="container-fluid mt--7">
    <div class="row">
      <div class="col">
        <card shadow>
          <template v-slot:header>
            User profile
          </template>
          <template v-slot:default>
            <ProfilePage v-if="!isLoading" :user="user"></ProfilePage>
            <div v-else-if="isLoading" class="d-flex justify-content-center">
              <div class="spinner-border text-success" role="status" style="width: 5rem; height: 5rem;">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          </template>
        </card>
      </div>
    </div>
  </div>

</template>

<script>
import BaseHeader from "../components/BaseHeader";
import Card from "../components/Card";
import ProfilePage from "../components/ProfilePage";
import {mapGetters, mapActions} from "vuex";

export default {
  name: "Profile",
  components: { ProfilePage, Card, BaseHeader },
  async mounted() {
    await this.getData(this.$route.params.id);
  },
  methods: {
    ...mapActions({ getUser: "users/get" }),
    async getData(id) {
      await this.getUser(id)
    },
  },
  computed: {
    ...mapGetters({
      user: "users/selectedUser",
      isLoading: "users/isLoading"
    })
  },
  async beforeRouteUpdate(to, from, next) {
    await this.getData(to.params.id);
    next();
  }


}
</script>

<style scoped>

</style>