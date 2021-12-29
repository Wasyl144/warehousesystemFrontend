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
            <div v-if="isLoadingItem" class="d-flex justify-content-center">
              <div class="spinner-border text-success" role="status" style="width: 5rem; height: 5rem;">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <template v-slot:header>
              <div class="bg-white border-0">
                <div class="row align-items-center">
                  <div class="col-8">
                    <h3 class="mb-0">Your Item</h3>
                  </div>
                </div>
              </div>
            </template>
            <div v-if="!isLoadingItem">
              <div class="row">
                <div class="col-md-3 text-center">
                  <div class="col p-1">
                    <div v-html="qr" class="">

                    </div>
                  </div>
                  <div class="col p-1">
                    <base-button @click="forceDownload(item.id)">Download QR CODE</base-button>
                  </div>
                  <div class="col p-1">
                    <base-button @click="goToItem(item?.id)">Edit</base-button>
                  </div>
                </div>
                <div class="col-md-9 col-lg-9">
                  <div class="  ">
                    <table class="table table-user-information">
                      <tbody>
                      <tr>
                        <td>Name:</td>
                        <td>{{ item?.name }}</td>
                      </tr>
                      <tr>
                        <td>Category:</td>
                        <td>{{ item?.category?.name }}</td>
                      </tr>
                      <tr>
                        <td>Quantity</td>
                        <td>{{ item?.quantity }}</td>
                      </tr>
                      <tr>
                        <td>Location</td>
                        <td>{{ item?.location }}</td>
                      </tr>
                      <tr>
                        <td>Description</td>
                        <td>{{ item.description ?? 'No info' }}</td>
                      </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  name: "ShowItem",

  async mounted() {
    await this.getData(this.$route.params.id)
  },

  methods: {
    ...mapActions({
      getItem: "items/get",
      getQrCode: "items/getQr",
      downloadQrCode: "items/downloadQr",
      reset: "items/reset"
    }),
    async getData(id) {
      await this.reset();
      await this.getQrCode(id);
      await this.getItem(id);
    },
    goToItem(id) {
      this.$router.push({
        name: 'editItems',
        params: {
          id: id
        }
      })
    },
    async forceDownload(payload) {
      await this.downloadQrCode(payload);
    }

  },
  computed: {
    ...mapGetters({
      item: "items/selectedItem",
      isLoadingItem: "items/isLoading",
      qr: "items/qrCode",
    }),
  },
  created() {

  },
  async beforeRouteUpdate(to, from, next) {
    await this.getData(to.params.id);
    next();
  }
};
</script>

<style scoped>

</style>