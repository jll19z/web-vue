<template>
  <div>
          <!--多条件查询表单-->
    <el-form
      :inline="true"
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px;"
    >
      <el-form-item label="员工号">
        <el-input
          v-model="logQuery.sid"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
            <el-form-item label="员工姓名">
        <el-input
          v-model="logQuery.sname"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="请假分类">
       <el-select v-model="logQuery.utype" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      >
    </el-option>
  </el-select>
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

      <el-table-column prop="ulid" label="序号" width="70" align="center">
 
      </el-table-column>
      <el-table-column prop="sid" label="员工号" width="120"> </el-table-column>
      <el-table-column prop="sname" label="员工姓名" width="120"> </el-table-column>
      
        <el-table-column prop="username" label="请假类型" width="120"> </el-table-column>
  <el-table-column prop="utype" label="操作类型" width="120"> </el-table-column>
  <el-table-column prop="utable" label="操作表" width="120"> </el-table-column>
 <el-table-column prop="info" label="备注" width="120"> </el-table-column>
 <el-table-column prop="time" label="操作时间" width="200"> </el-table-column>

   <el-table-column label="操作" width="200" align="center" v-if="userflag">
        <template slot-scope="scope">
          
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.ulid)"
            >删除</el-button
          >
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
import userlogAPI from "@/api/userlog.js";

export default {
  //写核心代码位置
  data() {
    //1、定义变量和初始值
    return {
      uerflag:true,
      list: null, //查询之后给接口返回的数据装的集合
      page: 1, //当前页
      limit: 10, //每页显示记录数
      logQuery: {}, //条件封装对象
      total: 0, //总记录数
       options: [{
          value: '登录',
          label: '登录'
        }, {
          value: '删除',
          label: '删除'
        },{
        value: '添加',
        label: '修改'
        },
        {
        value: '发放工资',
        label: '发放工资'
        },
        {
        value: '下载',
        label: '下载'
        },
         {
        value: '审批',
        label: '审批'
        },
        ],

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
   this.logQuery.sname = sname;
  }},
   
    //调用具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page=1) {
        this.page=page;
      userlogAPI
        .getListPage(this.page, this.limit,this.logQuery)
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
     removeById(ulid){
         this.$confirm("此操作将永久删除该日志记录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
    }).then(() => {
        //点击确定，执行then方法
    
        userlogAPI.removeById(ulid)
            .then((resp) => {//删除成功
            //提示信息
            this.$message({
                type: "success",
                message: "删除成功!",
            });
            //刷新页面
            this.getList();
        });
    });

     },
    //清空方法
    resetData() {
      //表单输入项数据清空
      this.logQuery = {};
      //查询所有讲师数据
      this.userToken();     
      this.getList();
    },
   

  },
};
</script>

<style></style>
