<template>
	<transition name="slide-fade" mode="out-in" appear>
		<!-- <router-view></router-view> -->
		<component :is="compId"></component>
	</transition>
</template>

<script>
	import StoryDetail from './story/detail'
	import StoryList from './story/list'

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
				console.log(query)
				if(query.id) {
					this.compId = StoryDetail
				} else {
					this.compId = StoryList
				}
			}
		},
		components: {
			StoryList,
			StoryDetail,
		}
	}
</script>