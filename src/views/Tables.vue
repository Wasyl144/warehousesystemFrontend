<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card shadow>
            <template v-slot:header>
              All users
            </template>
            <template v-slot:default>
              <base-table
                  v-if="!isLoading"
                  :data="this.users"
                  tbody-classes="list">
                <template v-slot:columns>
                  <th>Name</th>
                  <th>Surname</th>
                  <th>E-mail</th>
                  <th></th>
                </template>

                <template v-slot:default="row">
                  <td>
                    {{ row.item.name }}
                  </td>
                  <td>
                    {{ row.item.surname }}
                  </td>
                  <td>
                    {{ row.item.email }}
                  </td>
                  <td class="text-right">
                    <base-dropdown class="dropdown" position="right">
                      <template v-slot:title>
                        <a
                            class="btn btn-sm btn-icon-only text-light"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                          <i class="fas fa-ellipsis-v"></i>
                        </a>
                      </template>

                      <template v-slot:default>
                        <router-link v-if="can('user.show')" class="dropdown-item" :to="{ name: 'showUser', params: { id: row.item.id }}" >Show profile</router-link>
                        <router-link v-if="can('user.update')" class="dropdown-item" :to="{ name: 'editUser', params: { id: row.item.id }}" >Edit</router-link>
                        <a class="dropdown-item" href="#">Delete</a>
                      </template>
                    </base-dropdown>
                  </td>
                </template>

              </base-table>
              <div v-else class="d-flex justify-content-center">
                <div class="spinner-border text-success" role="status" style="width: 5rem; height: 5rem;">
                  <span class="sr-only">Loading...</span>
                </div>
              </div>
<!--              <div v-else class="d-flex justify-content-center">-->
<!--                <div class="spinner-border text-success" role="status" style="width: 5rem; height: 5rem;">-->
<!--                  <span class="sr-only">Loading...</span>-->
<!--                </div>-->
<!--              </div>-->
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseTable from "../components/BaseTable";
import Card from "../components/Card";
import BaseDropdown from "../components/BaseDropdown";
import { mapGetters, mapActions } from "vuex";

export default {
  name: "tables",
  components: {
    Card,
    BaseTable,
    BaseDropdown,
  },
  async mounted() {
    await this.listUsers()
  },
  methods: {
    ...mapActions({ listUsers: "users/list" }),
  },
  computed: {
    ...mapGetters({
      users: "users/users",
      isLoading: "users/isLoading"
    })
  },
};
</script>
<style></style>
