//A definition of a store starts with a definition of state.
export const state = {
  counter: 0,
}
//We need to export type of a state because it will be used in definitions of getters, mutations and actions.
export type State = typeof state