import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },


  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/echarts',
    name: 'echarts',
    meta: { title: '数据可视化', icon: 'example' },
    children: [
      {
        path: 'pie',
        name: 'pie',
        component: () => import('@/views/echarts/pie1'),
        meta: { title: '部门人数', icon: 'table' }
      },
      {
        path: 'bar',
        name: 'bar',
        component: () => import('@/views/echarts/bar'),
        meta: { title: '考勤信息', icon: 'table' }
      },
      // {
      //   path: 'zx',
      //   name: 'echarts',
      //   component: () => import('@/views/echarts/zx'),
      //   meta: { title: 'echarts', icon: 'table' }
      // },
    ]
  },




  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/staff',
    component: Layout,
    redirect: '/staff',
    name: '员工管理',
    meta: { title: '员工管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '员工列表',
        component: () => import('@/views/staff/list'),
        meta: { title: '员工列表', icon: 'table' }
      },
      {
        path: 'save',
        name: '添加员工',
        component: () => import('@/views/staff/save'),
        meta: { title: '添加员工', icon: 'tree' }
      },
      {
        path: 'edit/:id',
        name: 'StaffEdit',
        component: () => import('@/views/staff/save.vue'),
        meta: { title: '编辑员工', noCache: true },
      hidden: true
    }
    
    ]
  },
    //课程分类
    {
      path: 'department',
      component: Layout,
      redirect: '/department/list',
      name: 'department',
      meta: { title: '部门分类管理', icon: 'nested' },
      children: [
        {
          path: '/list',
          name: '部门分类列表',
          component: () => import('@/views/department/list.vue'),
          meta: { title: '部门分类列表', icon: 'table' }
        },
        {
          path: '/info',
          name: '部门信息',
          component: () => import('@/views/department/info.vue'),
          meta: { title: '部门信息', icon: 'nested' }
        },
        {
          path: '/position',
          name: '职位管理',
          component: () => import('@/views/department/position.vue'),
          meta: { title: '职位管理', icon: 'nested' }
        }
      ]
    },
     //课程分类
     {
      path: 'vacation',
      component: Layout,
      redirect: '/vacation/list',
      name: 'vacation',
      meta: { title: '休假管理', icon: 'nested' },
      children: [
        {
          path: '/vacation',
          name: '休假列表',
          component: () => import('@/views/vacation/list.vue'),
          meta: { title: '休假列表', icon: 'table' }
        },
        {
          path: '/save',
          name: '休假列表',
          component: () => import('@/views/vacation/save.vue'),
          meta: { title: '休假批准', icon: 'table' }
        },
       
      ]
    },
    {
      path: '/userlog',
      component: Layout,
      redirect: '/userlog',
      name: 'userlog',
      meta: { title: '休假管理', icon: 'nested' },
      children: [
        {
          path: 'list',
          name: '用户日志',
          component: () => import('@/views/userLog/list.vue'),
          meta: { title: '用户日志', icon: 'table' }
        },     
      ]
    },
  
    {
      path: '/attendance',
      component: Layout,
      redirect: '/attendance/list',
      name: 'attendance',
      meta: { title: '考勤管理', icon: 'nested' },
      children: [
        {
          path: 'list',
          name: '考勤列表',
          component: () => import('@/views/attendance/list.vue'),
          meta: { title: '考勤', icon: 'table' }
        },
      
      ]
    },
    {
      path: '/workadd',
      component: Layout,
      redirect: '/workadd/table',
      name: '加班管理',
      meta: { title: '加班管理', icon: 'example' },
      children: [
        {
          path: 'table',
          name: 'Table',
          component: () => import('@/views/workadd/list'),
          meta: { title: '加班信息', icon: 'table' }
        },
        {
          path: 'save',
          name: 'save',
          component: () => import('@/views/workadd/save'),
          meta: { title: '添加记录', icon: 'tree' }
        }
      ]
    },

  {
    path: '/wages',
    component: Layout,
    redirect: '/wages/table',
    name: '工资管理',
    meta: { title: '工资管理', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '工资管理',
        component: () => import('@/views/wages/list'),
        meta: { title: '工资管理', icon: 'table' }
      },
      {
        path: 'save',
        name: 'save',
        component: () => import('@/views/wages/save'),
        meta: { title: '添加记录', icon: 'tree' }
      }
     
    ]
  },
  
  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/table',
    name: '报表打印',
    meta: { title: '报表打印', icon: 'example' },
    children: [
      {
        path: 'table',
        name: '报表打印',
        component: () => import('@/views/excel/list'),
        meta: { title: '报表打印', icon: 'table' }
      },
    
    ]
  },
  

 

  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
   //mode: 'hash', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
