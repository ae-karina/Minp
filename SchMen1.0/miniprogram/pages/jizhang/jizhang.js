// pages/jizhang/jizhang.js
// pages/me/index.js
import wxCharts from '../utils/wxcharts'
import util from '../utils/util'

var ydb = wx.cloud.database()
const _ = ydb.command;


var ringChart = null
var lineChart = null
var startPos = null

Page({
  /**
   * 页面的初始数据
   */
  data: {
    windowWidth: 320,
    todosCount: 0,  // 总数
    todosUncompletedCount: 0, // 未完成数
    todosCompletedCount: 0, // 完成数
    shu:[],
    geren:[],
    xue:[],
    gongz:[],
    xiu:[],
    jia:[],


    shuw:[],
    gerenw:[],
    xuew:[],
    gongzw:[],
    xiuw:[],
    jiaw:[],
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
  async syncData () {
    this.setData({
        openid: wx.getStorageSync('openid') || []
    })
    // 获取日程清单信息
    this.data.todosCount = await this.getTodosCount()
    this.data.todosCompletedCount = await this.getTodosCompletedCount()
    this.data.todosUncompletedCount = await this.getTodosUnCompletedCount()

    // update
    this.update()
  },
  // 总数
  async getTodosCount(){
      let res = await ydb.collection('notes').where({
          _openid: this.data.openid
      }).count();
      console.log(res.total,"总数")
      return res.total;
  },
  // 完成数
  async getTodosCompletedCount(){
    let res = await ydb.collection('notes').where({
        _openid: this.data.openid,
       status: 1
    }).count();
    console.log(res.total,"已完成")
    return res.total;
  },
  // 未完成数
  async getTodosUnCompletedCount(){
    let res = await ydb.collection('notes').where({
        _openid: this.data.openid,
       status: 0
    }).count();
    console.log(res.total,"未完成")
    return res.total;
  },

  update(data) {
    data = data || this.data
    this.setData(data)
    this.updateChartsA()
    //this.updateChartsB()
  },

  updateChartsA: function () {
    ringChart && ringChart.updateData({
      title: {
        name: [Math.round((this.data.todosCompletedCount / this.data.todosCount) * 100), '%'].join('')
      },
      series: [{
        name: '进行中',
        data: this.data.todosUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: this.data.todosCompletedCount,
        stroke: false
      }]
    })
  },


  onReady() {
    this.renderChartsA()
   
  },

  onShow () {
    this.syncData()

    let that=this
    wx.cloud.database().collection('notes').get()
    .then(res=>{
      for(var i=0;i<res.data.length;i++){
        if(res.data[i].leix=="用餐"){
          that.setData({
            shu:that.data.shu.concat(res.data[i])
          })
          console.log(that.data.shu)
        }
        if(res.data[i].leix=="运动"){
          that.setData({
            geren:that.data.geren.concat(res.data[i])
          })
          console.log(that.data.geren)
        }
        if(res.data[i].leix=="学习"){
          that.setData({
            xue:that.data.xue.concat(res.data[i])
          })
        }
        if(res.data[i].leix=="工作"){
          that.setData({
            gongz:that.data.gongz.concat(res.data[i])
          }) 
        }
        if(res.data[i].leix=="休闲"){
          that.setData({
            xiu:that.data.xiu.concat(res.data[i])
          })
        }
        if(res.data[i].leix=="家务"){
          that.setData({
            jia:that.data.jia.concat(res.data[i])
          })
        }

        if(res.data[i].leix=="用餐" && res.data[i].status==1){
          that.setData({
            shuw:that.data.shuw.concat(res.data[i])
          })
          console.log(that.data.shu)
        } 
        if(res.data[i].leix=="运动" && res.data[i].status==1){
          that.setData({
            gerenw:that.data.gerenw.concat(res.data[i])
          })
          console.log(that.data.gerenw,"kkk")
        }
        if(res.data[i].leix=="学习" && res.data[i].status==1){
          that.setData({
            xuew:that.data.xuew.concat(res.data[i])
          })
        }
        if(res.data[i].leix=="工作" && res.data[i].status==1){
          that.setData({
            gongzw:that.data.gongzw.concat(res.data[i])
          })
        }
        if(res.data[i].leix=="休闲" && res.data[i].status==1){
          that.setData({
            xiuw:that.data.xiuw.concat(res.data[i])
          })
        }
        if(res.data[i].leix=="家务" && res.data[i].status==1){
          that.setData({
            jiaw:that.data.jiaw.concat(res.data[i])
          })
        }
      }
    })
     
      
                



    setTimeout(function(){
      new wxCharts({

      canvasId:'pieCanvas',
      type:'pie',
      series:[{
        name:'用餐',
        data:that.data.shu.length,
      },
      {
        name:'运动',
        data:that.data.geren.length,
      },{
        name:'学习',
        data:that.data.xue.length,
      },
      {
        name:'工作',
        data:that.data.gongz.length,
      },
      {
        name:'休闲',
        data:that.data.xiu.length,
      },
      {
        name:'家务',
        data:that.data.jia.length,
      },
      ],
        width:330,
        height:300,
        dataLabel:true
      })

      let name=(that.data.shuw.length/that.data.shu.length)*100 || 0
      let name1=(that.data.geren.length/that.data.geren.length)*100 || 0
      let name2=(that.data.xuew.length/that.data.xue.length)*100 || 0
      let name3=(that.data.gongzw.length/that.data.gongz.length)*100 || 0
      let name4=(that.data.xiuw.length/that.data.xiu.length)*100 || 0
      let name5=(that.data.jia.length/that.data.jia.length)*100 || 0
      console.log(name4,"name4")
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
        yAxis:{
          title:'类型效率',
          format:function (val) {
            return val +'%';
          },
        },

        width:260,
        height:200,
        dataLabel:false
      })        
    },2000);
 

    new wxCharts({
      canvasId:'linCanvas',
      type:'line',
      categories:['2021','2023','2024'],

      series:[{
        name:'成交1',
        data:['0.15','0.30','0.10']
      },
      {
        name:'成交2',
        data:['0.17','0.30','0.20'],
      },
      ],

      yAxis:{
        title:'标题',
        format:function (val) {
          return val.toFixed(2);
        },
        min:0
      },

      width:260,
      height:200,
      dataLabel:true
    })

  },



  renderChartsA() {
    ringChart = new wxCharts({
      animation: true,
      canvasId: 'chartsA',
      type: 'ring',
      extra: {
        ringWidth: 25,
        pie: {
          offsetAngle: -45
        }
      },
      title: {
        name: [Math.round((this.data.todosCompletedCount / this.data.todosCount) * 100), '%'].join(''),
        color: '#7cb5ec',
        fontSize: 25
      },
      subtitle: {
        name: '完成率',
        color: '#666666',
        fontSize: 15
      },
      series: [{
        name: '进行中',
        data: this.data.todosUncompletedCount,
        stroke: false
      }, {
        name: '已完成',
        data: this.data.todosCompletedCount,
        stroke: false
      }],
      disablePieStroke: true,
      width: this.data.windowWidth,
      height: 184,
      dataLabel: false,
      legend: true,
      background: '#f5f5f5',
      padding: 0
    })
  },






})