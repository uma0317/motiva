<template>
	<div id="chart-contaienr">
		<line-chart></line-chart>
		<div class="form-container">
			<div class="md-layout-item md-xsmall-size-100" v-if="isCurrentForm('Form')">
				<Form></Form>
			</div>
			<div class="md-layout-item md-xsmall-size-100" v-if="isCurrentForm('UpdateForm')">
				<UpdateForm></UpdateForm>
			</div>
		</div>
	</div>
</template>

<script>
import LineChart from '@/components/LineChart'
import Form from '@/components/Form'
import store from '@/store/index'
import UpdateForm from '@/components/UpdateForm'
export default {
	name: 'Index',
	components: {
		LineChart,
		Form,
		UpdateForm
	},
	computed: {

	},

	methods: {
				isCurrentForm(formName) {
			return formName === store.getters.getCurrentForm
		}
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

#chart-contaienr {
	padding: 10px;
}

.form-container {
	max-width: 640px;
	margin: 0 auto;
}
</style>
