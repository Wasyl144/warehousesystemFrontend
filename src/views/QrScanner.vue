<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-8"/>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <card shadow>
            <template v-slot:header>
              QR scanner
            </template>
            <template v-slot:default>
              <div class="container-fluid">
                <div class="row">
                  <div class="col-md-6">
                      <qr-stream @decode="onDecode" class="mb"></qr-stream>
                  </div>
                  <div class="col-md-4">
                  </div>
                  <div class="col-md-2">
                    <div class="form-group">

                    </div>
                  </div>
                </div>
              </div>
              <div class="container-fluid">

              </div>
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
  components: {

  },
  methods: {
    onDecode(data) {
      console.log(data)
    }
  }

}

</script>
<style></style>
