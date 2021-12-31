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
          <card shadow type="secondary">
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Items</h3>
                  </div>
                </div>
              </div>
            </template>

            <form
              v-if="!isLoadingItem && !isLoadingCategories"
              @submit.prevent="createItem(itemModel)"
            >
              <h6 class="heading-small text-muted mb-4">Add item</h6>
              <div class="text-right">
                <button type="submit" class="btn btn-sm btn-success">
                  Save
                </button>
              </div>
              <div class="pl-lg-4">
                <div class="row">
                  <div class="col-lg-12">
                    <base-input
                      alternative=""
                      label="Name of item"
                      placeholder="ex. Bananas"
                      input-classes="form-control-alternative"
                      v-model="itemModel.name"
                      :error="item?.errors?.name"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Quantity"
                      placeholder="2"
                      input-classes="form-control-alternative"
                      v-model="itemModel.quantity"
                      :error="item?.errors?.quantity"
                    />
                  </div>
                  <div class="col-lg-6">
                    <base-input
                      alternative=""
                      label="Location"
                      placeholder="A-9-2-1"
                      input-classes="form-control-alternative"
                      v-model="itemModel.location"
                      :error="item?.errors?.location"
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-6">
                    <div class="form-group">
                      <label class="form-control-label">Category</label>
                      <select v-model="itemModel.category" class="form-control">
                        <option value="0"></option>
                        <option
                          v-for="category in categories"
                          v-bind:value="{
                            id: category.id,
                            name: category.name,
                          }"
                          :key="category.id"
                        >
                          {{ category.name }}
                        </option>
                      </select>
                      <div
                        class="text-danger invalid-feedback"
                        style="display: block"
                        v-if="item?.errors?.category?.id"
                      >
                        <ul>
                          <li
                            v-for="err in item?.errors?.category?.id"
                            :key="err"
                          >
                            {{ err }}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <!-- Description -->
              <h6 class="heading-small text-muted mb-4">Description</h6>
              <div class="pl-lg-4">
                <div class="form-group">
                  <base-input alternative="" label="About Product">
                    <textarea
                      rows="4"
                      class="form-control form-control-alternative"
                      placeholder="A few words about product ..."
                      v-model="itemModel.description"
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
  name: "add-item",
  data() {
    return {
      itemModel: {
        name: "",
        quantity: "",
        location: "",
        category: null,
        description: "",
      },
    };
  },
  async mounted() {
    await this.getData();
  },

  methods: {
    ...mapActions({
      getItem: "items/get",
      createItem: "items/create",
      getAllCategories: "categories/getAllCategories",
      reset: "items/reset",
    }),
    async getData() {
      await this.reset();
      await this.getAllCategories();
    },
  },
  computed: {
    ...mapGetters({
      item: "items/selectedItem",
      categories: "categories/categories",
      isLoadingItem: "items/isLoading",
      isLoadingCategories: "categories/isLoading",
    }),
  },
  created() {},
};
</script>
<style></style>
