import Vue from 'vue'
import axios from 'axios'
import Vuex, { ActionTree, MutationTree, StoreOptions } from 'vuex'
import { RootState } from './types'
import { profile } from './profile'

Vue.use(Vuex)

const actions: ActionTree<RootState, RootState> = {
    fetchData ({ commit }) {
        axios
            .get('/api/state/')
            .then(response => {
                const payload: RootState = response && response.data
                commit('globalStateLoaded', payload)
            })
    }
}

const mutations: MutationTree<RootState> = {
    globalStateLoaded(state, payload: RootState) {
        state.auth = payload.auth
        state.userId = payload.userId
    }
}

const store: StoreOptions<RootState> = {
    state: {
        auth: false,
        userId: null
    },
    actions,
    mutations,
    modules: {
        profile
    }
}

export default new Vuex.Store<RootState>(store)
