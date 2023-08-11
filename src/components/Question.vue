<script setup>
import { defineComponent, reactive, computed, ref } from 'vue';
import { useStore } from 'vuex'
import Box from './core/Box.vue'
import Button from './core/Button.vue'
import Text from './core/Text.vue'
import Title from './core/Title.vue'

const props = defineProps({
  labels: Array,
  title: String,
  data: String,
  step: Number,
  show: Boolean
})

const store = useStore()
const steps = computed(() => store.state.step)
// const show = ref(false)

</script>

<template>
  <Box customClass="m-2 gap-4">
    <Box customClass="justify-start">
      <img src="/profile.jpg" alt="profile" class="rounded-full w-20 h-20"/>
    </Box>
    <Box col customClass="bg-gray-200 p-4">
    <Title>{{ title }}</Title>
    <!-- <Box v-for="(label, index) in labels"><Text>{{ label }}</Text></Box> -->
    <input class="my-2 rounded border border-gray-500 bg-gray-200 p-2 text-black" v-for="(label, index) in labels" type="text" @change="label.handler" :placeholder="label.value" />
    </Box>
  </Box>
  <slot ></slot>
</template>

<style>

.question {
  background-color: gray;
}

</style>