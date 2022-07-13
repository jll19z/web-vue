<template>
<div>
<div class=''>
<el-form ref="form" :model="form" label-width="80px" style="margin-top:50px">
  <el-form-item label="员工号">
    <el-input v-model="wages.sid"></el-input>
  </el-form-item>
  <el-form-item label="员工姓名">
    <el-input v-model="wages.sname"></el-input>
  </el-form-item>
<el-form-item label="月份">
    <el-input v-model="wages.wtime"></el-input>
  </el-form-item>
<el-form-item label="工资">
    <el-input v-model="wages.wages"></el-input>
  </el-form-item>

    <el-form-item >
         <el-button type="primary" @click="saveData()">添加</el-button>
      </el-form-item>
</el-form>
</div>
<div v-if="!userflag">
    抱歉，您没有添加权限！
</div>
</div>

</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import wagesAPI from "@/api/wages.js";
import userlogAPI from "@/api/userlog.js";
export default {
    
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
      return {
           userflag:true,
        wages: {
          sid: '',
          sname:'',
          wages: '',
          wtime: '',
        },
         userlog:{
        sname:'',
        utype:'',
        utable:'',
        info:''
      },
      }
    },
//监听属性 类似于data概念
computed: {},
//监控data中的数据变化
watch: {},
//方法集合
methods: {
  userToken(){
  var sname = window.sessionStorage.getItem("name")
  if(sname == "ljl" || sname == "提莫"){
  }else{
   this.userflag=false;
  }},

  userLog(utype,utable,info){
            var sname =window.sessionStorage.getItem("name")
            this.userlog.sname=window.sessionStorage.getItem("name");
            this.userlog.utable=utable;
            this.userlog.info=sname+'对'+utable+'表'+'进行'+utype+'操作'+info;
            this.userlog.utype=utype;
           // console.log(sname)
            userlogAPI.save(this.userlog).then(resp=>{
             // console.log(resp.data)
             
            })
    },
      // 保存
        saveData() {
            wagesAPI.save(this.wages).then((resp) => {//添加成功
                //提示信息
                this.$message({
                    message: "添加记录成功",
                    type: "success",
                });
                //回到讲师列表 路由跳转
                  this.userLog('添加','wages','(添加工资情况操作)')
                this.$router.push({path: '/wages/table'})
            });
        },

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {
  this.userToken();
},
//生命周期 - 挂载完成（可以访问DOM元素）
mounted() {

},
beforeCreate() {}, //生命周期 - 创建之前
beforeMount() {}, //生命周期 - 挂载之前
beforeUpdate() {}, //生命周期 - 更新之前
updated() {}, //生命周期 - 更新之后
beforeDestroy() {}, //生命周期 - 销毁之前
destroyed() {}, //生命周期 - 销毁完成
activated() {}, //如果页面有keep-alive缓存功能，这个函数会触发
}
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>