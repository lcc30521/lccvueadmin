<template>
  <div class="hello">
    <h1>233</h1>
    {{count}}
	<ul>
		<li v-for="(lists,key1) in list" :key="key1"><p style="width:1000px;">{{lists.title}}</p></li>
		
		
	</ul>
  </div>
</template>

<script>
	//直接导入接口1
	import testApi from "@/api/test";
	
	
export default {
  name: 'HelloWorld',
  data() {
  	return {
  		list: []
  	}
  },
  created(){
	  this.fetchData()
  },
  methods:{
	  fetchData(){
		 testApi.getlist().then(response=>{
			 console.log('get3',response.data);
			 this.list = response.data.data;
		 }).catch(error=>{
			 console.log(error);
		 })
	  }
  },
  computed:{
	 count(){
		 return this.$store.state.count
	 } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
  color: #42b983;
}
</style>
