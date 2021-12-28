<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="
        min-height: 300px;
        /*background-image: url(img/theme/profile-cover.jpg);*/
        background-size: cover;
        background-position: center top;
      "
    >

    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 order-xl-1">
          <card shadow type="secondary" v-if="!isLoadingUser && !isLoadingRoles">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Account</h3>
                  </div>
                </div>
              </div>
            </template>

            <form @submit.prevent="this.updateUser(this.user)">
              <h6 class="heading-small text-muted mb-4">Edit user</h6>
              <div class="text-right">
                <button type="submit" class="btn btn-sm btn-success">Save</button>
              </div>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-12">
                    <base-input
                      alternative=""
                      label="Email address"
                      placeholder="jesse@example.com"
                      input-classes="form-control-alternative"
                      v-model="this.user.email"
                      :error="this.user?.errors?.email"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="First name"
                      placeholder="First name"
                      input-classes="form-control-alternative"
                      v-model="this.user.name"
                      :error="this.user?.errors?.name"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Last name"
                      placeholder="Last name"
                      input-classes="form-control-alternative"
                      v-model="this.user.surname"
                      :error="this.user?.errors?.surname"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label" >Role</label>
                      <select v-model="this.user.roles[0]" class="form-control">
                        <option value="0"></option>
                        <option v-for="role in roles" v-bind:value="{id: role.id, name: role.name}" :key="role.id" >{{role.name}}</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Address -->
              <h6 class="heading-small text-muted mb-4">Contact information</h6>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-md-12">
                    <base-input
                      alternative=""
                      label="Address"
                      placeholder="Home Address"
                      input-classes="form-control-alternative"
                      v-model="this.user.additionalInfo.address"
                      :error="user?.errors?.additionalInfo?.address"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-4">
                    <base-input
                      alternative=""
                      label="Phone number"
                      placeholder="Phone number"
                      input-classes="form-control-alternative"
                      v-model="this.user.additionalInfo.phone_number"
                      :error="user?.errors?.additionalInfo?.phone_number"
                    />
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Description -->
              <h6 class="heading-small text-muted mb-4">About me</h6>
              <div class="pl-lg-4">
                <div class="form-group">
                  <base-input alternative="" label="About Me">
                    <textarea
                      rows="4"
                      class="form-control form-control-alternative"
                      placeholder="A few words about you ..."
                      v-model="this.user.additionalInfo.about_me"
                    >
                    </textarea>
                  </base-input>
                </div>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "edit-user",

  async mounted() {
    await this.getData(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      getUser: "users/get",
      updateUser: "users/update",
      getAllRoles: "roles/getAllRoles"
    }),
    async getData(id) {
      await this.getUser(id);
      await this.getAllRoles();
    },
  },
  computed: {
    ...mapGetters({
      user: "users/selectedUser",
      roles: "roles/roles",
      isLoadingUser: "users/isLoading",
      isLoadingRoles: "roles/isLoading",
    }),
  },
  created() {

  },
  async beforeRouteUpdate (to, from, next) {
    await this.getData(to.params.id);
    next();
  }
};
</script>
<style></style>
