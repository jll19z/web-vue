<template>
  <div>
    <!--多条件查询表单-->
    <el-form
      :inline="true"
      class="demo-form-inline"
      style="margin-left: 20px; margin-top: 12px"
    >
      <el-form-item label="员工号">
        <el-input
          v-model="vacationQuery.sid"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input
          v-model="vacationQuery.sname"
          placeholder="请输入名称"
        ></el-input>
      </el-form-item>

      <el-form-item label="请假分类">
        <el-select v-model="vacationQuery.vtype" placeholder="请选择">
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
      <el-table-column prop="vid" label="序号" width="70" align="center">
      </el-table-column>
      <el-table-column prop="sid" label="员工号" width="120"> </el-table-column>
      <el-table-column prop="sname" label="员工姓名" width="120">
      </el-table-column>

      <el-table-column prop="vtype" label="请假类型" width="120">
      </el-table-column>

      <el-table-column prop="vinfo" label="请假原因" width="100" />
      <el-table-column prop="vflag" label="审批状态" width="100" />
      <el-table-column label="审批" width="150">
        <template slot-scope="scope">
          <el-link
            type="primary"
            v-if="scope.row.vflag === '未审批'"
            @click="shenpi(scope.row.vid)"
          >
            审批
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

    <el-dialog title="审批" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="员工id" :label-width="vacation">
          <el-input
            v-model="vacation.sid"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="员工姓名" :label-width="vacation">
          <el-input
            v-model="vacation.sname"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="请假类型" :label-width="vacation">
          <el-input
            v-model="vacation.vtype"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="请假原因" :label-width="vacation">
          <el-input
            v-model="vacation.vinfo"
            autocomplete="off"
            disabled
          ></el-input>
        </el-form-item>

        <el-form-item label="审批" :label-width="vacation">
          <el-radio v-model="vacation.vflag" label="未审批">未审批</el-radio>
          <el-radio v-model="vacation.vflag" label="已审批">已审批</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSP">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入要调用的方法，teacher.js文件
import vacationAPI from "@/api/vacation.js";
import userlogAPI from "@/api/userlog.js";

export default {
  //写核心代码位置
  data() {
    //1、定义变量和初始值
    return {
      list: null, //查询之后给接口返回的数据装的集合
      vacation: "",
      page: 1, //当前页
      limit: 10, //每页显示记录数
      vacationQuery: {}, //条件封装对象
      total: 0, //总记录数
      dialogFormVisible: false,
      options: [
        {
          value: "病假",
          label: "病假",
        },
        {
          value: "事假",
          label: "事假",
        },
        {
          value: "其他",
          label: "其他",
        },
      ],

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
    shenpi(id) {
      vacationAPI.findById(id).then((resp) => {
        console.log(resp.data.vacation);
        this.vacation = resp.data.vacation;
      });

      this.dialogFormVisible = true;
    },
    updateSP() {
      //console.log(this.vacation)
      vacationAPI.updateInfo(this.vacation).then((resp) => {
        this.$message({
          message: "审批成功",
          type: "success",
        });
        this.userLog("审批", "vacation", "(审批休假操作)");
        this.getList();
      });
      this.dialogFormVisible = false;
    },
    //调用具体的方法，调用teacher.js定义的方法
    //讲师列表的方法
    getList(page = 1) {
      console.log("-------------------");
      //console.log(this.vacationQuery)
      this.page = page;
      vacationAPI
        .getListPage(this.page, this.limit, this.vacationQuery)
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
      this.vacationQuery = {};
      //查询所有讲师数据
      this.getList();
    },
  },
};
</script>

<style></style>
