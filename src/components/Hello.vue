<template>
	<div>
		<line-chart></line-chart>
	</div>
</template>

<script>
import LineChart from '@/components/LineChart'
export default {
	name: 'hello',
	components: {
		LineChart
	},
	data () {
		return {
			msg: 'Welcome to Your Vue.js PWA'
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}
</style>
