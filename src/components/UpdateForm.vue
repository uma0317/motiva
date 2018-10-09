<template>
  <div>
    <div class="md-title">Update</div>
    <md-field>
      <label>Event</label>
      <md-input v-model="events[currentIndex].name"></md-input>
    </md-field>
    <md-field>
      <label>Value</label>
      <md-input v-model="events[currentIndex].value"></md-input>
    </md-field>
    <div class="md-layout md-gutter">
			<div class="md-layout-item">
                <md-button class="md-raised md-primary" v-on:click="updateEvent()">Update</md-button>
			</div>
			<div class="md-layout-item">
                <md-button class="md-raised md-accent" v-on:click="deleteEvent()">Delete</md-button>
			</div>
		</div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import store from '@/store/index'
    export default {
        name: 'UpdateForm',
        
        data: () => ({
        }),
        
        computed: {
            ...mapState({
                events: state => state.events,
                currentIndex: state => state.currentIndex,
            }),
        },

        methods: {
            updateEvent() {
                store.commit('updateEvent', {name: this.events[this.currentIndex].name, value: this.events[this.currentIndex].value})
            },
            deleteEvent() {
                store.commit('deleteEvent')
            }
        }
    }
</script>
