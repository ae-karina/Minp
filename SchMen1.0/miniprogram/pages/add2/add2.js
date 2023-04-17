// pages/add2/add2.js
import util from '../utils/util'
let id=''
const db = wx.cloud.database()
Page({

    /**
     * 页面的初始数据
     */
    data: {
    list:[],
    inputbiaoqian:'用餐',
    index: 0,
  
    array: ['用餐','运动','学习','工作','休闲','家务'],


    date: util.formatTime(new Date()),  // 日期
  
    dayStyle:[
        {month: 'current', 
        day: '', 
        color: 'white', 
        background: '#AAD4F5' 
        },
        {month: 'current', 
        day:'', 
        color: 'white', 
        background: '#AAD4F5' 
        }
    ],
    hiddenmodalput:true,
    day:''

  
  
   
    },

    //时间
getNowFormatDate: function () {
  var date = new Date();
  var seperator1 = "-";
  var seperator2 = ":";
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
   month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
   strDate = "0" + strDate;
  }
  var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
   " " + date.getHours() + seperator2 + date.getMinutes() +
   seperator2 + date.getSeconds();
  return currentdate;
  },
  


      //单击日期变色 添加日程
      dayClick:function(e){
        var year=e.detail.year
        var month=e.detail.month
        var day=e.detail.day

        var changeday="dayStyle[1].day"
        var changeBg="dayStyle[1].background"
        this.setData({
            [changeday]: day,
            [changeBg]: "#e8989a",
            day:day,
            month:month,
            year:year
        })
       
        
      

    },
 
    //监听点击日历标题选择器
    dateChange: function (event) {
        console.log(event.detail)
    },
    //监听点击上一个月
    prev: function (event) {
        console.log(event.detail)
    },
    //监听点击下一个月
    next: function (event) {
        console.log(event.detail)
    },
    //添加日程
    addnote:function(e){
        this.setData({
            hiddenmodalput: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    

    },
    bindPickerChange: function(e) {
    
      console.log(e.detail)
      console.log('picker发送选择改变，携带值为', e.detail.value)
      if (e.detail.value==0) {
        this.setData({
          inputbiaoqian:this.data.array[0],
          index: e.detail.value
        })
      }else{
        this.setData({
          index: e.detail.value,
          inputbiaoqian:this.data.array[e.detail.value]
        })
      }
        
        console.log(this.data.inputbiaoqian)
    },
   

    /**
     * 生命周期函数--监听页面初次渲染完成
     */

  
  

     // 获取点击事件用户的动态

    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
  

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },
   
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },
   
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    },

    //立即发布
    submit(e){
      let ni=wx.getStorageSync('message')
      let nick=ni.nick
      let src=ni.avatarUrl
      if(!wx.getStorageSync('message')){//判断是否已登录
        wx.showModal({
         title:"未登录",
      content:"去登录",
        success(res){
      if(res.confirm==true){
        wx.switchTab({
        url:'/pages/my/my',
       })
      }
      }
      })
    
    
    
    }
    
    else{

      let that=this
     
      
    if (e.detail.value.daiban == '') {
      wx.showToast({
          icon: "none",
          title: "事情不能为空"
      })
    }
   

 else if (e.detail.value.beizhu == '') {
      wx.showToast({
          icon: "none",
          title: "备注不能为空"
      })
  }
  
  
 else if (that.data.day=='') {
  
    wx.showToast({
        icon: "none",
        title: "日期不能为空"
    })
}



    else{


            wx.showModal({
                title:"提示",
              content:"是否确定发布",
              success(res){
              if(res.confirm==true){
                            db.collection('notes').add({
                                data:{  
                                 
                                  status:0,
                                  note:e.detail.value.daiban,
                                  beizhu:e.detail.value.beizhu,              
                                  nick:ni.nick,
                                  src:ni.avatarUrl,
                                  date:that.data.date,
                                  day:that.data.day,
                                  month:that.data.month,
                                  year:that.data.year,
                                  time: Date.now(),
                                  time:that.getNowFormatDate(),
                                  leix:that.data.inputbiaoqian
                                 
                                  
                                 

                        
                                }
                            }).then(res=>{
                            
                                wx.showToast({
                                    title:'发布成功',
                                    icon:'none',
                                    duration:10000,
                                    success:function(){
                                      setTimeout(function(){
                              wx.switchTab({
                                url:'/pages/schedule/schedule',
                                 })
                              
                              
                                      },1000);
                                    }
                                    })
                                    
                                 
                            })
                        
                        }  
                    }    
                })  
      
              }
      
            }
    
      },
    


})