<template>
  <button :disabled="disable" class="bg-pink-400 p-2 rounded" @click="handleClick">
    <slot></slot>
  </button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Button',
  props: {
    type: {
      type: String,
      default: 'primary',
      validator: (value) => ['primary', 'secondary'].includes(value),
    },
    disable: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { slots, emit }) {
    const handleClick = () => {
      emit('onClick');
    };

    return {
      handleClick,
    };
  },
});
</script>