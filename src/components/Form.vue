<template>
  <div>
    <div class="md-title">Create</div>
    <md-field>
      <label>Event</label>
      <md-input v-model="name"></md-input>
    </md-field>
    <md-field>
      <label>Value</label>
      <md-input v-model="value"></md-input>
    </md-field>
    <div class="md-layout md-gutter">
			<div class="md-layout-item">
                <md-button class="md-raised md-primary" v-on:click="pushEvent()">Push</md-button>
			</div>
			<div class="md-layout-item">
                <md-button class="md-raised md-primary" v-on:click="spliceEvent()">Splice</md-button>
			</div>
		</div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import store from '@/store/index'
    export default {
        name: 'Form',
        data: () => ({
            name: null,
            value: null,
        }),
        
        methods: {
            pushEvent() {
                store.commit('pushEvent', {name: this.name, value: this.value})
            },
            spliceEvent() {
                store.commit('spliceEvent', {name: this.name, value: this.value})
            }
        }
    }
</script>
