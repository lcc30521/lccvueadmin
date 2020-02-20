import Vue from "vue";
import Router from "vue-router";
import Login from './views/login';
import Layout from '@/components/Layout.vue'
import Home from './views/home';
import Member from './views/member';
import Supplier from './views/supplier';
import Goods from './views/goods';
import Staff from './views/staff';
Vue.use(Router);
export default new Router({
	routes:[
	{
		//登录页
		path:'/login',
		name:'login',//路由名称
		component:Login
		
		
		
	},
	{
	      path: '/',
	      name: 'layout', //路由名称
	      component: Layout, //组件对象
	      redirect: '/home',
	      children: [
	        {
	          path: '/home',
	          component: Home,
	          meta: {title: '首页'}
	        },
	        // {
	        //   path: '/member',
	        //   component: Member
	        // }
	      ]
	    },
	    {
	      path: '/member',
	      component: Layout,
	      children: [
	        {
	          path: '/', // /member/
	          component: Member,
	          meta: {title: '会员管理'}
	        }
	      ]
	    },
	    {
	      path: '/supplier',
	      component: Layout,
	      children: [
	        {
	          path: '/', 
	          component: Supplier,
	          meta: {title: '我的记录'}
	        }
	      ]
	    },
	    {
	      path: '/goods',
	      component: Layout,
	      children: [
	        {
	          path: '/', 
	          component: Goods,
	          meta: {title: '商品管理'}
	        }
	      ]
	    },
	    {
	      path: '/staff',
	      component: Layout,
	      children: [
	        {
	          path: '/', 
	          component: Staff,
	          meta: {title: '员工管理'}
	        }
	      ]
	    }
		
		
	]
})
