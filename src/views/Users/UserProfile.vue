<template>
  <div>
    <base-header
        class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
        style="
        min-height: 600px;
        /*background-image: url(img/theme/profile-cover.jpg);*/
        background-size: cover;
        background-position: center top;
      "
    >
      <!-- Mask -->
      <span class="mask bg-gradient-success opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row" v-if="!isLoading">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{ this.user.name }} {{ this.user.surname }}</h1>
            <p class="text-white mt-0 mb-5">
              This is your profile page.
              Your role is: {{ this.user.roles[0].name ?? 'No info' }}
            </p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-12 order-xl-1">
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">My account</h3>
                  </div>
                </div>
              </div>
            </template>

            <div v-if="isLoading" class="d-flex justify-content-center">
              <div class="spinner-border text-success" role="status" style="width: 5rem; height: 5rem;">
                <span class="sr-only">Loading...</span>
              </div>
            </div>

            <form v-if="!isLoading" @submit.prevent="this.updateProfile(this.user)">
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
                <p class="text-warning">Be careful if you fill a password fields you will change password. </p>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                        alternative=""
                        type="password"
                        label="Password"
                        placeholder="Password"
                        input-classes="form-control-alternative"
                        v-model="user.password"
                        :error="user?.errors?.password"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                        alternative=""
                        type="password"
                        label="Confirm password"
                        placeholder="Confirm password"
                        input-classes="form-control-alternative"
                        v-model="user.password_confirmation"
                        :error="user?.errors?.password_confirmation"
                    />
                  </div>
                </div>
              </div>
              <hr class="my-4"/>
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
              <hr class="my-4"/>
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
import {mapGetters, mapActions} from "vuex";

export default {
  name: "user-profile",
  mounted() {
    this.getUser();
  },
  methods: {
    ...mapActions({
      getUser: "profile/getCurrentUserData",
      updateProfile: "profile/update"
    })
  },
  computed: {
    ...mapGetters({
      user: "profile/currentUser",
      isLoading: "profile/isLoading",
    }),
  },
};
</script>
<style></style>
