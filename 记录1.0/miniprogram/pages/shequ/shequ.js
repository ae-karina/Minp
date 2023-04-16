// pages/shequ/shequ.js





const db = wx.cloud.database()
let pageSize = 10
var page = 0
var currentPage = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
   
  dataList:[],

jiazai:true,


   
   
  },

  time:function(e){
    console.log('打印第一个'+e ) 
    var time = Date.now();
    console.log('打印第一个',time) 
    console.log(time)        
    console.log(time - e)
    var timecha = time - e
  
    var date1 = new Date(e);       //time是你数据的时间戳
     var year = date1.getFullYear();
     var month = date1.getMonth() + 1;
     var date = date1.getDate();
     var hour = date1.getHours();
     var mm = date1.getMinutes(); 
  
     console.log("测试string:"+typeof e);
     
    //  根据自己需要通过判断timecha/1000的区间值来进行return赋值
     if( typeof e == 'string'){
      return e
     }else if(timecha/1000 <86400){
      console.log('时间为这三天')
      let  e =  hour + ':' +mm
      console.log(e)
      return e
    }
    else if(timecha/1000 >86400){
      console.log('时间为以前')
      let e = month+'-'+date+' '+hour+':'+mm
      return e
    }
  
   },

  
  
  
 

// 页面显示js
onShow:function(){
  
    
},


// 去动态详情
toDetail(e){
  let that=this
  let id=e.currentTarget.dataset.id
  
  console.log(id._id)
  that.upskan(id._id,id.skan)

  wx.navigateTo({
  url:'/pages/detail/detail?id='+id._id,
      })
      },
upskan(e,a){
db.collection("friends").doc(e).update({
data:{
skan:a+1
}
})
.then(res=>{
console.log("更新成功")

})
},

  


// 分享动态
onShareAppMessage(event){

    console.log(event.target.dataset.index)
    var index = event.target.dataset.index

    
    console.log(this.data.dataList[index]._id,"kkkk1111")

    return {
      title: this.data.dataList[index].text,
      imageUrl: this.data.dataList[index].images[0],
      path:'/pages/detail/detail?id=' + this.data.dataList[index]._id
    }
  
  
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
      tishi:"社区"
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
            for (var i=0 ;i < list.length ; i++) {  
              list[i].time =  that.time(list[i].time);
            console.log(list[i].time)
          }
           
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
 
 
  previewImg(event){
    var that = this;
    console.log(event)
    wx.previewImage({
      current: event.currentTarget.dataset.src,
      urls: that.data.dataList[event.currentTarget.dataset.index].contentsrc,
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
  add(){
      wx.navigateTo({
        url: '/pages/add/add',
      })
  }
 
  
})