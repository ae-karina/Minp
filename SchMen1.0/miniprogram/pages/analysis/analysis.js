// pages/jizhang/jizhang.js
// pages/me/index.js
import wxCharts from '../utils/wxcharts'
// import util from '../utils/util'

var ydb = wx.cloud.database()
const _ = ydb.command; //数据库操作符，通过 db.command 获取


// var ringChart = null
// var lineChart = null
// var startPos = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 320,
    todosCount: 0,  // 总数
    todosUncompletedCount: 0, // 未完成数
    todosCompletedCount: 0, // 完成数
    eat:[],
    sport:[],
    learn:[],
    work:[],
    life:[],
    house:[],

    eatc:[],
    sportc:[],
    learnc:[],
    workc:[],
    lifec:[],
    housec:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // update
    this.update()
  },

  /**
   * 分享
   */
  onShareAppMessage: function (options) {

  },

   
// 异步编程技术使你的程序可以在执行一个可能长期运行的任务的同时继续对其他事件做出反应而不必等待任务完成
// async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成
async syncData () {
    this.setData({
        openid: wx.getStorageSync('openid') || []
    })
    // 获取日程清单信息
    this.data.todosCount = await this.getTodosCount()
    this.data.todosCompletedCount = await this.getTodosCompletedCount()
    this.data.todosUncompletedCount = await this.getTodosUnCompletedCount()
    try {
      var res = wx.getSystemInfoSync();
      this.data.windowWidth = res.windowWidth;
    } catch (e) {
      console.error('getSystemInfoSync failed!');
    }

    // update
    this.update()
  },
  // 总数
  async getTodosCount(){
      let res = await ydb.collection('notes').where({
          _openid: this.data.openid
      }).count();
      // console.log(res.total,"总数")
      return res.total;
  },
  // 完成数
  async getTodosCompletedCount(){
    let res = await ydb.collection('notes').where({
        _openid: this.data.openid,
       status: 1
    }).count();
    // console.log(res.total,"已完成")
    return res.total;
  },
  // 未完成数
  async getTodosUnCompletedCount(){
    let res = await ydb.collection('notes').where({
        _openid: this.data.openid,
       status: 0
    }).count();
    // console.log(res.total,"未完成")
    return res.total;
  },

  update(data) {
    data = data || this.data
    this.setData(data)
    // this.updateChartsA()
    //this.updateChartsB()
  },

  // 这个函数是怎么用的
  // updateChartsA: function () {
  //   ringChart && ringChart.updateData({
  //     title: {
  //       name: [Math.round((this.data.todosCompletedCount / this.data.todosCount) * 100), '%'].join('')
  //     },
  //     series: [{
  //       name: '进行中',
  //       data: this.data.todosUncompletedCount,
  //       stroke: false
  //     }, {
  //       name: '已完成',
  //       data: this.data.todosCompletedCount,
  //       stroke: false
  //     }]
  //   })
  // },


  onReady() {
    // this.renderChartsA()
  },

  onShow () {
    this.syncData()

    let that=this
    wx.cloud.database().collection('notes').where({_openid: wx.getStorageSync("openid")}).get()
    .then(res=>{
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].leix=="用餐"){
          that.setData({
            eat:that.data.eat.concat(res.data[i])
          })
          // console.log(that.data.eat,"eat")
        }
        if(res.data[i].leix=="运动"){
          that.setData({
            sport:that.data.sport.concat(res.data[i])
          })
          // console.log(that.data.sport,"sport")
        }
        if(res.data[i].leix=="学习"){
          that.setData({
            learn:that.data.learn.concat(res.data[i])
          })
          // console.log(that.data.learn,"learn")
        }
        if(res.data[i].leix=="工作"){
          that.setData({
            work:that.data.work.concat(res.data[i])
          }) 
          // console.log(that.data.work,"work")
        }
        if(res.data[i].leix=="休闲"){
          that.setData({
            life:that.data.life.concat(res.data[i])
          })
          // console.log(that.data.life,"life")
        }
        if(res.data[i].leix=="家务"){
          that.setData({
            house:that.data.house.concat(res.data[i])
          })
          // console.log(that.data.house,"house")
        }


        if(res.data[i].leix=="用餐" && res.data[i].status==1){
          that.setData({
            eatc:that.data.eatc.concat(res.data[i])
          })
          // console.log(that.data.eatc,"eat")
        } 
        if(res.data[i].leix=="运动" && res.data[i].status==1){
          that.setData({
            sportc:that.data.sportc.concat(res.data[i])
          })
          // console.log(that.data.sportc,"sport")
        }
        if(res.data[i].leix=="学习" && res.data[i].status==1){
          that.setData({
            learnc:that.data.learnc.concat(res.data[i])
          })
          // console.log(that.data.learnc,"learn")
        }
        if(res.data[i].leix=="工作" && res.data[i].status==1){
          that.setData({
            workc:that.data.workc.concat(res.data[i])
          })
          // console.log(that.data.workc,"work")
        }
        if(res.data[i].leix=="休闲" && res.data[i].status==1){
          that.setData({
            lifec:that.data.lifec.concat(res.data[i])
          })
          // console.log(that.data.lifec,"life")
        }
        if(res.data[i].leix=="家务" && res.data[i].status==1){
          that.setData({
            housec:that.data.housec.concat(res.data[i])
          })
          // console.log(that.data.housec,"house")
        }
      }
    })
     
      
    setTimeout(function(){

      new wxCharts({
      animation: true,
      canvasId: 'ringCanvas',
      type: 'ring',
      extra: {
        ringWidth: 25,  //圆环宽度
        pie: {
          offsetAngle: -45  //起始角度偏移度数
        }
      },
      title: {     //标题内容
        name: [Math.round((that.data.todosCompletedCount / that.data.todosCount) * 100), '%'].join(''),//四舍五入，拼接
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {    //副标题内容
        name: '完成率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '进行中',
        data: that.data.todosUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: that.data.todosCompletedCount,
        stroke: false
      }],
      disablePieStroke: true,//不要分段线
      width: that.data.windowWidth,
      height: 184,
      dataLabel: false,  //是否在图表中显示数据内容值
      legend: true,  //是否显示图表下方各类别的标识
      background: '#f5f5f5',
      padding: 0
    })

      // 一个图表调用一次new wxCharts即可
      new wxCharts({
      canvasId:'pieCanvas',
      type:'pie',
      series:[{
        name:'用餐',
        data:that.data.eat.length,
      },
      {
        name:'运动',
        data:that.data.sport.length,
      },{
        name:'学习',
        data:that.data.learn.length,
      },
      {
        name:'工作',
        data:that.data.work.length,
      },
      {
        name:'休闲',
        data:that.data.life.length,
      },
      {
        name:'家务',
        data:that.data.house.length,
      },
      ],
        // width:330,
        width: that.data.windowWidth,
        height:300,
        dataLabel:true
      })

      let name=(that.data.eatc.length/that.data.eat.length)*100 || 0
      let name1=(that.data.sportc.length/that.data.sport.length)*100 || 0
      let name2=(that.data.learnc.length/that.data.learn.length)*100 || 0
      let name3=(that.data.workc.length/that.data.work.length)*100 || 0
      let name4=(that.data.lifec.length/that.data.life.length)*100 || 0
      let name5=(that.data.housec.length/that.data.house.length)*100 || 0
      // console.log(name4,"name4")
      new wxCharts({
        canvasId:'columnCanvas',
        type:'column',
        categories:['','',''],

        series:[{
          name:'用餐',
          data:[name],
        },
        {
          name:'运动',
          data:[name1],
        },{
          name:'学习',
          data:['',name2],
        },
        {
          name:'工作',
          data:['',name3],
        },
        {
          name:'休闲',
          data:['','',name4],
        },
        {
          name:'家务',
          data:['','',name5],
        },
      ],
        yAxis:{  // Y轴配置
          // title:'类型效率',
          format:function (val) {
            return val +'%';
          },
        },

        width: that.data.windowWidth,
        height:200,
        dataLabel:false
      })        
    },2000);
 

  },



  // renderChartsA() {
  //   ringChart = new wxCharts({
  //     animation: true,
  //     canvasId: 'chartsA',
  //     type: 'ring',
  //     extra: {
  //       ringWidth: 25,
  //       pie: {
  //         offsetAngle: -45
  //       }
  //     },
  //     title: {
  //       name: [Math.round((this.data.todosCompletedCount / this.data.todosCount) * 100), '%'].join(''),
  //       color: '#7cb5ec',
  //       fontSize: 25
  //     },
  //     subtitle: {
  //       name: '完成率',
  //       color: '#666666',
  //       fontSize: 15
  //     },
  //     series: [{
  //       name: '进行中',
  //       data: this.data.todosUncompletedCount,
  //       stroke: false
  //     }, {
  //       name: '已完成',
  //       data: this.data.todosCompletedCount,
  //       stroke: false
  //     }],
  //     disablePieStroke: true,
  //     width: this.data.windowWidth,
  //     height: 184,
  //     dataLabel: false,
  //     legend: true,
  //     background: '#f5f5f5',
  //     padding: 0
  //   })
  // },






})