<template>
    <ul>
        <li>Auth: {{ auth }}</li>
        <li>User ID: {{ userId }}</li>
        <li>{{ profile }}</li>
    </ul>
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { State, Action } from 'vuex-class'
  import { ProfileState } from '../store/profile/types'

  const namespace: string = 'profile'

  @Component
  export default class TestComponent extends Vue {
    @State('auth') auth
    @State('userId') userId
    @Action('fetchData') fetchCommonData: any

    @State('profile') profile: ProfileState
    @Action('fetchData', { namespace }) fetchProfileData: any

    mounted () {
      this.fetchCommonData()
      this.fetchProfileData()
    }
  }
</script>
