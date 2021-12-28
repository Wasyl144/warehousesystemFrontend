<template>
  <div
    class="custom-control custom-checkbox"
    :class="{ disabled: disabled, 'form-check-inline': inline }"
  >
    <input
      :id="cbId"
      class="custom-control-input"
      type="checkbox"
      :disabled="disabled"
      :value="value"
      v-model="model"
    />
    <label :for="cbId" class="custom-control-label">
      <slot>
        <span v-if="inline">&nbsp;</span>
      </slot>
    </label>
  </div>
</template>
<script>
import { randomString } from "./stringUtils";

export default {
  name: "base-input-checkbox",
  model: {
    prop: "checked",
    value: "",
  },
  props: {
    checked: {
      type: [Array, Boolean],
      description: "Whether checkbox is checked",
    },
    disabled: {
      type: Boolean,
      description: "Whether checkbox is disabled",
    },
    inline: {
      type: Boolean,
      description: "Whether checkbox is inline",
    },
    value: {
      type: String,
      description: "Value of checkbox",
    }
  },
  data() {
    return {
      cbId: "",
      touched: false,
    };
  },
  computed: {
    model: {
      get() {
        return this.checked;
      },
      set(check) {
        if (!this.touched) {
          this.touched = true;
        }
        console.log(check)
        this.$emit("input", check);
      },
    },
  },
  mounted() {
    this.cbId = randomString();
  },
};
</script>
