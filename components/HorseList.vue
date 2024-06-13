<!-- components/HorseList.vue -->

<template>
    <div>
      <h2>Horse List (1-20)</h2>
      <ul>
        <li v-for="horse in horses" :key="horse.id" :style="{ color: horse.color }">
          {{ horse.name }} (Condition: {{ horse.condition }})
        </li>
      </ul>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Horse } from '~/store';
  
  export default defineComponent({
    props: {
      horses: {
        type: Array as PropType<Horse[]>,
        required: true
      }
    }
  });
  </script>
  