import { Store } from 'vuex'
import { State } from './store/types'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}