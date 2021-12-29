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
                  <h3 class="mb-0">Add category</h3>
                </div>
              </div>
            </div>
          </template>

          <form @submit.prevent="create(category)">
            <div class="text-right">
              <button type="submit" class="btn btn-sm btn-success">Save</button>
            </div>
            <div class="pl-lg-4">
              <div class="row">
                <div class="col-lg-12">
                  <base-input
                      alternative=""
                      label="Category"
                      placeholder="ex. Car-Audio"
                      input-classes="form-control-alternative"
                      v-model="category.name"
                      :error="role?.errors?.name"
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
  name: "AddCategory",
  methods: {
    ...mapActions({
      create: "categories/set",
      reset: "categories/reset"
    }),
  },
  computed: {
    ...mapGetters({
      isLoading: "categories/isLoading",
      category: "categories/category",
    }),
  },
  async mounted() {
    await this.reset();
  }

}
</script>

<style scoped>

</style>