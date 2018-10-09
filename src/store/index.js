import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // = data
        events: [{
            id: 0,
            name: '',
            value: 0
        }],
        currentIndex: 0,
    },

    getters: { // = computed properties
        getLabels(state) {
            return state.events.map(event => {
                return event.name
            })
        },

        getEvents: (state) => {
            return state.events
        }
    },

    actions: {

    },

    mutations: {
        fetchEvents(state) {
            var events = JSON.parse(localStorage.getItem('events'))
            if(events) {
                state.events = events
                state.currentIndex = events.length - 1
            }
        },

        pushEvent(state, event) {
            event.id = state.events.length
            state.events.push(event)
            localStorage.setItem('events', JSON.stringify(state.events));
        },

        updateEvent(state, event) {
            state.events[state.currentIndex].name = event.name
            state.events[state.currentIndex].value = event.value
            
            var evt = state.events.pop()
            state.events.push(evt)
            localStorage.setItem('events', JSON.stringify(state.events));
        },

        deleteEvent(state) {
            state.events.splice(state.currentIndex, 1)
            localStorage.setItem('events', JSON.stringify(state.events));
        },

        spliceEvent(state, event) {
            event.id = state.events.length
            state.events.splice(state.currentIndex + 1, 0, event)
            localStorage.setItem('events', JSON.stringify(state.events))
        },

        setCurrentIndex(state, event) {
            state.currentIndex = event
        }
    }
})