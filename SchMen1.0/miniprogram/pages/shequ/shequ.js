// pages/shequ/shequ.js 
import utill from '../utils/utill'

const db = wx.cloud.database()
const _ = db.command
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
    change:{},
    s:'',
    a:'',
  },

  time:function(e){
    // console.log('打印第一个emm'+e) 
    var time = Date.now();   //返回自1970年1月1日 00:00:00 UTC到当前时间的毫秒数
    // console.log('打印第一',time) 
    // console.log(time)        
    // console.log(time - e)
    var timecha = time - e
  
    // var date1 = new Date(e);       //time是你数据的时间戳
    // console.log(date1,"date1")
    // var year = date1.getFullYear();
    // var month = date1.getMonth() + 1;
    // var date = date1.getDate();
    // var hour = date1.getHours();
    // var mm = date1.getMinutes(); 
  
    console.log("测试string:"+typeof e);
     
    //  根据自己需要通过判断timecha/1000的区间值来进行return赋值
    if( typeof e == 'string'){
      return e
    }else if(timecha/1000 <86400){
      console.log('时间为这三天')  //不是一天吗
      return utill.formatD(new Date(e))
      
    }else if(timecha/1000 >86400){
      console.log('时间为以前')
      return utill.formatM(new Date(e))

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


  // change(){
  //   var that=this
  //   db.collection("user")
  //     .where({ _openid: wx.getStorageSync("openid") })
  //     .watch({
  //       onChange: function (snapshot) {
  //         console.log("docs's changed events", snapshot.docChanges);
  //         console.log("query result snapshot after the event", snapshot.docs);
  //         console.log("is init data", snapshot.type === "init");
  //         that.setData({
  //           change:snapshot.docs[0]
  //         })
  //         console.log(that.data.change)
  //       },
  //       onError: function (err) {
  //         console.error("the watch closed because of error", err);
  //       },
  //     });
      
      // console.log(watcher)
      // if(watcher){
      //   db.collection("friens").where({ _openid: wx.getStorageSync("openid") }).update({
      //       bosstoursc:snapshot.docs[0].avatarUrl,
      //       nick:snapshot.docs[0].nick,
      //       'speaklist.src':snapshot.docs[0].avatarUrl,
      //     })
      //   let get=db.collection("friens").where({ _openid: wx.getStorageSync("openid") }).get()
      //   if(get){
      //     if(get.speaklist.length>0){
      //       // const _ = db.command
      //       db.collection('friends').where({
      //         speaklist: _.elemMatch({
      //           openid: wx.getStorageSync("openid"),
      //         })
      //       })
      //       .update({
      //         src:watcher.docs[0].avatarUrl,
      //         nick:watcher.docs[0].nick
      //       })
      //     }
      //   }
      // }
  // },

  // check(){
  //    db.collection("friens").where({ 
  //     _openid: wx.getStorageSync("openid").and ("speaklist.$[].openid"wx.getStorageSync("openid"))
  //   }).get()
          
  // },

  async changedata(){//检测到变化更新数据库
    let res= await db.collection("friends").where({ _openid: wx.getStorageSync("openid") })
    .update({
      data: {
        nick: this.data.s,
        bosstoursc: this.data.a,
      },
    });
    if(res){
      // 查询集合中符合条件的记录
        let res1= await db.collection('speak').where({ _openid: wx.getStorageSync("openid") }).get()
        if(res1){
          const record = res1.data[0]; // 获取第一条符合条件的记录

          let res2= await db.collection('speak').where({toNickname: record.nick})
            .update({
              data: {
                toNickname:this.data.s,
              }
            })

          if(res2){
            db.collection("speak").where({ _openid: wx.getStorageSync("openid") })
              .update({
                data: {
                  nick: this.data.s,
                  src: this.data.a,
                },
            });
          }
        }
      }  
  } ,

          
          
       
       
    
    


 load(){
  this.watch()
    
      setTimeout(() => {
        this.changedata()
    }, 3000)

 },
   // 检查是否已存在相同的记录
isRecordExist(array, record) {
  for (let i = 0; i < array.length; i++) {
    if (array[i]._id === record._id) {
      return true;
    }
  }
  return false;
},
  watch(){//监控数据变化
    var that=this
    db.collection("user")
      .where({ _openid: wx.getStorageSync("openid") })
      .watch({
        onChange: function (snapshot) {
          console.log("docs's changed events", snapshot.docChanges);
          console.log("query result snapshot after the event", snapshot.docs);
          console.log("is init data", snapshot.type === "init");
          that.setData({
            a:snapshot.docs[0].avatarUrl,
            s:snapshot.docs[0].nick
          })
          console.log(that.data.a,that.data.s)
        },
        onError: function (err) {
          console.error("the watch closed because of error", err);
        },
      });
  },

  // 页面加载信息
  onLoad(){
    this.load()
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