// pages/shequ/shequ.js 
const db = wx.cloud.database()
var page = 0
let pageSize = 10  //每页显示多少数据
var currentPage = 0  //当前第几页,0代表第一页 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList:[],
    jiazai:true,
  },

  time:function(e){
    console.log('打印第一个emm'+e) 
    var time = Date.now();   //返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
    console.log('打印第一',time) 
    console.log(time)        
    console.log(time - e)
    var timecha = time - e
  
    var date1 = new Date(e);       //time是你数据的时间戳
    console.log(date1,"date1")
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
      console.log('时间为这三天')  //不是一天吗
      let  e =  hour + ':' +mm
      console.log(e)
      return e
    }else if(timecha/1000 >86400){
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
    console.log(e,"emme")
    let that=this
    let id=e.currentTarget.dataset.id
    console.log(e,"e.id")
    console.log(id._id,"e.id._id")
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

  


  // 分享动态  监听用户点击页面内转发按钮
  onShareAppMessage(event){
    console.log(event.target.dataset.index,"index")
    var index = event.target.dataset.index
    console.log(this.data.dataList[index]._id,"kkkk1111")
    return {
      title: this.data.dataList[index].text,
      imageUrl: this.data.dataList[index].contentsrc[0],
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
    console.log(page,"pagehahah")
  },

  // 每页显示10条数据，当滑动到底部时，会加载第二页的数据，再往下滑动，就加载第三页的数据
  getData(currentPage){
    let that =this;
    wx.cloud.database().collection("friends")
    .where({
      tishi:"社区"
    })
    .orderBy('time','desc')
    .skip(currentPage * pageSize)  //跳过前面几条数据，请求后面的数据 
    .limit(pageSize)   //请求多少条数据
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
            console.log(list[i].time,"listtimeA")
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
    console.log(event,"imgla")
    wx.previewImage({
      current: event.currentTarget.dataset.src,// 当前显示图片的http链接
      urls: that.data.dataList[event.currentTarget.dataset.index].contentsrc,// 需要预览的图片http链接列表
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