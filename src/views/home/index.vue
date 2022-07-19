<template>
    <div>
        <el-row class="home" :gutter="20">
            <el-col :span="8" style="margin-top :20px">
                <el-card class="box-card">
                    <div class="user">
                        <img :src="imgUrl" > 
                        <div class="userinfo">
                            <p class="name">Admin</p>
                            <p class="access">管理员</p>
                        </div>                      
                    </div>
                    <div class="login-info">
                        <p>登录时间:<span>2022-3-19</span></p>
                        <p>登录时间:<span>南京</span></p>
                    </div>
                </el-card>
                <el-card style="margin-top: 20px; height: 460px;">
                    <el-table :data="tableData">
                        <el-table-column
                            v-for="(val,key) in tableLable" :key="key"
                            :prop="key"
                            :label="val">
                        </el-table-column>
                    </el-table>
                </el-card>
            </el-col>
            <el-col :span="16" style="margin-top :20px">
                <div class="num">
                    <el-card v-for="item in countData" :key="item.name" :body-style="{display:'flex', padding:0}">
                        <i class="icon" :class="`el-icon-`+ item.icon" :style="{background: item.color}"></i>
                        <div class="detail">
                            <p class="num">{{item.value}}</p>
                            <p class="txt">{{item.name}}</p>
                        </div>
                    </el-card>
                </div>
                <el-card style="height:280px">
                    <div style="height:280px" ref="echarts"></div>
                </el-card>
                <div class="graph">
                    <el-card style="height:260px" >
                        <div style="height:240px" ref="bar">
                            
                        </div>

                    </el-card>
                    <el-card style="height:260px">
                        <div style="height:240px" ref="videoEcharts">
                            
                        </div>
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import {getData} from '../../../api/data'
import * as echarts from 'echarts'
export default {
    data(){
        return{
            imgUrl:require('../../assets/images/user.png'),
            tableData: [],
        tableLable:{
            name:'课程',
            todayBuy:"今日购买",
            monthBuy:"本月购买",
            totalBuy:"总购买",
        },
        countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
        }
    },
    mounted(){
        getData().then(req => {
            const {code,data} = req.data
            if(code === 20000){
                this.tableData = data.tableData

                //获取折线图数据
                const order = data.orderData
                //获取x轴数据
                const xData = order.date
                //获取键数组：Object.keys 返回一个所有元素为字符串的数组，其元素来自于从给定的 object 上面可直接枚举的属性。
                const keyArray = Object.keys(order.data[0])
                //数据，是一个包含多个对象的数组，一个对象表示一条线/几个柱子
                const series = [];
                keyArray.forEach(key => {
                    series.push({
                        name: key,
                        //map() 方法创建一个新数组，这个新数组由原数组中的每个元素都调用一次提供的函数后的返回值组成。
                        data: order.data.map(item => item[key]),
                        type: 'line'
                    })
                })
                //组装图标
                const option = {
                    xAxis: {
                        data:xData
                    },
                    yAxis:{},
                    legend: {
                        data: keyArray
                    },
                    series
                }
                //操作一个元素时，在元素上添加ref属性，之后使用$refs来获取该元素，之后进行操作
                const E = echarts.init(this.$refs.echarts)
                E.setOption(option)
                
                //获取user柱状图数据
                const userOption = {
                    legend: {
                        // 图例文字颜色
                        textStyle: {
                        color: "#333",
                        },
                    },
                    grid: {
                        left: "20%",
                    },
                    // 提示框
                    tooltip: {
                        trigger: "axis",
                    },
                    xAxis: {
                        type: "category", // 类目轴
                        data: data.userData.map(item => item.date),
                        axisLine: {
                        lineStyle: {
                            color: "#17b3a3",
                        },
                        },
                        axisLabel: {
                        interval: 0,
                        color: "#333",
                        },
                    },
                    yAxis: [
                        {
                        type: "value",
                        axisLine: {
                            lineStyle: {
                            color: "#17b3a3",
                            },
                        },
                        },
                    ],
                    color: ["#2ec7c9", "#b6a2de"],
                    series: [
                        {
                            name:'新增用户',
                            data: data.userData.map(item => item.new),
                            type:'bar'
                        },
                        {
                            name:'活跃用户',
                            data: data.userData.map(item => item.active),
                            type:'bar'
                        }
                    ],                   
                }
                echarts.init(this.$refs.bar).setOption(userOption)

                //饼图
                const videoOption = {
                        tooltip: {
                            trigger: "item",
                        },
                        color: [
                            "#0f78f4",
                            "#dd536b",
                            "#9462e5",
                            "#a6a6a6",
                            "#e1bb22",
                            "#39c362",
                            "#3ed1cf",
                        ],
                        series: [
                            {
                                data: data.videoData,
                                type: 'pie'
                            }
                        ],

                    }
                echarts.init(this.$refs.videoEcharts).setOption(videoOption)
            }
            // console.log(req)
        })
      }
}
</script>