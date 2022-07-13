<template>
  <div>
    <el-dialog title="部门修改" :visible.sync="dialogFormVisible">
      <el-form :model="list">
        <el-form-item label="员工编号" :label-width="formLabelWidth">
          <el-input v-model="plist1.sid" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" :label-width="formLabelWidth">
          <el-input
            v-model="plist1.sname"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" :label-width="formLabelWidth">
          <el-input v-model="plist1.department" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="职位" :label-width="formLabelWidth">
          <el-input v-model="plist1.pname" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Updateinfo">确 定</el-button>
      </div>
    </el-dialog>

    <!--多条件查询表单-->
    <el-form
      :inline="true"
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px"
    >
      <el-form-item label="员工号">
        <el-input v-model="Query.sid" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="Query.sname" placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>

        <!-- <el-button type="warning" @click="insertInfo()" v-if="userflag"
          >添加部门</el-button
        > -->
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
      <el-table-column prop="pid" label="编号" width="70" align="center">
        {{ pid }}
      </el-table-column>
      <el-table-column prop="department" label="部门" width="120" />
      <el-table-column prop="sid" label="员工号" width="120" />
      <el-table-column prop="sname" label="员工姓名" width="120" />
      <el-table-column prop="pname" label="职位名称" width="120">
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="UpdateButton(scope.row.pid)"
            >修改</el-button
          >

          <!-- <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeById(scope.row.pid)"
            >删除</el-button
          > -->
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
import positionAPI from "@/api/position.js";

export default {
  //写核心代码位置
  data() {
    //1、定义变量和初始值
    return {
      userflag: true,
      list: null, //查询之后给接口返回的数据装的集合
      page: 1, //当前页
      limit: 10, //每页显示记录数
      Query: {}, //条件封装对象
      total: 0, //总记录数
      plist1: {
        sid: "",
        sname: "",
        pname: "",
        did: "",
      },

      dialogFormVisible: false,

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

    this.getList();
  },
  methods: {
    //调用具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page = 1) {
      this.page = page;
      positionAPI
        .getListPage(this.page, this.limit, this.Query)
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

        positionAPI.removeById(id).then((resp) => {
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
      //alert(id);
      this.dialogFormVisible = true;
      positionAPI.GetInfoById(id).then((resp) => {
        this.plist1 = resp.data.position;
        console.log(this.list1);
        console.log("----------------------------");
      });
    },
    Updateinfo() {
      positionAPI.updateInfo(this.plist1).then((resp) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.dialogFormVisible = false;
        this.getList();
      });
    },
    insertInfo() {
      this.dialogFormVisible1 = true;
    },
  },
};
</script>

