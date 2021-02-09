import { Store } from '../store'

//augmentation of the global Vue types.
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store;
  }
}