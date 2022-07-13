<template>
  <div>
    <div class="app-container" v-if="userflag">
      <el-form label-width="120px">
        <el-form-item label="用户名">
          <el-input v-model="staff.username" />
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="staff.password" />
        </el-form-item>

        <el-form-item label="员工姓名">
          <el-input v-model="staff.sname" />
        </el-form-item>
        <el-form-item label="员工性别">
          <el-radio v-model="staff.sex" label="0">男</el-radio>
          <el-radio v-model="staff.sex" label="1">女</el-radio>
          <!-- <el-radio v-model="staff.sex" label="2">其他</el-radio> -->
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="staff.email" />
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="staff.phone" />
        </el-form-item>
        <el-form-item label="部门号">
          <el-cascader
            expand-trigger="hover"
            v-model="staff.department"
            :options="dlist"
            :props="tabs"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="staff.address" />
        </el-form-item>

        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://42.192.136.246:8002/fileoss/upload"
            :show-file-list="false"
            :on-success="uploadSuccess"
            :before-upload="beforeUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <!-- 讲师头像：TODO -->
        <el-form-item>
          <el-button
            :disabled="saveBtnDisabled"
            type="primary"
            @click="saveOrUpdate"
            >保存</el-button
          >
        </el-form-item>
      </el-form>
    </div>

    <div v-if="!userflag">抱歉，您没有添加权限！</div>
  </div>
</template>


<script>
//引入对应的新增api方法
import staffAPI from "@/api/staff.js";
import DepartmentAPI from "@/api/department.js";
import userlogAPI from "@/api/userlog.js";
import positionApi from "@/api/position.js";

export default {
  data() {
    return {
      dlist: "",
      tabs: {
        label: "dname",
        value: "did",
      },
      userflag: true,
      staff: {
        sname: "",
        sex: "0",
        email: "",
        phone: "",
        department: "",
        address: "",
        workdate: "",
        username: "",
        password: "",
        avatar: "",
      },
      position: {
        sid: "",
        sname: "",
        department: "",
        pname: "员工",
      },
      saveBtnDisabled: false, // 保存按钮是否禁用,

      userlog: {
        sname: "",
        utype: "",
        utable: "",
        info: "",
      },
      imageUrl: "",
    };
  },

  methods: {
    uploadSuccess(res) {
      console.log(res.data.url);
      this.staff.avatar = res.data.url;
      this.imageUrl = res.data.url;
    },

    getdlist() {
      DepartmentAPI.getAll().then((res) => {
        console.log(res.data.dlist);
        this.dlist = res.data.dlist;
      });
    },
    handleChange(value) {
      console.log(value[0]);
      this.staff.department = value[0];
    },
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
    // 保存
    saveposition(id) {
      this.position.sid = id;
      this.position.sname = this.staff.sname;
      this.position.department = this.staff.department;
      positionApi.save(this.position);
    },
    saveData() {
      staffAPI.saveStaff(this.staff).then((resp) => {
        console.log(resp.data.id);
        this.saveposition(resp.data.id);
        //添加成功
        //提示信息
        this.$message({
          message: "添加员工记录成功",
          type: "success",
        });
        //回到讲师列表 路由跳转
        this.userLog("添加", "staff", "(添加员工操作)");
        this.$router.push({ path: "/staff/table" });
      });
    },
    //根据id查询，数据回显
    getInfoById(id) {
      staffAPI.updateById(id).then((resp) => {
        this.staff = resp.data.staff;
        this.imageUrl = resp.data.staff.avatar;
        console;
      });
    },
    //修改讲师的方法
    update() {
      staffAPI.updateStaffInfo(this.staff).then((resp) => {
        //提示信息
        this.$message({
          message: "修改员工记录成功",
          type: "success",
        });
        //回到讲师列表 路由跳转
        this.userLog("修改", "staff", "(修改员工操作)");
        this.$router.push({ path: "/staff/table" });
      });
    },
    saveOrUpdate() {
      //判断修改还是新增操作
      //根据teacher对象是否有id值来判断
      if (!this.staff.sid) {
        //没有id值，做【新增操作】
        this.saveBtnDisabled = true;
        this.saveData();
      } else {
        //有id值，做【修改操作】
        this.update();
      }
    },
    init() {
      //判断路径中是否有id值
      if (this.$route.params && this.$route.params.id) {
        //从路径中获取id值
        const id = this.$route.params.id;
        //调用根据id查询的方法
        this.getInfoById(id);
      } else {
        this.teacher = {};
      }
    },
  },
  created() {
    //在页面渲染之前
    //在页面渲染之前
    //alert(1)
    this.getdlist();
    this.userToken();
    this.init();
  },
  watch: {
    $route(to, from) {
      //路由变化方式，当路由发送变化，方法就执行
      console.log("watch $route");
      this.init();
    },
  },
};
</script>


<style scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>