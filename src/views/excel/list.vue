<template>
  <el-table :data="tableData" style="width: 100%">
    <el-table-column label="姓名" width="180">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>表: {{ scope.row.name }}</p>
          <p>表: {{ scope.row.address }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag size="medium">{{ scope.row.name }}</el-tag>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column label="打印">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.row.id)"
          >打印</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import downloadAPI from "@/api/download.js";
import userlogAPI from "@/api/userlog.js";
export default {
  data() {
    return {
      userlog: {
        sname: "",
        utype: "",
        utable: "",
        info: "",
      },
      tableData: [
        {
          id: 1,
          name: "员工报表",
          address: "staff",
        },
        {
          id: 2,
          name: "部门报表",
          address: "department",
        },
        {
          id: 3,
          name: "日志报表",
          address: "userlog",
        },
        {
          id: 4,
          name: "休假",
          address: "vacation",
        },
        {
          id: 5,
          name: "加班",
          address: "workadd",
        },
        {
          id: 6,
          name: "工资",
          address: "wages",
        },
        {
          id: 7,
          name: "考勤报表",
          address: "attendance",
        },
      ],
    };
  },
  methods: {
    userLog(utype, utable, info) {
      var sname = window.sessionStorage.getItem("name");
      //console.log(sname)
      this.userlog.sname = sname;
      this.userlog.utable = utable;
      this.userlog.info =
        sname + "对" + utable + "表" + "进行" + utype + "操作" + info;
      this.userlog.utype = utype;
      // console.log(sname)
      userlogAPI.save(this.userlog).then((resp) => {
        // console.log(resp.data)
      });
    },
    handleEdit(id) {
      // var BASE_API="http://rooikezzz.top:9090"
      var BASE_API = "http://localhost:9090";
      if (id == 1) {
        this.download(BASE_API + "/web/staff/download", "staff");
      }
      if (id == 2) {
        this.download(BASE_API + "/web/department/download", "department");
      }
      if (id == 3) {
        this.download(BASE_API + "/web/userlog/download", "userlog");
      }
      if (id == 4) {
        this.download(BASE_API + "/web/vacation/download", "vacation");
      }
      if (id == 5) {
        this.download(BASE_API + "/web/workadd/download", "workadd");
      }
      if (id == 6) {
        this.download(BASE_API + "/web/wages/download", "wages");
      }
      if (id == 7) {
        this.download(BASE_API + "/web/attendance/download", "attendance");
      }
    },
    download(url, table) {
      this.userLog("下载", table, "(下载打印报表情况操作)");
      window.open(url, "_bank");
    },
  },
};
</script>
