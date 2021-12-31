<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8" />
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card shadow>
            <template v-slot:header> QR scanner </template>
            <template v-slot:default>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-6">
                    <qr-stream @decode="onDecode" class="mb"></qr-stream>
                  </div>
                  <div class="col-md-4">
                    <p v-if="error" class="text-danger">{{ error }}</p>
                  </div>
                  <div class="col-md-2">
                    <div class="form-group"></div>
                  </div>
                </div>
              </div>
              <div class="container-fluid"></div>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "QrScanner",
  data() {
    return {
      error: "",
    };
  },
  components: {},
  methods: {
    onDecode(data) {
      try {
        console.log(data);
        const json = JSON.parse(data);
        if (json && json.itemId > 0) {
          this.$router.push({
            name: "showItems",
            params: {
              id: json.itemId,
            },
          });
        } else {
          this.error = "Please scan valid QRCode";
        }
      } catch (e) {
        this.error = "Please scan valid QRCode";
      }
    },
  },
};
</script>
<style></style>
