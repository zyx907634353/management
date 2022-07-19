<template>
    <div>
        <el-menu default-active="user" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapseJudge" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <h3>{{isCollapseJudge ? "后台" : "通用后台管理系统"}}</h3>

            <el-menu-item v-for="item in noChildren" :index="item.path" :key="item.path" @click="clickMenu(item)">
                <i :class="'el-icon-' + item.icon"></i>
                <span slot="title">{{item.label}}</span>
            </el-menu-item>

            <el-submenu v-for="(item,index) in hasChildren" :index="item.children[index].path" :key="item.children[index].path" >
                <template slot="title">
                    <i :class="'el-icon-' + item.icon"></i>
                    <span slot="title">{{item.label}}</span>
                </template>
                <el-menu-item-group v-for="(subItem,subIndex) in item.children" :key="subItem.path">
                    <!-- 这里el-menu-item的 index属性值必须是string类型(elementUI规定的)，所以我们使用一个tostring函数转化一下 -->
                    <el-menu-item :index="subIndex.toString()" @click="clickMenu(subItem)">{{subItem.label}}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>

        </el-menu>
    </div>
</template>

<style lang="less" scoped>
    /*scoped 指定样式只适用于当前组件 */
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu{
    height: 100vh;
    border: none;
    h3{
        color:#fff;
        text-align: center;
        line-height:48px;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        menu:[
        {
          path: '/',
          name: 'home',
          label: '首页',
          icon: 's-home',
          url: 'Home/Home'
        },
        {
          path: '/mall',
          name: 'mall',
          label: '商品管理',
          icon: 'video-play',
          url: 'MallManage/MallManage'
        },
        {
          path: '/user',
          name: 'user',
          label: '用户管理',
          icon: 'user',
          url: 'UserManage/UserManage'
        },
        {
          label: '其他',
          icon: 'location',
          children: [
            {
              path: '/page1',
              name: 'page1',
              label: '页面1',
              icon: 'setting',
              url: 'Other/PageOne'
            },
            {
              path: '/page2',
              name: 'page2',
              label: '页面2',
              icon: 'setting',
              url: 'Other/PageTwo'
            }
          ]
        }
      ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item){
        this.$router.push({
            //一级标签跳转
            name:item.name
        })
        this.$store.commit('selectMenu',item)
      }
    },
    computed:{
        noChildren(){
            //返回没有子项目的Menu数组
            return this.menu.filter(item => !item.children)
        },
        hasChildren(){
            //返回有子项项目的Menu数组
            return this.menu.filter(item => item.children)
        },
        isCollapseJudge(){
            // console.log(this)
            return this.$store.state.tab.isCollapse;
        }
    }
  }
</script>