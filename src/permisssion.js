/**
 * 权限校验：
 *  Vue Router中的 前置钩子函数 beforeEach(to, from, next)
 * 当进行路由跳转之前，进行判断 是否已经登录 过，登录过则允许访问非登录页面，否则 回到登录页
 * 
 * to:  即将要进入的目标路由对象
 * from: 即将要离开的路由对象
 * next: 是一个方法，可以指定路由地址，进行路由跳转
 */

//引入router
import router from './router'
import {getUserinfo} from '@/api/login.js';
router.beforeEach((to,from,next)=>{
	//先获取token
	const token = localStorage.getItem('lcc-token')
	//console.log('token',token)
	if(!token)
	{
		if(to.path!=='/login'){
			next({path:'login'})   //next 一个对象
		}else{
			
			next()
		}
		
	}else{   //本地还存在token
		if(to.path =="/login"){
			next()
		}else{
			//判断有没有userinfo
			const userInfo  = localStorage.getItem('lcc-user')
			if(userInfo){
				next()
			}else
			  //用token 去获取userInfo
			  getUserinfo(token).then(response=>{
				  const rep = response.data
				  if(rep.flag){
					   // 如果获取到用户信息，则进行非登录页面，否则回到登录页面
					  // 保存到本地
					  localStorage.setItem('lcc-user', JSON.stringify(resp.data))
					  next()
				  }else{
					  //获取用户信息失败
					  next({path: '/login'})
				  }
			  }
				)
				
			}
			
		}
		
	}
	)
