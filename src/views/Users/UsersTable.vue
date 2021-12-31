<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card shadow>
            <template v-slot:header>
              <div class="row">
                <div class="col-10">All Users</div>
                <div class="col-2 text-right">
                  <base-button
                    type="primary"
                    v-if="can('user.store')"
                    size="sm"
                    @click="addUser()"
                    icon="fa fa-plus"
                    >Add user</base-button
                  >
                </div>
              </div>
            </template>
            <template v-slot:default>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-6">
                    <base-input
                      v-model="this.search"
                      @keyup.enter="this.searcher($event.target.value)"
                      input-classes="form-control-sm"
                      label="Search... "
                    ></base-input>
                  </div>
                  <div class="col-md-4"></div>
                  <div class="col-md-2">
                    <div class="form-group">
                      <select
                        @change="changePerPage($event.target.value)"
                        class="form-control form-control-sm"
                      >
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
                    :data="this.users"
                    class="table align-items-center table-flush"
                    tbody-classes="list"
                  >
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
                            <router-link
                              v-if="can('user.show')"
                              class="dropdown-item"
                              :to="{
                                name: 'showUser',
                                params: { id: row.item.id },
                              }"
                              >Show profile
                            </router-link>
                            <router-link
                              v-if="can('user.update')"
                              class="dropdown-item"
                              :to="{
                                name: 'editUser',
                                params: { id: row.item.id },
                              }"
                              >Edit
                            </router-link>
                            <a
                              class="dropdown-item"
                              v-if="can('user.destroy')"
                              @click="destroy(row.item)"
                              href="#"
                              >Delete</a
                            >
                          </template>
                        </base-dropdown>
                      </td>
                    </template>
                  </base-table>
                </div>
                <div v-if="isLoading" class="d-flex justify-content-center">
                  <div
                    class="spinner-border text-success"
                    role="status"
                    style="width: 5rem; height: 5rem"
                  >
                    <span class="sr-only">Loading...</span>
                  </div>
                </div>
              </div>
              <div class="container-fluid">
                <base-pagination
                  v-on:input="changePage($event)"
                  :per-page="this.paginator.perPage"
                  :page-count="this.paginator.to"
                  :value="this.paginator.currentPage"
                ></base-pagination>
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
import { mapGetters, mapActions } from "vuex";
import BasePagination from "../../components/BasePagination";
import BaseInput from "../../components/BaseInput";

export default {
  name: "users-table",
  components: {
    BaseInput,
    BasePagination,
    Card,
    BaseTable,
    BaseDropdown,
  },
  async mounted() {
    await this.listUsers();
  },
  methods: {
    ...mapActions({
      listUsers: "users/list",
      changePage: "users/setPage",
      changePerPage: "users/set_per_page",
      searcher: "users/setSearch",
      destroy: "users/destroy",
      addUser() {
        this.$router.push({
          name: "createUser",
        });
      },
    }),
  },
  computed: {
    ...mapGetters({
      users: "users/users",
      isLoading: "users/isLoading",
      paginator: "users/paginator",
      search: "users/search",
    }),
  },
};
</script>
<style></style>
