<template>
  <div class="app-container">
    <el-input
      v-model="filterText"
      placeholder="Filter keyword"
      style="margin-bottom: 30px"
    />

    <el-tree
      ref="tree2"
      :data="data"
      :props="defaultProps"
      :filter-node-method="filterNode"
      class="filter-tree"
      default-expand-all
      style="font-size:200px"
    />
  </div>
</template>

<script>
import departmentAPI from '@/api/department.js'
export default {
  data() {
    return {
      filterText: "",
      data: [], //返回所有分类的数据
      defaultProps: {
        children: "children",
        label: "dname",
      },
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
  },

  methods: {
    getDepartmentList(){
      departmentAPI.getDepartmentList()
        .then(resp=>{
          this.data = resp.data.list
        })
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.title.indexOf(value) !== -1;
    },
  },
  created() {
    this.getDepartmentList()
  },
};
</script>

<style scoped>
/* .el-tree{
    /deep/ >.el-tree-node__label{
    font-size: 50px;
    }
} */

</style>