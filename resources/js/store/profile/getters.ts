import { GetterTree } from 'vuex'
import { ProfileState } from './types'
import { RootState } from '../types'

export const getters: GetterTree<ProfileState, RootState> = {
    fullInfo ({ user, loaded }): string {
        if (!loaded) {
            return 'anonymous'
        }

        return `${user.name} <${user.email}>`
    }
}
