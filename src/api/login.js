import request from '@/utils/request';

export function login(username,password){
	return request({
		url:'dev-api/user/login',
		method:'post',
		data:{
			username,
			password
		}
		
	})
	
	
}

export function getUserinfo(token){
	return  request({
		  url: `dev-api/user/info/${token}`,
		  method: 'get'
		 
	 })
}

//登出系统
export function logout(token){
	return  request({
		  url: `dev-api/user/logout`,
		  method: 'post',
		  data:{
			  token
		  }
		 
	 })
}