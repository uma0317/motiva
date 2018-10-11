<template>
  <div>
    <div class="md-title">Create <span v-on:click="changeForm"><md-icon>refresh</md-icon></span></div>
    <md-field>
      <label>Event</label>
      <md-input v-model="name"></md-input>
    </md-field>
    <vue-slider class="slider" v-model="value" min="-100"></vue-slider>

    <div class="md-layout md-gutter">
			<div class="md-layout-item">
                <md-button class="md-raised md-primary" v-on:click="pushEvent()" v-if="validate">Push</md-button>
                <md-button class="md-raised md-primary" disabled v-else>Push</md-button>
			</div>
			<div class="md-layout-item">
                <md-button class="md-raised md-primary" v-on:click="spliceEvent()" v-if="validate && !isLast">Splice</md-button>
                <md-button class="md-raised md-primary" disabled v-else>Splice</md-button>
			</div>
		</div>
  </div>
</template>

<script>
    import { mapState } from 'vuex'
    import store from '@/store/index'
    import vueSlider from 'vue-slider-component';
    export default {
        name: 'Form',
        data: () => ({
            name: null,
            value: 0,
        }),
        
        computed: {
            validate() {
                if(this.name === null) return false
                return true
            },

            isLast() {
                if(store.state.currentIndex === store.state.events.length - 1) return true
                return false
            }
        },

        components: {
            vueSlider
        },

        methods: {
            pushEvent() {
                store.commit('pushEvent', {name: this.name, value: this.value})
            },
            spliceEvent() {
                store.commit('spliceEvent', {name: this.name, value: this.value})
            },
            changeForm() {
                store.commit('incrementcurrentFormIndex')
            }
        }
    }
</script>

<style>
    .slider {
        margin-top: 45px;
    }

    .md-icon {
        cursor: pointer;
    }
</style>

