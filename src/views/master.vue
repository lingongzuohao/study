<template>
	<transition name="slide-fade" mode="out-in" appear>
		<!-- <router-view></router-view> -->
		<component :is="compId"></component>
	</transition>
</template>

<script>
	import MasterDetail from './master/detail'
	import MasterList from './master/list'

	export default {
		data() {
			return {
				compId: null,
			}
		},
		watch: {
			'$route': function() {
				this.setComp()
			}
		},
		created() {
			this.setComp()
		},
		methods: {
			setComp() {
				let query = this.$route.query

				if(query.id) {
					this.compId = MasterDetail
				} else {
					this.compId = MasterList
				}
			}
		},
		components: {
			MasterList,
			MasterDetail,
		}
	}
</script>