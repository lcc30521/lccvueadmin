<template>
	<div>
  <!--头部-->
   <!-- :inline="true" 表单一行显示 -->
  <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 20px">
	  <!-- 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效 -->
	  <el-form-item prop="cardNum">
		  <el-input v-model="searchMap.cardNum" placeholder="会员卡号" style="width: 200px"></el-input>
	  </el-form-item>
	  <el-form-item prop="name">
		  <el-input v-model="searchMap.name" placeholder="会员名字" style="width: 200px"></el-input>
	  </el-form-item>
	  <el-form-item prop="payType">
		  <el-select v-model="searchMap.payType" placeholder="支付类型" style="width: 110px">
			  <!-- 不要忘记 payTypeOptions 绑定到data中 -->
			  <el-option v-for="option in payTypeOptions" 
			  :key="option.type"
			  :label="option.name"
			  :value="option.type"
			  ></el-option>
		  </el-select>
	  </el-form-item>
	  <el-form-item prop="birthday">
		  <!-- value-format 是指定绑定值的格式 -->
		  <el-date-picker style="width: 200px" value-format="yyyy-MM-dd" v-model="searchMap.birthday"  type="date" placeholder="出生日期"> </el-date-picker>
	  </el-form-item>

	  <el-form-item>
		  <el-button type="primary" @click="fetchData" >查询</el-button>
		   <el-button type="primary" @click="handleAdd" >新增</el-button> 
		  <el-button  @click="resetForm('searchForm')" >重置</el-button>
	  </el-form-item>
  </el-form>
  <!--头部-->
  
  
  <el-table :data="list" stripe style="width: 100%">
    <el-table-column prop="cardNum"  label="会员卡号"></el-table-column>
    <el-table-column prop="name" label="会员姓名" ></el-table-column>
    <el-table-column prop="birthday" label="会员生日"></el-table-column>
    <el-table-column prop="phone" label="手机号码"></el-table-column>
    <el-table-column prop="integral" label="可用积分"></el-table-column>
    <el-table-column prop="money" label="开卡金额"></el-table-column>
    <el-table-column prop="payType" label="支付方式">
		 <template slot-scope="scope">
			<span>{{scope.row.payType | payTypeFilter}}</span>
		</template>
		
	</el-table-column>
    <el-table-column prop="address" label="会员地址"></el-table-column>
	<el-table-column label="操作" width="150">
	                <template slot-scope="scope">
	                    <el-button
	                    size="mini"
	                    @click="handleEdit(scope.row.id)">编辑</el-button>
	                    <el-button
	                    size="mini"
	                    type="danger"
	                    @click="handleDelete(scope.row.id)">删除</el-button>
	                </template>
	             </el-table-column>
  </el-table>
  
  <!--分页组件-->
  <el-pagination
   @size-change="handleSizeChange"
	@current-change="handleCurrentChange"
	:current-page="currentPage"
	:page-sizes="[10, 20, 30, 40]"
	:page-size="10"
	layout="total, sizes, prev, pager, next, jumper"
	:total="total">
  </el-pagination>
  <!--分页组件-->
  
  
  <!--弹出框-->
      <el-dialog title="会员编辑" :visible.sync="dialogFormVisible" width="500px">
        <el-form :model="pojo" :rules="rules"  ref="pojoForm"
            label-width="100px"
            label-position="right"
            style="width: 400px;">
          <el-form-item label="会员卡号" prop="cardNum" >
		 <el-input v-model="pojo.cardNum" ></el-input>
		 </el-form-item>
		 <el-form-item label="会员姓名" prop="name" >
		 <el-input v-model="pojo.name" ></el-input>
		 </el-form-item>
		 <el-form-item label="会员生日" prop="birthday" >
			 <!-- value-format 是指定绑定值的格式 -->
			 <el-date-picker style="width: 200px" value-format="yyyy-MM-dd" v-model="pojo.birthday"  type="date" placeholder="会员生日"> </el-date-picker>
		 </el-form-item>
		 <el-form-item label="手机号码" prop="phone" >
		 <el-input v-model="pojo.phone" ></el-input>
		 </el-form-item>
		 <el-form-item label="开卡金额" prop="money">
		 <el-input v-model="pojo.money" ></el-input>
		 </el-form-item>
		 <el-form-item label="可用积分" prop="integral">
		 <el-input v-model="pojo.integral" ></el-input>
		 </el-form-item>
		 <el-form-item label="支付类型" prop="payType" >
			 <el-select v-model="pojo.payType" placeholder="支付类型" style="width: 110px">
				 <!-- 不要忘记 payTypeOptions 绑定到data中 -->
				 <el-option v-for="option in payTypeOptions" 
				 :key="option.type"
				 :label="option.name"
				 :value="option.type"
				 ></el-option>
			 </el-select>
		 </el-form-item>
		 <el-form-item label="会员地址" prop="address">
			 <el-input type="textarea" v-model="pojo.address" ></el-input>
		 </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="pojo.id === null ? addData(): updateData()">确 定</el-button>
        </div>
      </el-dialog>

  <!--弹出框-->
  
  </div>
</template>

<script>
  import memberApi from '@/api/menber' 
   
   //支付类型
   const payTypeOptions = [
       {type: '1', name: '现金'},
       {type: '2', name: '微信'},
       {type: '3', name: '支付宝'},
       {type: '4', name: '银行卡'},
   ]
  export default {
    data() {
      return {
        list: [],
		total:0,   //总记录数
		currentPage:1, //当前页码
		pageSize:20,  //每页显示条数
		searchMap:{   //条件搜索
			cardNum:'',
			name:'',
			payType:'',
			birthday:''
		},
		payTypeOptions:payTypeOptions,
	    dialogFormVisible: false,
			form: {
			  name: '',
			  region: '',
			 
			},
			pojo: {
				id: null,
				cardNum: '',
				name: '',
				birthday: '',
				phone: '',
				money: 0,
				integral: 0,
				payType: '',
				address: ''
			}, // 提交的数据
			
	   rules: { // 校验规则
				cardNum: [
					{required: true, message: '卡号不能为空', trigger: 'blur'}
				],
				name: [
					{required: true, message: '姓名不能为空', trigger: 'blur'}
				],
				payType: [
					{required: true, message: '支付类型不能为空', trigger: 'change'}
				]
			}
      }
    },
	created(){
		//初始化数据
		this.fetchData()
	},
	methods:{
		handleEdit(id){
			//初始化编辑接口
			
			this.handleAdd()
			memberApi.getById(id).then(response=>{
				const resp = response.data
				if(resp.flag){
					this.pojo = resp.data
				}
				
			})
		},
		handleDelete(id){
			console.log('删除', id)
			this.$confirm('确认删除这条记录吗？', '提示', {
				confirmButtonText: '确认',
				cancelButtonText: '取消',
			}).then(() => {
				// 确认
				console.log('确认')
				memberApi.deleteById(id).then(response => {
					// console.log(response)
					const resp = response.data

					this.$message({
						message: resp.message,
						type: resp.flag ? 'success': 'error'
					})

					if(resp.flag) {
						// 删除成功，刷新列表数据
						this.fetchData()
					}
				})
			}).catch(() => {
				// 取消，不用理会
				console.log('取消')
			})
		},
		//调用分页查询数据
		fetchData(){
			memberApi.search(this.currentPage,this.pageSize,this.searchMap).then(response=>{
				const resp = response.data
				this.list = resp.data.rows
				this.total = resp.data.total
				
				
			})
			
		},
		//改变每页显示条数
		handleSizeChange(val){
			this.pageSize = val
			this.fetchData()
		},
		//页码改变后 会被触发 val代表是最新的页面
		handleCurrentChange(val) {
			// console.log(val)
			this.currentPage = val
			this.fetchData()
		        },
				
		//重置
		resetForm(formName) {
			console.log('重置', formName)
			// 重置会看 el-form-item 组件元素的 prop 上是否指定了字段名，指定了才会重置生效
			this.$refs[formName].resetFields()
		},
		
		//添加  弹出窗口
		handleAdd(){
			
			this.dialogFormVisible = true
			//初始化表单
			this.$nextTick(() => {   //nexttick 是异步  渲染之后回调函数执行
				//表单dom加载之后  执行restFields方法  充值表单和消除验证
				this.$refs['pojoForm'].resetFields()    //必须添加prop
				
			})
		},
		//保存表单数据
		addData(){
			this.$refs['pojoForm'].validate(valid=>{
				if(valid){   //提交表单
					memberApi.add(this.pojo).then(response=>{
						const resp = response.data
						if(resp.flag){
							this.$message({
								message: resp.message,
								type: 'success'
							})
							//添加成功
							this.fetchData()
							//关闭窗口
							this.dialogFormVisible = false
						}else{
							 // 失败提示
							this.$message({
								message: resp.message,
								type: 'warning'
							})
						}
					})
				}else{
					return false
				}
				
			})
			
		},
		//编辑数据
		updateData(){
			console.log('updateData')
			this.$refs['pojoForm'].validate(valid => {
				if(valid){
					//前端验证通过
					memberApi.update(this.pojo).then(response=>{
						const resp = response.data
						if(resp.flag){
							//成功  刷新列表
							this.$message({
								message: resp.message,
								type: 'success'
							})
							this.fetchData()
							this.dialogFormVisible = false
						}else{
							//失败提示
							this.$message({
								message: resp.message,
								type: 'warning'
							})
						}
					})
				}else{
					
					return false
				}
				
			})
		}
				
		
	},
	
	filters:{
		payTypeFilter (type) {
		/* payTypeOptions.find(obj => {
			return obj.type === type
		}) */
		// 在过滤 器当中不能引用当前实例 this   this.payTypeOptions 错误的
		const payObj = payTypeOptions.find(obj => obj.type === type)
		return payObj ? payObj.name : null
	}
	}
	
  }
</script>

<style>
</style>
