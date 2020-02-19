<template>
	<div>
	   <AppHeader/>
	   <AppSide/>
	   <AppMain/>
	  </div>
</template>

<script>
	//导入个单元组件
	import AppHeader from '@/components/AppHeader.vue';
	import AppSide from '@/components/AppSide.vue';
	import AppMain from '@/components/AppMain.vue';
	export default {
		components:{
			AppHeader,AppSide,AppMain
		}
		
	}
</script>

<style scoped>
/* 头部区域 */
.header {
    position: absolute;
    line-height: 50px;
    top: 0px;
    left: 0px;
    right: 0px;
    background-color: #2d3a4b
}
.navbar {
    position: absolute;
    width: 230px;
    top: 50px;
    left: 0px;
    bottom: 0px;
    overflow-y: auto;
    background-color: #545c64;
}
.main {
    position: absolute;
    top: 50px;
    left: 230px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow-y: auto;
    /* background-color: red; */
}
</style>
