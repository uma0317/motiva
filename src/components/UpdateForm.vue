<template>
  <div>
    <div class="md-title">Update <span @click="changeForm"><md-icon>refresh</md-icon></span></div>
    <md-field>
      <label>Event</label>
      <md-input v-model="name"></md-input>
    </md-field>
    <vue-slider class="slider" v-model="sliderValue"></vue-slider>
    
    <div class="md-layout">
			<div class="md-layout-item">
                <md-button class="md-raised md-accent" v-on:click="deleteEvent()">Delete</md-button>
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
            sliderValue: 0
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

        methods: {
            updateEvent() {
                store.commit('updateEvent', {name: this.name, value: this.sliderValue})
            },
            deleteEvent() {
                store.commit('deleteEvent')
            },
            changeForm() {
                store.commit('incrementcurrentFormIndex')
            }
        }
    }
</script>
