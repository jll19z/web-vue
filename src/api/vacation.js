import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{
    //1、讲师列表（多条件分页查询）
    //page：当前页，limit：每页记录数，staffQuery：条件对象
    getListPage(page,limit,vacationQuery){
        return request({
            // url: '        /'+page+'/'+limit,
            url: `/web/vacation/pageCondition/${page}/${limit}`,
            method: 'post',
            //staffQuery条件对象，如果后端使用RequestBody获取数据
            //data表示把对象转换成json对象进行传递到接口里
            data: vacationQuery
          })
    },
    


    //新增
    save(vacation) {
        return request({
            url: `/web/vacation/save`,
            method: `post`,
            data: vacation
        })
    },

    //根据id查询
    findById(id){
        return request({
            url: `/web/vacation/getVacation/${id}`,
            method: `get`,
        })
    },


//修改信息
updateInfo(vacation){
    return request({
        url: `/web/vacation/updateById`,
        method: `post`,
        data: vacation
    })
}



}
