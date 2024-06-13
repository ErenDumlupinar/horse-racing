<!-- components/RaceTrack.vue -->

<template>
  <div>
    <h2>Race Track</h2>
    <div v-if="currentRace">
      <h3>{{ currentRace.distance }}m</h3>
      <div
        v-for="horse in currentRace.horses"
        :key="horse.id"
        :style="{ color: horse.color }"
        :ref="setHorseRef(horse.id)"
        class="horse"
      >
        {{ horse.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue';
import { mapState } from 'vuex';
import { Race } from '~/store';
import gsap from 'gsap';

export default defineComponent({
  computed: {
    ...mapState({
      raceSchedule: (state: any) => state.raceSchedule as Race[],
      currentRaceIndex: (state: any) => state.currentRaceIndex as number
    }),
    currentRace(): Race | undefined {
      return this.raceSchedule[this.currentRaceIndex];
    }
  },
  methods: {
    setHorseRef(id: number) {
      return (el: HTMLElement | null) => {
        if (el) {
          this.$refs['horse' + id] = el;
        }
      };
    },
    animateRace(race: Race) {
      race.horses.forEach((horse, index) => {
        const horseElement = this.$refs['horse' + horse.id] as HTMLElement;
        if (horseElement) {
          gsap.fromTo(
            horseElement,
            { x: 0 },
            {
              x: '100%',
              duration: (index + 1) * 1.5,
              ease: 'power1.inOut',
              onComplete: () => {
                if (index === race.horses.length - 1) {
                  this.$emit('race-complete');
                }
              }
            }
          );
        }
      });
    }
  },
  watch: {
    currentRace(newVal) {
      if (newVal) {
        this.animateRace(newVal);
      }
    }
  }
});
</script>
