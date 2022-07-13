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
          v-model="staffQuery.id"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
            <el-form-item label="名称">
        <el-input
          v-model="staffQuery.name"
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
      <el-table-column prop="sid" label="员工号" width="70" align="center">
 
      </el-table-column>
      <el-table-column prop="sname" label="名称" width="120"> </el-table-column>
      <el-table-column label="性别" width="80">
        <template slot-scope="scope">
          {{ scope.row.sex === "0" ? "男" : "女" }}
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="电话号" width="120"/>
      <el-table-column prop="email" label="邮箱" width="100" />
      <el-table-column prop="department" label="部门号" width="100" />
      <el-table-column prop="address" label="地址" width="150" />
      <el-table-column prop="workdate" label="入职时间" width="150" />
       <el-table-column label="员工头像" align="center" prop="avater">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" width="100" height="100" />
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center" v-if="userflag">
        <template slot-scope="scope">
          <router-link :to="'/staff/edit/' + scope.row.sid">
            <el-button type="primary" size="mini" icon="el-icon-edit"
              >修改</el-button
            >
          </router-link>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.sid)"
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
import staffAPI from "@/api/staff.js";
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
      staffQuery: {}, //条件封装对象
      total: 0, //总记录数
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
      //console.log("11111111111111111111111111")

    }else{
     this.userflag=false;
    }
    },


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
    //调用具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page=1) {
        this.page=page;
      staffAPI
        .getStaffListPage(this.page, this.limit, this.staffQuery)
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
      this.staffQuery = {};
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
    
        staffAPI.removeById(id)
            .then((resp) => {//删除成功
            //提示信息
            this.$message({
                type: "success",
                message: "删除成功!",
            });
            //刷新页面
            this.getList();
            this.userLog('删除','staff','(根据id删除员工)')
        });
    });
}

  },
};
</script>

<style></style>
