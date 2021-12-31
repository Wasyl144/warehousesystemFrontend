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
                  <h3 class="mb-0">Permissions</h3>
                </div>
              </div>
            </div>
          </template>
          <div class="pl-lg-4">
            <div class="row">
              <div class="col-lg-12">
                <div v-if="isLoading" class="d-flex justify-content-center">
                  <div
                    class="spinner-border text-success"
                    role="status"
                    style="width: 5rem; height: 5rem"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
                <div v-else>
                  <h4>Role: {{ role.name }}</h4>
                  <form @submit.prevent="prepareAndSendPermissions()">
                    <div class="text-right">
                      <button type="submit" class="btn btn-sm btn-success">
                        Save
                      </button>
                    </div>
                    <div class="form-row">
                      <div
                        v-for="permission in allPermissions"
                        :key="permission.id"
                        class="form-group col-md-6"
                      >
                        <div class="d-flex p-2">
                          <div class="custom-control custom-checkbox">
                            <input
                              :id="permission.name"
                              class="custom-control-input"
                              type="checkbox"
                              :value="permission.name"
                              v-model="arrayOfPermissions"
                              v-if="
                                rolePermissions.indexOf(permission.name) > 0
                              "
                              checked
                            />
                            <input
                              :id="permission.name"
                              class="custom-control-input"
                              type="checkbox"
                              :value="permission.name"
                              v-model="arrayOfPermissions"
                              v-else
                            />
                            <label
                              :for="permission.name"
                              class="custom-control-label"
                            >
                              {{ permission.name }}
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Permissions",
  components: {},
  data() {
    return {
      arrayOfPermissions: [],
    };
  },
  async mounted() {
    await this.getData(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      getRole: "roles/get",
      getPermissions: "roles/getPermissions",
      setPermissions: "roles/setPermissions",
      prepareAndSendPermissions() {
        const payload = {
          id: this.role.id,
          permissions: this.arrayOfPermissions,
        };
        this.setPermissions(payload);
      },
    }),
    async getData(id) {
      await this.getRole(id);
      await this.getPermissions(id);
      this.arrayOfPermissions = this.rolePermissions;
    },
  },
  computed: {
    ...mapGetters({
      role: "roles/role",
      isLoading: "roles/isLoading",
      rolePermissions: "roles/rolePermissions",
      allPermissions: "roles/allPermissions",
    }),
  },

  async beforeRouteUpdate(to, from, next) {
    await this.getData(to.params.id);
    next();
  },
};
</script>

<style scoped></style>
