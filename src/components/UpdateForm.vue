<template>
    <div>
        <div class="md-title">Update <span @click="changeForm"><md-icon>refresh</md-icon></span></div>
        <md-field>
        <label>Event</label>
        <md-input v-model="name" v-if="isFirstOrLast" disabled></md-input>
        <md-input v-model="name" v-else></md-input>
        </md-field>
        <vue-slider class="slider" v-model="sliderValue" min=-100></vue-slider>

        <md-dialog-confirm
            :md-active.sync="deleteModalActive"
            md-content="Are you sure you want to delete this event?"
            md-confirm-text="Agree"
            md-cancel-text="Disagree"
            @md-confirm="deleteEvent()" />
        <md-dialog-confirm
            :md-active.sync="deleteAllModalActive"
            md-content="Are you sure you want to delete all events?"
            md-confirm-text="Agree"
            md-cancel-text="Disagree"
            @md-confirm="deleteAllEvents()" />
        <div class="md-layout md-gutter">
            <div class="md-layout-item">
                <md-button class="md-raised md-accent" @click="deleteModalActive = true" v-if="validate">Delete</md-button>
                <md-button class="md-raised md-accent" disabled v-else>Delete</md-button>
            </div>
            <div class="md-layout-item">
                <md-button class="md-raised md-accent" @click="deleteAllModalActive = true">Delete All</md-button>
            </div>
        </div>
        <div class="md-layout-item">
            <md-field>
                <label>JSON</label>
                <md-textarea v-model="json"></md-textarea>
            </md-field>
            <div class="md-layout md-gutter">
                <div class="md-layout-item">
                    <md-button
                        class="md-raised md-primary"
                        @click="showSnackbar = true"
                        v-clipboard:copy="json"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"
                    >COPY!</md-button>
                </div>
                <div class="md-layout-item">
                    <md-button class="md-raised md-primary" @click="importJSON">IMPORT</md-button>
                </div>
            </div>
        </div>
        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showSuccessSnackbar" md-persistent>
            <span>COPY SUCCESS!</span>
        </md-snackbar>
        <md-snackbar :md-position="position" :md-duration="isInfinity ? Infinity : duration" :md-active.sync="showErrorSnackbar" md-persistent>
            <span>COPY FAILED!</span>
        </md-snackbar>
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
            deleteModalActive: false,
            deleteAllModalActive: false,
            json: null,
            showSuccessSnackbar: false,
            showErrorSnackbar: false,
            position: 'center',
            duration: 1000,
            isInfinity: false
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
            jsonValidate() {
                
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
            events(newValue, oldValue) {
                this.json = '{"events": ' + JSON.stringify(this.events) + "}"
            },
            name() {
                if(this.name == this.events[this.currentIndex].name) return 
                this.updateEvent()
            },
        },

        mounted() {
            this.name = this.events[this.currentIndex].name
            this.sliderValue = this.events[this.currentIndex].value
            this.json = '{"events": ' + JSON.stringify(this.events) + "}"
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
            },
            importJSON() {
                store.commit('importJSON', JSON.parse(this.json).events)
            },
            onCopy(e) {
                this.showSuccessSnackbar = true
            },
            onError(e) {
                this.showErrorSnackbar = true
                
            }            
        }
    }
</script>
