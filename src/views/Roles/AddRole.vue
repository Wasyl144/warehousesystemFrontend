<template>
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
        <card shadow type="secondary">
          <template v-slot:header>
            <div class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">Add role</h3>
                </div>
              </div>
            </div>
          </template>

          <form @submit.prevent="createRole(role)">
            <div class="text-right">
              <button type="submit" class="btn btn-sm btn-success">Save</button>
            </div>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-12">
                  <base-input
                      alternative=""
                      label="Role name"
                      placeholder="ex. Worker"
                      input-classes="form-control-alternative"
                      v-model="role.name"
                      :error="role?.errors?.errors?.name"
                  />
                </div>
              </div>
            </div>
          </form>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from "vuex";

export default {
  name: "AddRole",
  methods: {
    ...mapActions({
      createRole: "roles/set",
    }),
  },
  computed: {
    ...mapGetters({
      role: "roles/role",
      isLoading: "roles/isLoading",
    }),
  },

}
</script>

<style scoped>

</style>