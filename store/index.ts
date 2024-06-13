import { ActionContext } from 'vuex';

export interface Horse {
  id: number;
  name: string;
  condition: number;
  color: string;
}

export interface Race {
  distance: number;
  horses: Horse[];
}

export interface Result {
  race: number;
  result: { position: number; horse: Horse }[];
}

export interface RootState {
  horses: Horse[];
  raceSchedule: Race[];
  currentRaceIndex: number;
  results: Result[];
}

export const state = (): RootState => ({
  horses: [],
  raceSchedule: [],
  currentRaceIndex: 0,
  results: []
});

export const mutations = {
  SET_HORSES(state: RootState, horses: Horse[]) {
    console.log('SET_HORSES mutation', horses);
    state.horses = horses;
  },
  SET_RACE_SCHEDULE(state: RootState, schedule: Race[]) {
    console.log('SET_RACE_SCHEDULE mutation', schedule);
    state.raceSchedule = schedule;
  },
  SET_CURRENT_RACE_INDEX(state: RootState, index: number) {
    console.log('SET_CURRENT_RACE_INDEX mutation', index);
    state.currentRaceIndex = index;
  },
  ADD_RESULT(state: RootState, result: Result) {
    console.log('ADD_RESULT mutation', result);
    state.results.push(result);
  }
};


export const actions = {
  generateRaceSchedule({ commit }: ActionContext<RootState, RootState>) {
    const horses: Horse[] = [];
    for (let i = 1; i <= 20; i++) {
      horses.push({
        id: i,
        name: `Horse ${i}`,
        condition: Math.floor(Math.random() * 100) + 1,
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`
      });
    }
    commit('SET_HORSES', horses);

    const schedule: Race[] = [];
    const distances = [1200, 1400, 1600, 1800, 2000, 2200];
    for (let i = 0; i < 6; i++) {
      const raceHorses: Horse[] = [];
      while (raceHorses.length < 10) {
        const horse = horses[Math.floor(Math.random() * horses.length)];
        if (!raceHorses.includes(horse)) {
          raceHorses.push(horse);
        }
      }
      schedule.push({ distance: distances[i], horses: raceHorses });
    }
    commit('SET_RACE_SCHEDULE', schedule);
  },
  startRace({ commit, state }: ActionContext<RootState, RootState>) {
    const index = state.currentRaceIndex;
    if (index < state.raceSchedule.length) {
      const race = state.raceSchedule[index];
      const result = race.horses.sort((a, b) => b.condition - a.condition).map((horse, i) => ({
        position: i + 1,
        horse
      }));
      commit('ADD_RESULT', { race: index + 1, result });
      commit('SET_CURRENT_RACE_INDEX', index + 1);
    }
  }
};
