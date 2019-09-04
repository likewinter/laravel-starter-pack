import { MutationTree } from 'vuex'
import { ProfileState } from './types'
import { User } from './types'

export const mutations: MutationTree<ProfileState> = {
    profileLoaded (state, payload: User) {
        state.user = payload
        state.loaded = true
    }
}
