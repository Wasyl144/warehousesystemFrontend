<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent">Login to your account</div>
        <base-alert v-show="message" type="danger" dismissible>
          <span class="alert-inner--text">{{ message }}</span>
          <button
              type="button"
              class="close"
              data-dismiss="alert"
              aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </base-alert>
        <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Sign in with credentials</small>
          </div>
          <form role="form" @submit.prevent="loginHandler">
            <base-input
                formClasses="input-group-alternative mb-3"
                placeholder="Email"
                :valid="errors?.email ? false : undefined"
                addon-left-icon="ni ni-email-83"
                v-model="user.email"
            >
            </base-input>

            <base-input
                formClasses="input-group-alternative mb-3"
                placeholder="Password"
                type="password"
                :valid="errors?.password ? false : undefined"
                addon-left-icon="ni ni-lock-circle-open"
                v-model="user.password"
            >
            </base-input>
            <div class="text-center">
              <base-button
                  type="primary"
                  v-if="!loading"
                  nativeType="submit"
                  class="my-4"
              >Sign in
              </base-button
              >
              <button v-else class="btn btn-primary" type="button" disabled>
                <span
                    class="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                ></span>
                <span class="sr-only">Loading...</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AuthUser from "../models/authuser";
import {mapActions, mapGetters} from "vuex";

export default {
  name: "login",
  data() {
    return {
      user: new AuthUser("", ""),
      message: "",
    };
  },
  computed: {
    ...mapGetters({
      loading: "auth/isLoading",
      loggedIn: "auth/loggedIn",
      errors: "auth/errors",
    }),
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    ...mapActions({
      login: "auth/login",
    }),
    loginHandler() {
      this.message = "";
      if (this.user.email && this.user.password) {
        this.login(this.user)
      }
      else {
        this.message = "Fill a data"
      }
    },
  },
};
</script>
<style></style>
