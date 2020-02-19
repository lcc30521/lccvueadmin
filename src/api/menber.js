import request from '@/utils/request';

export default{
	
	//分页搜索方法
	// page 当前页码, size每页查询条数, searchMap条件查询的条件值
	search(page, size, searchMap){
		 return request({
		            url: `dev-api/member/list/search/${page}/${size}`,
		            method: 'post',
		            data: searchMap
		        })
	},
	//新增会员
	add(pojo){
		return request({
		            url: 'dev-api/member',
		            method: 'post',
		            data: pojo
		        })
	},
	//获得会员信息  通过id
	getById(id){
		 return request({
		            url: `dev-api/member/${id}`,
		            method: 'get'
		        })
		
	},
	
	//更新数据
	update(pojo){
		 return request({
		            url: `dev-api/member/${pojo.id}`,
		            method: 'put',
		            data: pojo
		        })
		
	},
	
	 //删除会员
	    deleteById(id) {
	        return request({
	            url: `dev-api/member/${id}`,
	            method: 'delete'
	        })
	    }
}