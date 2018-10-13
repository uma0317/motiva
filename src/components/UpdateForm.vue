<template>
    <div>
        <div class="md-title">Update <span @click="changeForm"><md-icon>refresh</md-icon></span></div>
        <md-field>
        <label>Event</label>
        <md-input v-model="name" v-if="isFirstOrLast" disabled></md-input>
        <md-input v-model="name" v-else></md-input>
        </md-field>
        <vue-slider class="slider" v-model="sliderValue" min=-100></vue-slider>
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-button class="md-raised md-accent" @click="deleteEvent()" v-if="validate">Delete</md-button>
                <md-button class="md-raised md-accent" disabled v-else>Delete</md-button>
            </div>
            <div class="md-layout-item">
                <md-button class="md-raised md-accent" @click="deleteAllEvents()">Reset</md-button>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex'
    import vueSlider from 'vue-slider-component';
    import store from '@/store/index'
    export default {
        name: 'UpdateForm',
        
        data: () => ({
            width: "auto",
            name: null,
            sliderValue: 0,
        }),

        components: {
            vueSlider
        },

        computed: {
            ...mapState({
                events: state => state.events,
                currentIndex: state => state.currentIndex,
            }),
            isCurrentForm() {
                return store.getters.getCurrentForm === "UpdateForm"
            },
            validate() {
                if(this.name === null) return false
                if(this.isFirstOrLast) return false
                return true
            },
            isFirstOrLast() {
                if(this.currentIndex === 0) return true
                if(this.currentIndex === this.events.length - 1) return true
                return false
            }
        },

        watch: {
            currentIndex() {
                this.name = this.events[this.currentIndex].name
                this.sliderValue = this.events[this.currentIndex].value
            },

            sliderValue(newValue, oldValue) {
                if(this.sliderValue == this.events[this.currentIndex].value) return 
                this.updateEvent()
            },

            name() {
                if(this.name == this.events[this.currentIndex].name) return 
                this.updateEvent()
            },
        },

        mounted() {
            this.name = this.events[this.currentIndex].name
            this.sliderValue = this.events[this.currentIndex].value
        },

        methods: {
            updateEvent() {
                store.commit('updateEvent', {name: this.name, value: this.sliderValue})
            },
            deleteEvent() {
                store.commit('deleteEvent')
                this.name = null
                this.sliderValue = 0
            },
            deleteAllEvents() {
                store.commit('deleteAllEvents')
                this.name = null
                this.sliderValue = 0
            },
            changeForm() {
                store.commit('incrementcurrentFormIndex')
            }
        }
    }
</script>
