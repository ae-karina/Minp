// pages/xuyao/xuyao.js

const db = wx.cloud.database()
let pageSize = 10
var page = 0
var currentPage = 0
let speak=''
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  dataList:[],
  jiazai:true,




   
   
  },

 


// 页面显示js
onShow:function(){
  
    
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







// 页面加载信息
onLoad(){
 

 
  this.getData(0)
  
    
},


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
   let that= this
   this.setData({
    jiazai:true
  })
     setTimeout(function(){
       that.getData(page)
     },500)
     console.log(page)
  },

  getData(currentPage){
  let that =this;
 
  
    wx.cloud.database().collection("friends")
    .where({
      tishi:"帮助"
    })
    .orderBy('time','desc')
   
        .skip(currentPage * pageSize)
        .limit(pageSize)
        .get({
          success(res){
            console.log(res,"十五")
           if (res.data && res.data.length>0) {
            currentPage++
            page=currentPage
            console.log(currentPage,"kkkk")
            let list =that.data.dataList.concat(res.data)
       
           
             console.log(list,"kkkaak")
             that.setData({
               dataList:list,
               jiazai:false
             });   

            
            
          }else{
            that.setData({
              jiazai:false
            })
          }
         }
        })
  
  
   
   
  },
 
 

  
  onPullDownRefresh(){
    var that = this
    this.page=0
    this.setData({
      dataList:[],
      jiazai:true
    })
    setTimeout(function(){
      wx.stopPullDownRefresh(
      that.getData(0)
    )},500)
    
  },
  
 
//发布
add(){
let that =this;
let nick=wx.getStorageSync('message')
console.log(nick,"kkk")

 
     
if(speak==""){
wx.showToast({
title:'输入内容',
icon:'none'

})
}
   else{


   

  wx.showModal({
  title:"提示",
content:"提交？",
success(res){
if(res.confirm==true){
that.setData({
  dataList:[]
})

db.collection("friends").add({
data:{

img:nick.avatarUrl,
nick:nick.nick,
content:speak,
time: Date.now(),
time:that.getNowFormatDate(),
tishi:"帮助"



}
})
.then(res=>{
that.onLoad()
 
that.setData({
  speak:''
})
  wx.showToast({
    title: '发表成功',
  })



})

  






}
}
  })

   }




},



// 获取评论信息
getInputValue(event){
 

  speak=event.detail.value  
},

})