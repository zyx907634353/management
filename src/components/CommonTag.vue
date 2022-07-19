<template>
    <div class="tabs">
        <el-tag
            size="small"
            v-for="(item,index) in tags"
            :key="item.path"
            :closable="item.path !== '/'"
            :effect="$route.name === item.name? 'dark' : 'plain'"
            @click = changeMenu(item)
            @close = handleClose(item,index)
            >
            {{item.label}}
        </el-tag>
    </div>
</template>
<script>
import {mapState,mapMutations} from 'vuex'
export default {
    name: 'CommonTag',
    data(){
        return {

        }
    },
    computed:{
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods:{
        ...mapMutations({
            close: 'closeTag'
        }),
        changeMenu(tag){
            this.$router.push({path:tag.path})
        },
        handleClose(tag,index){
            const length = this.tags.length - 1
            this.close(tag)
            if(tag.name !== this.$route.name){
                //删除的tag不是当前聚焦的页面，直接删除就可以了
                return
            }
            if(length === index){
                //删除的是最右侧的tag，焦点往左移动
                this.$router.push({name:this.tags[index-1].name})
            }else{
                //删除的不是最右侧tag,焦点往右跳转
                this.$router.push({name:this.tags[index+1].name})
            }
        }
    }
}
</script>
<style lang="less" scoped>
    .tabs{
        padding: 20px;
        .el-tag{
            margin-right: 15px;
            cursor: pointer;
        }
    }
</style>