<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card shadow>
            <template v-slot:header>
              <div class="row">
                <div class="col-10">
                  All Roles
                </div>
                <div class="col-2 text-right">
                  <base-button type="primary" size="sm" icon="fa fa-plus" @click="goToCreate" v-if="can('role.store')">Add role</base-button>
                </div>
              </div>

            </template>
            <template v-slot:default>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-6">
                    <base-input v-model="this.search" @keyup.enter="this.searcher($event.target.value)" input-classes="form-control-sm"
                                label="Search... "></base-input>
                  </div>
                  <div class="col-md-4">

                  </div>
                  <div class="col-md-2">
                    <div class="form-group">
                      <select @change="changePerPage($event.target.value)" class="form-control form-control-sm">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="100">100</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              <div class="container-fluid">
                <div class="table-responsive">
                  <base-table
                      v-if="!isLoading"
                      :data="this.roles"
                      class="table align-items-center table-flush"
                      tbody-classes="list">
                    <template v-slot:columns>
                      <th>Name</th>
                      <th></th>
                    </template>

                    <template v-slot:default="row">
                      <td>
                        {{ row.item.name }}
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
                            <router-link v-if="can('role.update')" class="dropdown-item"
                                         :to="{ name: 'editRoles', params: { id: row.item.id }}">Edit
                            </router-link>
                            <router-link v-if="can('role.update')" class="dropdown-item"
                                         :to="{ name: 'editPermissions', params: { id: row.item.id }}">Permissions
                            </router-link>
                            <a class="dropdown-item" v-if="can('role.destroy')" @click="destroy(row.item)" href="#">Delete</a>
                          </template>
                        </base-dropdown>
                      </td>
                    </template>
                  </base-table>
                </div>
                <div v-if="isLoading" class="d-flex justify-content-center">
                  <div class="spinner-border text-success" role="status" style="width: 5rem; height: 5rem;">
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
              <div class="container-fluid">
                <base-pagination v-on:input="changePage($event)" :per-page="this.paginator.perPage"
                                 :page-count="this.paginator.to" :value="this.paginator.currentPage"></base-pagination>
              </div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BaseTable from "../../components/BaseTable";
import Card from "../../components/Card";
import BaseDropdown from "../../components/BaseDropdown";
import {mapGetters, mapActions} from "vuex";
import BasePagination from "../../components/BasePagination";
import BaseInput from "../../components/BaseInput";
import BaseButton from "../../components/BaseButton";

export default {
  name: "roles-table",
  components: {
    BaseButton,
    BaseInput,
    BasePagination,
    Card,
    BaseTable,
    BaseDropdown,
  },
  async mounted() {
    await this.list()
  },
  methods: {
    ...mapActions({
      list: "roles/list",
      changePage: "roles/setPage",
      changePerPage: "roles/set_per_page",
      searcher: "roles/setSearch",
      destroy: "roles/destroy",
    }),
    goToCreate() {
      this.$router.push({
        name: "createRoles"
      })
    }
  },
  computed: {
    ...mapGetters({
      roles: "roles/roles",
      isLoading: "roles/isLoading",
      paginator: "roles/paginator",
      search: "roles/search",
    })
  },
};
</script>
<style></style>
