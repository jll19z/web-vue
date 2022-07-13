import request from '@/utils/request' //引入已经封装好的axios 和 拦截器

export default{

 //根据id查询
 staffDownload(){
    return request({
        url: `/web/staff/download`,
        method: `get`,
        responseType: "blob"
    })
},
attendanceDownload(){
    return request({
        url: `/web/attendance/download`,
        method: `get`,
    })
},

departmentDownload(){
    return request({
        url: `/web/department/download`,
        method: `get`,
    })
},

userlogDownload(){
    return request({
        url: `/web/userlog/download`,
        method: `get`,
    })
},

vacationDownload(){
    return request({
        url: `/web/vacation/download`,
        method: `get`,
    })
},

workaddDownload(){
    return request({
        url: `/web/workadd/download`,
        method: `get`,
    })
},

wagesDownload(){
    return request({
        url: `/web/wages/download`,
        method: `get`,
    })
},





}
