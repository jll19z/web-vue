import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //1、讲师列表（多条件分页查询）
    //page：当前页，limit：每页记录数，staffQuery：条件对象
    getStaffListPage(page,limit,staffQuery){
        return request({
            // url: '        /'+page+'/'+limit,
            url: `/web/staff/pageCondition/${page}/${limit}`,
            method: 'post',
            //staffQuery条件对象，如果后端使用RequestBody获取数据
            //data表示把对象转换成json对象进行传递到接口里
            data: staffQuery
          })
    },
     //根据id删除
     removeById(id){
        return request({
            url: `/web/staff/deleteStaffById/${id}`,
            method: 'delete',
        })
    },


    //新增
    saveStaff(staff) {
        return request({
            url: `/web/staff/save`,
            method: `post`,
            data: staff
        })
    },

    findAll(){
        return request({
            url: `/web/staff/findall`,
            method: `get`,
        })
    },
    //根据id查询
    updateById(id){
    return request({
        url: `/web/staff/getStaff/${id}`,
        method: `get`,
    })
},
findByName(sname){
    return request({
        url: `/web/staff/getStaffByname/${sname}`,
        method: `get`,
    })
},

//修改讲师信息
updateStaffInfo(staff){
    return request({
        url: `/web/staff/updateById`,
        method: `post`,
        data: staff
    })
}



}
