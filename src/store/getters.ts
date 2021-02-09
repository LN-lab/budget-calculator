import { GetterTree } from 'vuex'
import { State } from './state'

//Getters are also amenable to be statically typed. A getter is just like mutation, and is essentially a function which receives state as its first argument. 


export type Getters = {
  doubledCounter(state: State): number;
}

//A declaration of getters is not much different from a declaration of mutations.
export const getters: GetterTree<State, State> & Getters = {
  doubledCounter: (state) => {
    return state.counter * 2
  },
}