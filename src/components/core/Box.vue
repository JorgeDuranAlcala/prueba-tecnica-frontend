<script>
import { defineComponent, reactive, computed } from 'vue';

export default defineComponent({
  props: {
    col: {
      type: Boolean,
      default: false,
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  setup(props) {

    const direction = computed(() => props.col ? 'flex-col' : '');
    const computedClasses = computed(() => ([
        `flex ${props.col ? 'flex-col' : ''}`,
        props.customClass
    ]));
    

    return {
      direction,
      computedClasses
    };
  },
});
</script>

<template>
    <div :class="computedClasses">
        <slot></slot>
    </div>
</template>