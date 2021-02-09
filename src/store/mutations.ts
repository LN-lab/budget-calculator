import { MutationTree } from 'vuex'
import { MutationTypes } from './mutation-types'
import { State } from './state'

//Mutation is just a simple function, which accepts state as the first argument and payload as the second, and eventually mutates the former
//State type comes in action, it is used as the type of the first argument. The second argument is specific to a particular mutation. 
export type Mutations<S = State> = {
  [MutationTypes.SET_COUNTER](state: S, payload: number): void;
}

//It's time to implement it.
//The mutations variable is responsible for storing all of implemented mutations, and eventually will be used to construct the store.
//MutationTree<State> & Mutations intersection of types guarantees that a contract is correctly implemented. If it isn't, TypeScript complains
export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_COUNTER](state, payload: number) {
    state.counter = payload
  },
}
