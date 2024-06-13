<!-- pages/index.vue -->

<template>
  <div>
    <button @click="generateProgram">Generate Program</button>
    <button @click="startRace">Start / Pause</button>
    <HorseList :horses="horses" />
    <RaceTrack :raceSchedule="raceSchedule" :currentRaceIndex="currentRaceIndex" @race-complete="onRaceComplete" />
    <RaceResults :results="results" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'vuex';
import HorseList from '~/components/HorseList.vue';
import RaceTrack from '~/components/RaceTrack.vue';
import RaceResults from '~/components/RaceResults.vue';

export default defineComponent({
  components: { HorseList, RaceTrack, RaceResults },
  computed: {
    ...mapState(['horses', 'raceSchedule', 'currentRaceIndex', 'results'])
  },
  methods: {
    ...mapActions(['generateRaceSchedule', 'startRace']),
    generateProgram() {
      this.generateRaceSchedule();
    },
    startRace() {
      this.$store.dispatch('startRace');
    },
    onRaceComplete() {
      setTimeout(() => {
        this.startRace();
      }, 1000); // Delay before starting the next race
    }
  }
});
</script>
