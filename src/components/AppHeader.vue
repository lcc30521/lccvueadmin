<template>
	<div class="header">
	        <a href="#/">
	            <img class="logo" src="@/assets/logo.png" width="25px">
	            <span class="company">管理系统</span>
	        </a>
	        
	        <el-dropdown @command="handleCommand">
	            <span class="el-dropdown-link">
	               <i class="el-icon-arrow-down el-icon--right"></i>
	            </span>
	            <el-dropdown-menu slot="dropdown">
	                <el-dropdown-item icon="el-icon-edit" command="a">修改密码</el-dropdown-item>
	                <el-dropdown-item icon="el-icon-s-fold" command="b">退出系统</el-dropdown-item>
	            </el-dropdown-menu>
	        </el-dropdown>
	
	        <!-- 修改密码 -->
	<!--        <el-dialog title="修改密码"  width="400px">
	            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" style="width: 300px">
	                <el-form-item label="原密码" prop="oldPass">
	                    <el-input type="password" v-model="ruleForm.oldPass" autocomplete="off"></el-input>
	                </el-form-item>
	                <el-form-item label="新密码" prop="pass">
	                    <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
	                </el-form-item>
	                <el-form-item label="确认密码" prop="checkPass">
	                    <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
	                </el-form-item>
	                <el-form-item>
	                    <el-button type="primary" >提交</el-button>
	                    <el-button >重置</el-button>
	                </el-form-item>
	            </el-form>
	        </el-dialog> -->
	    </div>
</template>

<script>
	import {logout} from '@/api/login.js';
 export default {
    methods: {
      handleCommand(command) {
       switch (command){
       	case "a":
       		this.$message('这是一条消息提示');
			break;
		case "b":
		     //登出系统
			 this.handLogout()
			break;
       	default:
       		break;
       }
      },
	  //退出系统
	  handLogout(){
		 //提交给后台  后台将token加入黑名单 
		 logout(localStorage.getItem('lcc-token')).then(response=>{
			 //接收
			 const rep  = response.data
			 if(rep.flag)
             {
				 //退出成功  清除本地数据
				   localStorage.removeItem('lcc-token')
				   localStorage.removeItem('lcc-user')
				   //跳转到登录页面
				    this.$router.push('/login')
			 }else{
				  this.$message({
					 message: resp.message,
					 type: 'warning',
					 duration: 500 // 弹出停留时间
				 });
			 }		
		 })
	  }
    }
  }	
</script>

<style>
	.logo{
	    vertical-align: middle;
	    padding: 0px 10px 0 40px;
	}
	.company {
	    position: absolute;
	    color: white;
	}
	
	/* 下拉菜单  */
	.el-dropdown {
	    float: right;
	    margin-right: 40px;
	}
	.el-dropdown-link {
	    color: white;
	    cursor: pointer;
	}
</style>
