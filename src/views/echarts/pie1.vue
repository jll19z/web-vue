<template>
  <div class="home">
    <div>公司人数：{{ num }}</div>
    <!-- 响应式布局+一般布局-->
    <!-- 现需要循环展示出script打开的多张图片地址，使用v-for  gutter代表图表之间的间隔-->
    <el-row :gutter="20">
      <!-- 引入图表，并进行响应式布局 -->
      <!-- 较好的init方式，采用ref方式，而非原生的document.getElementById -->
      <el-col :span="24">
        <div ref="chart" id="chart" style="width: 100%; height: 400px"></div>
      </el-col>
      <!-- 其对应的逻辑写在script的methods方法中，并添加一个init()方法，记得改echarts对应图表的名字以及一些想要修改的代码 -->
    </el-row>
  </div>
</template>

<script>
// 引入echarts,之前也需要下载安装echarts
import * as echarts from "echarts";
import departmentAPI from "@/api/department.js";
export default {
  name: "home",
  data() {
    return {
      num: 0,
      items: [],
      edata: [],
      //示例数据
      da: [
        { value: 1048, name: "搜索引" },
        { value: 735, name: "直接访问" },
        { value: 580, name: "邮件营销" },
        { value: 484, name: "联盟广告" },
        { value: 300, name: "视频广告" },
      ],
    };
  },
  //  添加生命周期——钩子函数 加载init()方法
  // 在生命周期中实例化echarts对象（确保dom元素已经挂载到页面中）可以加一个nextTick
  mounted() {
    this.$nextTick(function () {
      this.init();
    });
  },
  // 基于准备好的dom，初始化echarts实例
  //  因为我的echarts在main.js入口文件里写，所以这里要用this代表Vue对象，并引用$echarts，属性，初始化echarts实例
  methods: {
    init() {
      departmentAPI.getEcharts().then((res) => {
        console.log(res.data.nums);
        var resdata = res.data.nums;
        for (let i = 0; i < resdata.length; i++) {
          // console.log(res);
          var name = resdata[i].dname;
          var value = resdata[i].dnum;
          this.num += parseInt(resdata[i].dnum);
          this.edata.push({ value, name });
        }
        var myChart = echarts.init(document.getElementById("chart"));
        // 以下全局，我引入echarts属性（若是多个页面需要引入echarts的话，一定要在main.js中引入
        // var myChart = this.$echarts.init(this.$refs.chart);
        // 指定图表的配置项和数据
        var option = {
          tooltip: {
            trigger: "item",
          },
          legend: {
            top: "5%",
            left: "center",
          },
          series: [
            {
              name: "部门",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 10,
                borderColor: "#fff",
                borderWidth: 2,
              },
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "40",
                  fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              // data: [
              //   { value: 1048, name: "搜索引" },
              //   { value: 735, name: "直接访问" },
              //   { value: 580, name: "邮件营销" },
              //   { value: 484, name: "联盟广告" },
              //   { value: 300, name: "视频广告" },
              // ],
              data: this.edata,
            },
          ],
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      });
      console.log("-------------");
      console.log(this.edata);
      console.log(this.da);
      // 若是echarts只想在当前页面引用，可以直接引入，然后修改即可！
    },
  },
  // components: {
  //   HelloWorld
  // }
};
</script>

<style>
.el-row {
  margin-bottom: 20px;
}
last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
</style>
