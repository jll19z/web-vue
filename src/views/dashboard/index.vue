<!--  -->
<template>

 <div class="box1">
    <el-container>
      <el-header class="text-c" >个人中心</el-header>
      <el-container class="center-c">
        <el-aside width="800px">
          <el-col :span="12">
            <div></div>
            <div>
              <div>
                <el-avatar
                  :size="100"
                  :src="staff.avatar"
                  align="center"
                  class="ava"
                ></el-avatar>
              </div>

            </div>
          </el-col>
    <el-descriptions class="margin-top"  :column="3" :size="size" border>
    
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        员工id
      </template>
      {{staff.sid}}
    </el-descriptions-item>
        <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        员工姓名
      </template>
      {{staff.sname}}
    </el-descriptions-item>

            <el-descriptions-item >
      <template slot="label" >
        <i class="el-icon-user"></i>
        员工性别
      </template>
      {{staff.sex === '0' ?'男':'女'}}
    </el-descriptions-item>

    <el-descriptions-item >
      <template slot="label" width="100px">
        <i class="el-icon-user"></i>
        用户名
      </template>
      {{staff.username}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      {{staff.phone}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-location-outline"></i>
        部门编号
      </template>
      {{staff.department}}
    </el-descriptions-item>

    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        工作日期
      </template>
      {{staff.workdate}}
    </el-descriptions-item>

   
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        邮箱
      </template>
      {{staff.email}}
    </el-descriptions-item>

        <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-office-building"></i>
        联系地址
      </template>
     {{staff.address}}
    </el-descriptions-item>
    
  </el-descriptions>
 
        </el-aside>
       
      </el-container>
    </el-container>
  </div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import staffAPI from "@/api/staff.js";
export default {
//import引入的组件需要注入到对象中才能使用
components: {},
 data() {
      return {
       
        staff:{
          sid:'',
          sname:'',
          username:'',
          email:'',
          phone:'',
          department:'',
          address:'',
          workdate:'',
          avatar:''
        },
  
        
        
      }
    },
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  getUserInfo(){
    let sname =window.sessionStorage.getItem("name")
   // console.log(sname)
    staffAPI.findByName(sname).then(resp=>{
      this.staff = resp.data.staff
    //  console.log(resp.data.staff.avatar)
    })

  }

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
this.getUserInfo()
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},

}
</script>
<style scoped>
.box1{
  margin: auto auto;
  background-color: bisque;
}
.center-c{
  margin: auto auto;
  height: 500px;
}
.ava{
margin-left: 300px;

}
.text-c{
text-align: center;
font-size: 50px;
font-family:Microsoft Yahei,"微软雅黑";
color:rgb(189, 189, 189)
}
</style>