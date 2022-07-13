import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    getAll(){
        return request({
            url:"/web/department/getAll",
            method: 'get'
        })
    },
    //课程分类
    getDepartmentList(){
        return request({
            url:"/web/department/getAllSubject",
            method: 'get'
        })
    },
      //1、讲师列表（多条件分页查询）
    //page：当前页，limit：每页记录数，staffQuery：条件对象
    getDepartmentListPage(page,limit,departmentQuery){
        return request({
            // url: '        /'+page+'/'+limit,
            url: `/web/department/pageCondition/${page}/${limit}`,
            method: 'post',
            //staffQuery条件对象，如果后端使用RequestBody获取数据
            //data表示把对象转换成json对象进行传递到接口里
            data: departmentQuery
          })
    },
     //根据id删除
     removeById(id){
        return request({
            url: `/web/department/deleteById/${id}`,
            method: 'delete',
        })
    },


    //新增
    saveDepartment(department) {
        return request({
            url: `/web/department/save`,
            method: `post`,
            data: department
        })
    },

    //根据id查询
    GetInfoById(id){
    return request({
        url: `/web/department/getDepartment/${id}`,
        method: `get`,
    })
}
,
//修改讲师信息
updateDepartmentInfo(department){
    return request({
        url: `/web/department/updateById`,
        method: `post`,
        data: department
    })
},


getEcharts(){
    return request({
        url: `/web/department/echarts`,
        method: `get`,
    })
}
    
}
