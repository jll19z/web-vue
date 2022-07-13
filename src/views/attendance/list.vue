<template>
  <div>
    <el-dialog title="考勤管理" :visible.sync="dialogFormVisible">
      <el-form :model="list">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="kq2.sname" autocomplete="off" disabled></el-input>
        </el-form-item>

        <el-form-item label="迟到次数" :label-width="formLabelWidth">
          <el-input v-model="kq2.latetime" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="早退" :label-width="formLabelWidth">
          <el-input v-model="kq2.leaveearly" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="缺勤" :label-width="formLabelWidth">
          <el-input v-model="kq2.absence" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="请假天数" :label-width="formLabelWidth">
          <el-input v-model="kq2.avacation" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="Updateinfo">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="考勤添加" :visible.sync="dialogFormVisible1">
      <el-form :model="list">
        <el-form-item label="员工号" :label-width="formLabelWidth">
          <el-input v-model="kq1.sid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" :label-width="formLabelWidth">
          <el-input v-model="kq1.sname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="日期年月" :label-width="formLabelWidth">
          <el-input v-model="kq1.adate" autocomplete="off"></el-input>
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
      <el-form-item label="员工号">
        <el-input v-model="kqQuery.id" placeholder="请输入名称"></el-input>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="kqQuery.name" placeholder="请输入名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" @click="getList()"
          >查询</el-button
        >
        <el-button type="default" @click="resetData()">清空</el-button>

        <el-button type="default" @click="insertInfo()" v-if="userflag"
          >添加考勤信息</el-button
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
      <el-table-column prop="aid" label="序号" width="70" align="center">
      </el-table-column>
      <el-table-column prop="sid" label="员工号" width="120" />
      <el-table-column prop="sname" label="员工姓名" width="120">
      </el-table-column>
      <el-table-column prop="adate" label="月份" width="120" />
      <el-table-column prop="latetime" label="迟到次数" width="100" />
      <el-table-column prop="leaveearly" label="早退次数" width="100" />
      <el-table-column prop="absence" label="缺勤次数" width="150" />
      <el-table-column prop="avacation" label="请假天数" width="150" />
      <el-table-column label="操作" width="200" align="center" v-if="userflag">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            icon="el-icon-edit"
            @click="UpdateButton(scope.row.aid)"
            >考勤管理</el-button
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
import attendanceAPI from "@/api/attendance.js";
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
      kqQuery: {}, //条件封装对象
      total: 0, //总记录数
      kq1: {
        sid: "",
        sname: "",
        adate: "",
        latetime: "0",
        leaveearly: "0",
        absence: "0",
        avacation: "0",
      },
      kq2: "",
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
    //调用\
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
      attendanceAPI
        .getListPage(this.page, this.limit, this.kqQuery)
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
      this.kqQuery = {};
      //查询所有讲师数据
      this.getList();
    },

    UpdateButton(id) {
      this.dialogFormVisible = true;
      attendanceAPI.GetInfoById(id).then((resp) => {
        this.kq2 = resp.data.attendance;
        console.log("-----------------------");
        console.log(resp.data);
      });
    },

    Updateinfo() {
      attendanceAPI.updateInfo(this.kq2).then((resp) => {
        this.$message({
          type: "success",
          message: "修改成功!",
        });
        this.dialogFormVisible = false;
        this.userLog("修改", "attendance", "(更新考勤操作)");
        this.getList();
      });
    },
    insertInfo() {
      this.dialogFormVisible1 = true;
    },
    saveInfo() {
      //alert(this.department2.dname)
      attendanceAPI.save(this.kq1).then((resp) => {
        this.$message({
          type: "success",
          message: "新增成功!",
        });
        this.dialogFormVisible1 = false;
        this.userLog("添加", "attendance", "(添加考勤操作)");
        this.getList();
      });
    },
  },
};
</script>

