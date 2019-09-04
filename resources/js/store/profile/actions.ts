import { ActionTree } from 'vuex'
import axios from 'axios'
import { ProfileState, User } from './types'
import { RootState } from '../types'

export const actions: ActionTree<ProfileState, RootState> = {
    fetchData ({ commit }): any {
        axios({
            url: '/api/me'
        }).then(response => {
            const payload: User = response && response.data
            commit('profileLoaded', payload)
        }, error => console.log(error))
    }
}
