import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //1、讲师列表（多条件分页查询）
    //page：当前页，limit：每页记录数，staffQuery：条件对象
    getListPage(page,limit,workaddQuery){
        return request({
            // url: '        /'+page+'/'+limit,
            url: `/web/workadd/pageCondition/${page}/${limit}`,
            method: 'post',
            //staffQuery条件对象，如果后端使用RequestBody获取数据
            //data表示把对象转换成json对象进行传递到接口里
            data: workaddQuery
          })
    },
     //根据id删除
    //  removeById(id){
    //     return request({
    //         url: `/web/attendance/deleteStaffById/${id}`,
    //         method: 'delete',
    //     })
    // },


    //新增
    save(workadd) {
        return request({
            url: `/web/workadd/save`,
            method: `post`,
            data: workadd
        })
    },

//   
//修改讲师信息
updateInfo(workadd){
    return request({
        url: `/web/workadd/updateById`,
        method: `post`,
        data: workadd
    })
},
 //根据id查询
 GetInfoById(id){
    return request({
        url: `/web/workadd/getById/${id}`,
        method: `get`,
    })
}



}
