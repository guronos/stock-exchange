import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import state from './state';
import * as getters from './getters';
import * as actions from './actions';
import * as mutations from './mutations';
import { State } from './types';

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state,
  getters,
  actions,
  mutations,
});

export function useStore() {
  return baseUseStore(key);
}
