<script>
    import { Line, mixins } from 'vue-chartjs'

    import store from '@/store/index'
    import { mapState, mapGetters } from 'vuex'
    export default {
        extends: Line,
        data () {
            return {
                //Chart.js options that controls the appearance of the chart
            
            }
        },

        computed: {
            ...mapGetters([
                'getEvents',
            ]),
            ...mapState({
                events: state => state.events
            }),

            getLabels() {
                return this.events.map(event => { return event.name })
            },

            getValues() {
                return this.events.map(event => { return event.value })
            },

            datacollection() {
                return {
                    labels: this.getLabels,
                    datasets: [
                        {
                            label: 'Event',
                            borderColor: '#f87979',
                            pointBackgroundColor: 'white',
                            borderWidth: 1,
                            pointBorderColor: '#249EBF',
                            //Data to be represented on y-axis
                            data: this.getValues,
                            fill: false,
                            pointRadius: 8,
                            pointHoverRadius: 8
                        }
                    ]
                }
            },

            options() {
                return {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                suggestedMin: -100,
                                suggestedMax: 100,
                            },
                            gridLines: {
                                display: true
                            }
                        }],
                        xAxes: [ {
                            // display: false,
                            gridLines: {
                                display: true
                            },
                            labels: this.getEmptyLabels(),
                        }]
                    },
                    legend: {
                        display: false
                    },
                    title: {
                        display: false
                    },
                    tooltips: {
                        mode: 'nearest'
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    events: ['click', 'mousemove'],
                    onClick: function (e, el) {
                        if (! el || el.length === 0) return;
                        store.commit("setCurrentIndex", el[0]._index)
                        console.log(el[0]);
                    }
                }
            }
        },

        methods: {
            getClickedEvents(evt) {
                var activePoints = this.getElementsAtEvent(evt);
            },

            getEmptyLabels() {
                var labels = []
                this.events.forEach(() => {
                    labels.push('')
                })
                labels.pop()
                labels.push('Now')
                return labels
            }
        },

        watch: {
            events (newCevents, oldCevents) {
                console.log("change")
                this.renderChart(this.datacollection, this.options)                
            }
        },

        created () {
            store.commit('fetchEvents')
        },

        mounted () {
        //renderChart function renders the chart with the datacollection and options object.
            this.renderChart(this.datacollection, this.options)
        }
    }
</script>