import { ActionTree, ActionContext } from 'vuex'
import { State } from './state'
import { Mutations } from './mutations'
import { ActionTypes } from './action-types'
import { MutationTypes } from './mutation-types'

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>

//We must also augment the ActionContext type which is shipped with the vuex package, because it supposes we can commit any mutation. AugmentedActionContext do the job, is restricts committing only the declared mutations (it also checks payload type).
export interface Actions {
  [ActionTypes.GET_COUTNER](
    { commit }: AugmentedActionContext,
    payload: number
  ): Promise<number>;
}


//We have a simple GET_COUNTER action which returns Promise, which is resolved in 500ms. It commits the previously defined mutation
export const actions = {
  [ActionTypes.GET_COUTNER]({ commit }) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const data = 256
        commit(MutationTypes.SET_COUNTER, data)
        resolve(data)
      }, 500)
    })
  },
}
