export default {
    state:{
        isCollapse: false,
        tabsList: [
            {
                path: '/',
                name: 'home',
                label: "首页",
                icon: 'home'
            }
        ],
        //记录需要高亮显示的路由
        currentMenu: null
    },
    mutations:{
        collapseMenu(state){
            state.isCollapse = !state.isCollapse
        },
        selectMenu(state, val){
            if(val.name !== 'home'){
                state.currentMenu = val
                const i = state.tabsList.findIndex(item => item.name === val.name);
                if(i === -1){
                    state.tabsList.push(val)
                }
            }else{
                currentMenu = null;
            }
        },
        closeTag(state,val){
            const result = state.tabsList.findIndex(item => item.name === val.name)
            if(result !== -1){
                state.tabsList.splice(result,1)
            }
        }
    }
}