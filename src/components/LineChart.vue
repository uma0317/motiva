<script>
  //Importing Line class from the vue-chartjs wrapper
  import {Line} from 'vue-chartjs'
  //Exporting this so it can be used in other components
  export default { 
    extends: Line,
    data () {
      return {
        datacollection: {
        //Data to be represented on x-axis
          labels: ['好きな人ができた', '学芸会で主役', '先生に怒られた', '主役', '指揮者をやった', 'バドの全道大会', '高校受験合格', '大学落ちた', '大学受かった', 'ドキュメント見た', 'プログラミングスタート', '逆求人で色々なインターン参加'], 
          datasets: [
            {
              label: 'Data One',
              borderColor: '#f87979',
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              //Data to be represented on y-axis
              data: [40, 60, -50, 70, 70, 50, 80, -80, 80, 70, 90, 100],
              fill: false
            }
          ]
        },
        //Chart.js options that controls the appearance of the chart
       
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        suggestedMin: -100
                    },
                    gridLines: {
                        display: true
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Motivation',
                        fontFamily: 'monospace',
                        fontSize: 14
                    },
                }],
                xAxes: [ {
                    display: false,
                    gridLines: {
                        display: false
                    },
                    scaleLabel: {
                        display: true,
                        labelString: '時間軸',
                        fontFamily: 'monospace',
                        fontSize: 14
                    },
                }]
            },
            legend: {
                display: false
            },
            title: {
                display: false
            },
            
            responsive: true,
            maintainAspectRatio: false
        }
      }
    },
    mounted () {
    //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
    }
  }
</script>