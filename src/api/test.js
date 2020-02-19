//@代表的是/src

import request from '@/utils/request';

//request  get

request.get('/api/topics?include=user,category').then(response=>{
   console.log('get1',response.data);

}).catch(error=>{
	console.log(error);
})

//测试三  导出默认对象
export default {
	getlist(){
		const req = request({
			url:'/api/topics?include=user,category',
			method:'get'
		});
		return req;
		
	}
	
}



