<!-- components/RaceResults.vue -->

<template>
    <div>
      <h2>Results</h2>
      <div v-for="result in results" :key="result.race">
        <h3>Race {{ result.race }}</h3>
        <ul>
          <li v-for="res in result.result" :key="res.horse.id">
            {{ res.position }}. {{ res.horse.name }} (Condition: {{ res.horse.condition }})
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { Result } from '~/store';
  
  export default defineComponent({
    props: {
      results: {
        type: Array as PropType<Result[]>,
        required: true
      }
    }
  });
  </script>
  