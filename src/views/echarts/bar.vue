<template>
  <div>
    <div>
      请选择员工:
      <el-cascader
        expand-trigger="hover"
        v-model="staff.sid"
        :options="staff"
        :props="tabs"
        @change="handleChange"
      ></el-cascader>
    </div>
    <div class="echart" id="mychart" :style="myChartStyle"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import AttendanceAPI from "@/api/attendance.js";
import StaffAPI from "@/api/staff.js";
export default {
  data() {
    return {
      tabs: {
        label: "sname",
        value: "sid",
      },
      staff: {},
      xData: [], //横坐标
      latetime: [], //人数数据
      leaveearly: [10, 11, 9, 17, 14, 13, 14],
      absence: [10, 11, 9, 17, 14, 13, 14],
      avacation: [10, 11, 9, 17, 14, 13, 14],
      myChartStyle: { float: "left", width: "100%", height: "400px" }, //图表样式
    };
  },
  created() {
    this.getAllStaff();
    // this.initEcharts();
  },

  mounted() {
    this.getList();
  },
  methods: {
    handleChange(value) {
      console.log(value[0]);

      this.getList(value[0]);
      this.data;
    },
    getAllStaff() {
      StaffAPI.findAll().then((res) => {
        // console.log(res.data);
        this.staff = res.data.items;
      });
    },
    test() {
      this.getList(11);
    },
    getList(id) {
      AttendanceAPI.getBySid(id).then((res) => {
        // this.xData = null;
        console.log(res.data.list);
        for (let i = 0; i < res.data.list.length; i++) {
          this.xData[i] = res.data.list[i].adate;
          this.latetime[i] = res.data.list[i].latetime;
          this.leaveearly[i] = res.data.list[i].leaveearly;
          this.absence[i] = res.data.list[i].absence;
          this.avacation[i] = res.data.list[i].avacation;
        }

        const mulColumnZZTData = {
          xAxis: {
            data: this.xData,
          },
          // 图例
          legend: {
            data: ["迟到次数", "早退次数", "缺勤次数", "请假天数"],
            top: "10%",
          },
          yAxis: {},
          series: [
            {
              type: "bar", //形状为柱状图
              data: this.latetime,
              name: "迟到次数", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true,
                position: "top",
              },
            },
            {
              type: "bar", //形状为柱状图
              data: this.leaveearly,
              name: "早退次数", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true,
                position: "top",
              },
            },
            {
              type: "bar", //形状为柱状图
              data: this.absence,
              name: "缺勤次数", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true,
                position: "top",
              },
            },
            {
              type: "bar", //形状为柱状图
              data: this.avacation,
              name: "请假天数", // legend属性
              label: {
                // 柱状图上方文本标签，默认展示数值信息
                show: true,
                position: "top",
              },
            },
          ],
        };

        const myChart = echarts.init(document.getElementById("mychart"));
        myChart.setOption(mulColumnZZTData);
        //随着屏幕大小调节图表
        window.addEventListener("resize", () => {
          myChart.resize();
        });
      });
    },
  },
};
</script>

