<template>
    <header>
        <div class="l-content">
            <el-button @click="handleMenu" icon="el-icon-menu"></el-button>
            <el-breadcrumb separator="/">
                <el-breadcrumb-item  v-for="item in tags" :key="item.path" :to="{ path: item.path }" class="myColor">{{item.label}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown trigger="click" size="mini">
                <span>
                    <!-- 头像要动态引进 -->
                    <img :src="userImg" class="user">
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item>退出</el-dropdown-item>
                  </el-dropdown-menu>
            </el-dropdown>
        </div>
    </header>
</template>

<script>
import { mapState} from 'vuex'
export default {
    name:"CommonHeader",
    data(){
        return{
            userImg: require('../assets/images/user.png')
        }
    },
    methods:{
        handleMenu(){
            this.$store.commit('collapseMenu')
        }
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        }
        )
    }
}
</script>

<style lang="less" scoped>
    header{
        display:flex;
        height:100%;
        justify-content: space-between;
        align-items: center;
    }
    .l-content{
        display: flex;
        align-items: center;
        .el-button{
            margin-right:20px;
        }
    }
    .r-content{
        .user{
            height: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
        }
    }
    .myColor /deep/ .el-breadcrumb__inner {
        color: white ;
    }
</style>