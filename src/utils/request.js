import axios from 'axios';

//手动创建一个axios的对像
const request = axios.create({
	baseUrl:'/',
	timeout:145000   //请求超时
	
	
})

export default request    //导出这个对象