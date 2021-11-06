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
            <ProfilePage v-if="!isLoading && !error" :user="user"></ProfilePage>
            <div v-else-if="!isLoading && error">
              <div class="text-danger">
                {{error}}
              </div>
            </div>
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
  components: {ProfilePage, Card, BaseHeader},
  data() {
    return {
      isLoading: true,
      error: ''
    }
  },
  async mounted() {
    await this.getUser(this.$route.params.id).catch(err => {
      this.error = err.message
    });
    this.isLoading = false
  },
  methods: {
    ...mapActions({getUser: "users/getUserData"})
  },
  computed: {
    ...mapGetters({
      user: "users/selectedUser",
    })
  },
  watch: {
    async $route(to, from) {
      if (to !== from) {
        this.isLoading = true;
        await this.getUser(this.$route.params.id);
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>

</style>