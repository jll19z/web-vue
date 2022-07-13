<!--  -->
<template>
<div class=''>
<el-form ref="form" :model="form" label-width="80px" style="margin-top:50px">
  <el-form-item label="员工号">
    <el-input v-model="vacation.sid"></el-input>
  </el-form-item>
  <el-form-item label="员工姓名">
    <el-input v-model="vacation.sname"></el-input>
  </el-form-item>
  <el-form-item label="请假类型">
    <el-select v-model="vacation.vtype" placeholder="请选择请假类型">
      <el-option label="病假" value="病假"></el-option>
      <el-option label="事假" value="事假"></el-option>
      <el-option label="其他" value="其他"></el-option>
    </el-select>
  </el-form-item>

  <el-form-item label="请假原因">
    <el-input v-model="vacation.vinfo"></el-input>
  </el-form-item>
  <el-form-item label="起始时间">
    <el-date-picker
      v-model="vacation.starttime"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>
  </el-form-item>


   <el-form-item label="结束时间">
     <el-date-picker
      v-model="vacation.endtime"
      type="datetime"
      placeholder="选择日期时间">
        </el-date-picker>

  </el-form-item>


  <el-form-item label="审批">
  <el-radio v-model="vacation.vflag" label="未审批">未审批</el-radio>
  <el-radio v-model="vacation.vflag" label="已审批">已审批</el-radio>

  </el-form-item>

 <el-form-item>
    
         <el-button type="primary" @click="saveData()">添加申请</el-button>
      </el-form-item>
</el-form>
</div>
</template>

<script>
//这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
//例如：import 《组件名称》 from '《组件路径》';
import vacationAPI from "@/api/vacation.js";
import userlogAPI from "@/api/userlog.js";
export default {
    
//import引入的组件需要注入到对象中才能使用
components: {},
data() {
      return {
        vacation: {
          sid: '',
          sname:'',
          starttime: '',
          endtime: '',
          vflag: '未审批',
          vtype:'',
          vinfo:'',
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
            vacationAPI.save(this.vacation).then((resp) => {//添加成功
                //提示信息
                this.$message({
                    message: "添加记录成功",
                    type: "success",
                });
                //回到讲师列表 路由跳转
                  this.userLog('添加','vacation','(添加休假操作)')
                this.$router.push({path: '/vacation'})
            });
        },

},
//生命周期 - 创建完成（可以访问当前this实例）
created() {

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