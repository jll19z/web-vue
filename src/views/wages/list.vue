<template>
  <div>

      <el-dialog title="工资发放" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="员工id" :label-width="wages">
      <el-input v-model="wages.sid" autocomplete="off" disabled></el-input>
    </el-form-item>
    <el-form-item label="员工姓名" :label-width="wages">
      <el-input v-model="wages.sname" autocomplete="off" disabled></el-input>
    </el-form-item>
        <el-form-item label="工资" :label-width="wages">
      <el-input v-model="wages.wages" autocomplete="off" disabled></el-input>
    </el-form-item>
   
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateW">确定发放</el-button>
  </div>
</el-dialog>
          <!--多条件查询表单-->
    <el-form
      :inline="true"
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px;"
    >
      <el-form-item label="员工号">
        <el-input
          v-model="wagesQuery.sid"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
            <el-form-item label="名称">
        <el-input
          v-model="wagesQuery.sname"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>



      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      style="width: 100%"
      border
      fit
      highlight-current-row
      element-loading-text="数据加载中"
      v-loading="listLoading"
    >
     <el-table-column prop="wid" label="序号" width="70" align="center">  </el-table-column>
      <el-table-column prop="sid" label="员工号" width="70" align="center">
 
      </el-table-column>
      <el-table-column prop="sname" label="名称" width="120"> </el-table-column>
      <el-table-column prop="wtime" label="月份" width="120"/>
      <el-table-column prop="wages" label="工资" width="100" />
      <el-table-column width="100" label="发放状态">
           <template slot-scope="scope">
       {{scope.row.wflag === '0' ? '未发放':'已发放'}}
        </template>
          
  </el-table-column>
 


      <el-table-column label="操作" width="200" align="center" v-if="userflag">
         <template slot-scope="scope">
                    <el-link type="primary" 
                    v-if="scope.row.wflag === '0'" 
                    @click="fafang(scope.row.wid)"
                    >
                    发放工资
                    </el-link>
                </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
<el-pagination
               background
               layout="prev, pager, next,total,jumper"
               :total="total"
               :page-size="limit"
               style="padding: 30px 0; text-align: center"
               :current-page="page"
               @current-change="getList"
               >
</el-pagination>

  </div>

</template>

<script>
//引入要调用的方法，teacher.js文件
import wagesAPI from "@/api/wages.js";
import userlogAPI from "@/api/userlog.js";

export default {
  //写核心代码位置
  data() {
    //1、定义变量和初始值
    return {
       userflag:true,
      list: null, //查询之后给接口返回的数据装的集合
      page: 1, //当前页
      limit: 10, //每页显示记录数
      wagesQuery: {}, //条件封装对象
      dialogFormVisible:false,
      total: 0, //总记录数
      wages:{
          sid:'',
          sname:'',
          wages:'',
          wtime:'',
          wflag:'', 
          granttime:'',        
      },
      userlog:{
        sname:'',
        utype:'',
        utable:'',
        info:''
      },
    };
  },
  created() {
    //页面渲染之前执行，调用method定义的方法
    //调用
     this.userToken();
    this.getList();
  },
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

     fafang(id){
      wagesAPI.GetInfoById(id)
      .then(resp => {
        console.log(resp.data.wages)
        this.wages=resp.data.wages
      })
      this.dialogFormVisible=true


    },
    updateW(){
        this.wages.wflag=1;
      wagesAPI.updateInfo(this.wages).then(resp=>{
          this.$message({
                    message: "发放成功",
                    type: "success",
                });
          this.userLog('发放工资','wages','(发放工资操作)')
          this.getList();
      })
      this.dialogFormVisible=false
      

    },
    //调用具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page=1) {
        this.page=page;
      wagesAPI
        .getListPage(this.page, this.limit, this.wagesQuery)
        .then((resp) => {
          //resp接口返回的数据
          // console.log(resp);
          this.list = resp.data.rows;
          console.log(this.list);
          this.total = resp.data.total;
          console.log(this.total);
        }) //请求成功
        .catch((err) => {
          console.log(err);
        }); //请求失败
    },
    //清空方法
    resetData() {
      //表单输入项数据清空
      this.wagesQuery = {};
      //查询所有讲师数据
      this.getList();
    },
    removeById(id) {
          //  alert(id)
    this.$confirm("此操作将永久删除该员工记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        
    }).then(() => {
        //点击确定，执行then方法
    
        wagesAPI.removeById(id)
            .then((resp) => {//删除成功
            //提示信息
            this.$message({
                type: "success",
                message: "删除成功!",
            });
            //刷新页面
            this.getList();
            this.userLog('s','staff','(根据id删除员工)')
        });
    });
}

  },
};
</script>

<style></style>
