<template>
	<div class="login-container">
		<el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-form">
		   <h2 class="login-title">会员管理系统</h2>
		  <el-form-item label="账号" prop="name">
		    <el-input v-model="form.name"></el-input>
		  </el-form-item>
		  <el-form-item label="密码" prop="password">
		    <el-input v-model="form.password" type="password"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
		    <el-button>取消</el-button>
		  </el-form-item>
		</el-form>
		
		
		
	</div>
</template>

<script>
	import {login,getUserinfo} from '../../api/login.js';
	  export default {
	    data() {
	      return {
	        form: {
	          name: '',
	          password: ''
	        
	        },
			rules:{
				name:[
					 { required: true, message: '账号不能为空', trigger: 'blur' },
					  { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
					
				],
				password:[
					 { required: true, message: '密码不能为空', trigger: 'blur' }
				]
				
			}
	      }
	    },
	    methods: {
	     submitForm(formName)
		 {
	             this.$refs[formName].validate((valid) => {
	               if (valid) {
					
	                  login(this.form.name,this.form.password).then(response=>{
						   if(response.data.flag) {   //如果登录成功
							   //去获取用户的基本信息
							   getUserinfo(response.data.data.token).then(response=>{
								   
								  const user = response.data.data;
								  localStorage.setItem('lcc-user', JSON.stringify(user))
								  localStorage.setItem('lcc-token', response.data.data.token)
								  //前往首页
								  this.$router.push('/')
								   
							   })
						   }else{
							   this.$message({
							             message: response.data.message,
							             type: 'warning'
							           });
							   
						   }
						  
					  })
	               } else {
	                 console.log('error submit!!');
	                 return false;
	               }
	             });
	    }
	            },
				}
</script>

<style scoped>
.login-form {
    width: 350px;
    /* 上下间隙 160px, 左右自动居中 */
    margin: 160px auto;
    background-color: rgb(255,255,255,0.8);
    padding: 28px;
    border-radius: 20px;
}
.login-container {
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../../assets/login.jpg')
}
.login-title {
    color: #303133;
    text-align: center;
}
</style>
