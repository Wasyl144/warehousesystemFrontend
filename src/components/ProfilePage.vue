<template>
  <div class="main-body">
    <div class="row gutters-sm">
      <div class="col-md-4 mb-3">
        <div class="card">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <div class="rounded-circle gravatar" style="">
                <span class="text-lg text-white">{{ firstLetter }}</span>
              </div>
              <div class="mt-3">
                <h4>{{ user?.name }}</h4>
                <p v-for="role in user?.roles" :key="role.id" class="mb-1">
                  {{ role.name }}
                </p>
                <p class="text-muted font-size-sm">
                  {{ user?.additionalInfo?.address ?? "No info" }}
                </p>
                <router-link
                  v-if="can('user.update')"
                  class="btn btn-primary"
                  :to="{ name: 'editUser', params: { id: user.id } }"
                  >Edit profile</router-link
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="card mb-3">
          <div class="card-body">
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Full Name</h6>
              </div>
              <div class="col-sm-9">{{ user?.name }} {{ user?.surname }}</div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Email</h6>
              </div>
              <div class="col-sm-9">
                {{ user?.email }}
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">Phone number</h6>
              </div>
              <div class="col-sm-9">
                {{ user?.additionalInfo?.phone_number ?? "No info" }}
              </div>
            </div>
            <hr />
            <div class="row">
              <div class="col-sm-3">
                <h6 class="mb-0">About me</h6>
              </div>
              <div class="col-sm-9">
                {{ user?.additionalInfo?.about_me ?? "No info" }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfilePage",
  props: {
    user: Object,
  },
  computed: {
    firstLetter: function () {
      return this.user?.name?.charAt(0) + this.user?.surname?.charAt(0);
    },
  },
};
</script>

<style scoped></style>
