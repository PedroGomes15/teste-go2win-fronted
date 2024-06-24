<template>
  <button
    class="custom-button"
    :class="{ disabled: disabled }"
    @click="handleClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'button'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleClick() {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style scoped>
.custom-button {
  background-color: var(--primary-color);
  color: var(--vt-c-white);
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  text-decoration: none;
  display: block;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 20px;
  border-radius: 5px;
  font-size: 15px;
}

.custom-button:hover {
  background-color: var(--primary-color-hover);
}

.custom-button.disabled {
  background-color: var(--primary-color-disabled);
  cursor: not-allowed;
}
</style>
