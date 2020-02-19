<template>
	<div class="main">
		<app-link v-show="$route.path !=='/home'"></app-link>
		<router-view></router-view>
     </div>
</template>

<script>
	import AppLink from './AppLink.vue'
	export default{
		components:{AppLink}
	}
</script>

<style>
</style>
