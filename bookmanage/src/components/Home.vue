<template>
  <div>
    <el-container class="container">
      <el-aside width="233px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-openeds="['2','3']">
          <el-menu-item index="/">
            <i class="el-icon-s-home"></i>
            <span slot="title">系统首页</span>
          </el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>图书管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">维护图书信息</template>
              <el-menu-item index="/addItem">新增图书</el-menu-item>
              <el-menu-item index="/showItem">图书列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-user-solid"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">维护会员资料</template>
              <el-menu-item @click="tips">添加会员</el-menu-item>
              <el-menu-item @click="tips">会员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-order"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item-group>
              <template slot="title">维护订单状态</template>
              <el-menu-item index="/addOrder" disabled>导入订单</el-menu-item>
              <el-menu-item index="/showOrder" disabled>订单详情</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item @click="logout" style="color: #F56C6C">
            <i class="el-icon-switch-button"></i>
            <span slot="title"><b>退出系统</b></span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="cards">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card class="card card1">
                <p class="num">21</p>
                <span>待发货的订单</span>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card card2">
                <p class="num">99</p>
                <span>上架中的商品</span>
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card class="card card3">
                <p class="num">58</p>
                <span>总注册用户数</span>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="echarts">
          <el-row :gutter="12">
            <el-col :span="8">
              <el-card shadow="hover" class="charts">
                <v-chart class="chart" :option="option1" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" class="charts">
                <v-chart class="chart" :option="option2" />
              </el-card>
            </el-col>
            <el-col :span="8">
              <el-card shadow="hover" class="charts">
                <v-chart class="chart" :option="option3" />
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {
    use
  } from "echarts/core"
  import {
    CanvasRenderer
  } from "echarts/renderers"
  import {
    BarChart,
    PieChart,
    LineChart,
    RadarChart
  } from "echarts/charts"
  import {
    GridComponent,
    TitleComponent,
    TooltipComponent,
    ToolboxComponent,
    LegendComponent
  } from "echarts/components"
  import VChart from "vue-echarts"

  use([
    BarChart,
    PieChart,
    LineChart,
    RadarChart,
    GridComponent,
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    LegendComponent,
    CanvasRenderer
  ])

  export default {
    name: 'Home',
    components: {
      VChart
    },
    data() {
      return {
        option1: {
          title: {
            text: '用户访问来源',
            subtext: '截至昨日 22:00',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'vertical',
            left: 'left',
          },
          series: [{
            name: '访问来源',
            type: 'pie',
            radius: '50%',
            data: [{
                value: 1048,
                name: '小程序'
              },
              {
                value: 735,
                name: '安卓'
              },
              {
                value: 580,
                name: 'IOS'
              },
              {
                value: 484,
                name: 'PC'
              },
              {
                value: 300,
                name: '其他'
              }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        },
        option2: {
          title: {
            text: '访问统计',
            subtext: '单位: 次'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['用户量', '访问量']
          },
          toolbox: {
            show: true,
            feature: {
              dataView: {
                show: false,
                readOnly: true
              },
              magicType: {
                show: true,
                type: ['line', 'bar']
              },
              restore: {
                show: true
              },
              saveAsImage: {
                show: true
              }
            }
          },
          calculable: true,
          xAxis: [{
            type: 'category',
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
              name: '用户量',
              type: 'bar',
              data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
              markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                  },
                  {
                    type: 'min',
                    name: '最小值'
                  }
                ]
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            },
            {
              name: '访问量',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
              markPoint: {
                data: [{
                    name: '年最高',
                    value: 182.2,
                    xAxis: 7,
                    yAxis: 183
                  },
                  {
                    name: '年最低',
                    value: 2.3,
                    xAxis: 11,
                    yAxis: 3
                  }
                ]
              },
              markLine: {
                data: [{
                  type: 'average',
                  name: '平均值'
                }]
              }
            }
          ]
        },
        option3: {
          title: {
            text: '交易状况',
            subtext: '最近两周'
          },
          legend: {
            data: ['上星期', '本星期'],
            left: 'right'
          },
          radar: {
            indicator: [{
                name: '下单',
                max: 6500
              },
              {
                name: '退款',
                max: 16000
              },
              {
                name: '评价',
                max: 30000
              },
              {
                name: '浏览',
                max: 38000
              },
              {
                name: '收藏',
                max: 52000
              },
              {
                name: '加购',
                max: 25000
              }
            ]
          },
          series: [{
            name: '上周 vs 本周',
            type: 'radar',
            data: [{
                value: [4200, 3000, 20000, 35000, 50000, 18000],
                name: '上星期'
              },
              {
                value: [5000, 14000, 28000, 26000, 42000, 21000],
                name: '本星期'
              }
            ]
          }]
        }
      }
    },
    mounted() {
      var access = window.sessionStorage.getItem('account')
      if (!access) {
        this.$message({
          message: '您还未登录系统!',
          type: 'warning'
        })
        this.$router.push('/login')
      }
    },
    methods: {
      logout() {
        this.$confirm('是否确定退出本系统?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          window.sessionStorage.clear()
          this.$store.commit('logout')
          this.$router.push('/login')
          this.$notify({
            type: 'success',
            title: '已退出登录',
            message: '这是一条成功的提示消息'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          })
        })
      },
      tips() {
        this.$message({
          type: 'warning',
          message: '该模块维护中...'
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .container {
    height: 672px;
    border: 1px solid #eee;
  }

  .cards {
    margin-bottom: 20px;
  }

  .card {
    color: #fff;
    height: 150px;
    cursor: pointer;
  }

  .card1 {
    background-color: #EE6666;
  }

  .card2 {
    background-color: #91CC75;
  }

  .card3 {
    background-color: #73C0DE;
  }

  .charts {
    height: 320px;
  }

  .chart {
    width: 100%;
    height: 300px;
  }

  .num {
    font-size: 30px;
    line-height: 15px;
    font-weight: bolder;
  }
</style>
