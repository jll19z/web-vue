<template>
  <div>
    <el-dialog title="部门修改" :visible.sync="dialogFormVisible">
      <el-form :model="list">
        <el-form-item label="部门id" :label-width="formLabelWidth">
          <el-input
            v-model="department1.did"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="department1.dname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门信息" :label-width="formLabelWidth">
          <el-input v-model="department1.dinfo" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-input
            v-model="department1.parentid"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Updateinfo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="部门添加" :visible.sync="dialogFormVisible1">
      <el-form :model="list">
        <el-form-item label="部门名称" :label-width="formLabelWidth">
          <el-input v-model="department2.dname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="部门信息" :label-width="formLabelWidth">
          <el-input v-model="department2.info" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级部门" :label-width="formLabelWidth">
          <el-input
            v-model="department2.parentid"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="saveInfo()">确 定</el-button>
      </div>
    </el-dialog>

    <!--多条件查询表单-->
    <el-form
      :inline="true"
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px"
    >
      <el-form-item label="部门号">
        <el-input
          v-model="departmentQuery.id"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input
          v-model="departmentQuery.name"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>

        <el-button type="warning" @click="insertInfo()" v-if="userflag"
          >添加部门</el-button
        >
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
      <el-table-column prop="did" label="部门号" width="70" align="center">
        {{ did }}
      </el-table-column>
      <el-table-column prop="dname" label="名称" width="120"> </el-table-column>
      <el-table-column prop="dinfo" label="部门介绍" width="120" />

      <el-table-column label="操作" width="200" align="center" v-if="userflag">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="UpdateButton(scope.row.did)"
            >修改</el-button
          >

          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.did)"
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
import departmentAPI from "@/api/department.js";
import userlogAPI from "@/api/userlog.js";

export default {
  //写核心代码位置
  data() {
    //1、定义变量和初始值
    return {
      userflag: true,
      list: null, //查询之后给接口返回的数据装的集合
      page: 1, //当前页
      limit: 10, //每页显示记录数
      departmentQuery: {}, //条件封装对象
      total: 0, //总记录数
      department1: "",
      department2: {
        dname: "",
        info: "",
        parentid: 0,
      },
      dialogFormVisible: false,
      dialogFormVisible1: false,
      userlog: {
        sname: "",
        utype: "",
        utable: "",
        info: "",
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
    userToken() {
      var sname = window.sessionStorage.getItem("name");
      if (sname == "ljl" || sname == "提莫") {
      } else {
        this.userflag = false;
      }
    },

    userLog(utype, utable, info) {
      var sname = window.sessionStorage.getItem("name");
      this.userlog.sname = window.sessionStorage.getItem("name");
      this.userlog.utable = utable;
      this.userlog.info =
        sname + "对" + utable + "表" + "进行" + utype + "操作" + info;
      this.userlog.utype = utype;
      // console.log(sname)
      userlogAPI.save(this.userlog).then((resp) => {
        // console.log(resp.data)
      });
    },
    //调用具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page = 1) {
      this.page = page;
      departmentAPI
        .getDepartmentListPage(this.page, this.limit, this.departmentQuery)
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
      this.departmentQuery = {};
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

        departmentAPI.removeById(id).then((resp) => {
          //删除成功
          //提示信息
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          //刷新页面
          this.userLog("删除", "department", "(删除部门操作)");
          this.getList();
        });
      });
    },
    UpdateButton(id) {
      this.dialogFormVisible = true;
      departmentAPI.GetInfoById(id).then((resp) => {
        this.department1 = resp.data.department;
        console.log(department1);
      });
    },
    Updateinfo() {
      departmentAPI.updateDepartmentInfo(this.department1).then((resp) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.dialogFormVisible = false;
        this.userLog("修改", "department", "(修改部门操作)");
        this.getList();
      });
    },
    insertInfo() {
      this.dialogFormVisible1 = true;
    },
    saveInfo() {
      //alert(this.department2.dname)
      departmentAPI.saveDepartment(this.department2).then((resp) => {
        this.$message({
          type: "success",
          message: "新增成功!",
        });
        this.dialogFormVisible1 = false;
        this.userLog("添加", "department", "(添加部门操作)");
        this.getList();
      });
    },
  },
};
</script>

