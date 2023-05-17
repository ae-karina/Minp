// // pages/xuyao/xuyao.js
// import utill from '../utils/utill'

// const db = wx.cloud.database()
// let pageSize = 10
// var page = 0
// var currentPage = 0
// let speak=''
// Page({

//   /**
//    * 页面的初始数据
//    */
//   data: {
//     dataList:[],
//     jiazai:true,
//   },

 


//   // 页面显示js
//   onShow:function(){
    
//   },

// //时间
//   getNowFormatDate: function () {
//     var date = new Date();
//     var seperator1 = "-";
//     var seperator2 = ":";
//     var month = date.getMonth() + 1;
//     var strDate = date.getDate();
//     if (month >= 1 && month <= 9) {
//       month = "0" + month;
//     }
//     if (strDate >= 0 && strDate <= 9) {
//       strDate = "0" + strDate;
//     }
//     var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
//     " " + date.getHours() + seperator2 + date.getMinutes() +
//     seperator2 + date.getSeconds();
//     return currentdate;
//   },







//   // 页面加载信息
//   onLoad(){
//     this.getData(0)
//   },


//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom() {
//     let that= this
//     this.setData({
//       jiazai:true
//     })
//     setTimeout(function(){
//       that.getData(page)
//     },500)
//     console.log(page)
//   },

//   getData(currentPage){
//     let that =this;
//     wx.cloud.database().collection("friends")
//     .where({
//       tishi:"帮助"
//     })
//     .orderBy('time','asc')
//     .skip(currentPage * pageSize)
//     .limit(pageSize)
//     .get({
//       success(res){
//         console.log(res,"十五")
//         if (res.data && res.data.length>0) {
//           currentPage++
//           page=currentPage
//           console.log(currentPage,"kkkk")
//           let list =that.data.dataList.concat(res.data)
//           console.log(list,"kkkaak")
//           that.setData({
//             dataList:list,
//             jiazai:false
//           });   
//         }else{
//             that.setData({
//               jiazai:false
//             })
//           }
//       }
//     })  
//   },
 
 

  
//   onPullDownRefresh(){
//     var that = this
//     this.page=0
//     this.setData({
//       dataList:[],
//       jiazai:true
//     })
//     setTimeout(function(){
//       wx.stopPullDownRefresh(
//         that.getData(0)
//     )},500)
//   },
  
 
//   //发布
//   add(){
//     let that =this;
//     let nick=wx.getStorageSync('message')
//     console.log(nick,"kkk")
//     if(speak==""){
//       wx.showToast({
//         title:'输入内容',
//         icon:'none'
//       })
//     }
//     else{
//       // wx.showModal({
//       //   title:"提示",
//       //   content:"提交？",
//       //   success(res){
//       //     if(res.confirm==true){
//             that.setData({
//               dataList:[]
//             })
//             db.collection("friends").add({
//               data:{
//                 img:nick.avatarUrl,
//                 nick:nick.nick,
//                 content:speak,
//                 // time: Date.now(),
//                 time:utill.formatSD(new Date()),
//                 tishi:"帮助"
//               }
//             })
//             .then(res=>{
//               that.onLoad()
//               that.setData({
//                 speak:''
//               })
//               // wx.showToast({
//               //   title: '发表成功',
//               // })
//             })
//           }
//         // }
//       // })
    
//   },

//   // 获取评论信息
//   getInputValue(event){
//     speak=event.detail.value  
//   },

// })

// const app = getApp()
const db = wx.cloud.database()
 
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    mess : '',
    content : [],//聊天信息
    mineAvatorSrc : '',
    himAvatorSrc:'./../../images/fan.png',
	},
	
    //获取格式化的时间 yyyy-mm-dd-hh:mm-ss
	getFormatTime(){
		let date = new Date();
		let ymd = date.toISOString().substring(0,10);//年-月-日
		let hms = date.toTimeString().substring(0,8);//小时-分钟-秒钟
		console.log(ymd + "-" + hms);
		return ymd + "-" + hms;//拼接
	},
 
  //“发送”
  sendMess(){
    let that = this;
    let mess = that.data.mess;
	let content = that.data.content;
	let date = that.getFormatTime();
	let id = that.data.currentId;
    wx.showLoading({
      title: '发送ing...',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {
        db.collection('chat')
        .doc(id)
        .update({
          data : {
            chatContent : content.concat({
              id : 1,//用户自己发送，为0
              text : mess,
              date : date
            })
          },
          success:function(res){
            console.log("添加成功！",res);
          },
          fail:function(err){
            console.log("添加失败！",err);
          },
          complete:function(){
            that.setData({
              mess : '',
            })
            wx.hideLoading({
              noConflict: true,
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
          }
        })
      },
    })
  },
 
  //初始化数据库的字段
  initChatContent(){
	  let that = this;
	wx.showLoading({
	  title: '初始化数据库的字段中...',
	  mask: true,
	  success: (res) => {},
	  fail: (res) => {},
	  complete: (res) => {
		  db.collection('chat')
		  .add({
			  data : {
				  chatContent : [],//设置一个空的聊天循环体
			  },
			  success(res){
				console.log("初始化成功！",res);
				that.setData({
					currentId : res._id//设置当前的id
				})
			  },
			  fail(err){
				console.log("初始化失败！",err);
			  },
			  complete(){
				wx.hideLoading({
				  noConflict: true,
				  success: (res) => {},
				  fail: (res) => {},
				  complete: (res) => {},
				})
			  }
		  })
	  },
	})
  },
 
  //查询聊天
  queryChat(){
    let that = this;
    let touxiang =wx.getStorageSync('message')
    wx.showLoading({
      title: '查询...',
      mask: true,
      success: (res) => {},
      fail: (res) => {},
      complete: (res) => {
        db.collection('chat')
        //.doc('4efa204964219ab20003873513331ef9')
        .get({
          success:function(res){
            console.log("查询成功！",res);
            if(res.data.length == 0){
				that.initChatContent();//初始化数据库字段
			}
			else{
				that.setData({
					currentId : res.data[0]._id,//设置当前的id
					content : res.data[0].chatContent,//赋值给当前的聊天循环体
          mineAvatorSrc:touxiang.avatarUrl
				})
				
				//定位到最后一行
				that.setData({
					toBottom : `item${that.data.content.length - 1}`,
				})
			}
          },
          fail:function(err){
            console.log("查询失败！",err);
          },
          complete:function(){
            wx.hideLoading({
              noConflict: true,
              success: (res) => {},
              fail: (res) => {},
              complete: (res) => {},
            })
          }
        })
      },
    })
  },
  
  //数据库的监听器
  dbWatcher(){
	let that = this;
    db.collection('chat').where({
    })
    .watch({
      onChange: function (res) {
        //监控数据发生变化时触发
		console.log("res:",res);
		if(res.docChanges != null){
			if(res.docChanges[0].time == "update"){//数据库监听到的内容
				let length = res.docChanges[0].doc.chatContent.length;
				console.log("length : ",length);
				let value = res.docChanges[0].doc.chatContent[length - 1];//要增添的内容
				console.log("value : ",value);
				that.setData({
					content : that.data.content.concat(value)
				})
				//定位到最后一行
				that.setData({
					toBottom : `item${that.data.content.length - 1}`,
				})
			}
		}
      },
      onError:(err) => {
        console.error(err)
      }
    })
  },
 
  //获取时间并格式化时间
  checkDateAndTime(){
    let date = new Date();
    let ymd = date.toISOString().substring(0,10);//年-月-日
    let time = date.toTimeString().substring(0,8);//时：分：秒
 
    console.log("年-月-日 : ",ymd);
    console.log("时：分：秒 : ",time);
 
    let resDate = ymd + '-' + time;
    console.log("resDate : ",resDate);
},
 
 
  /**
   * 生命周期函数--监听页面加载
   */
    // 生命周期函数--监听页面加载
  onLoad: function (options) {
 
	this.dbWatcher();
 
	this.queryChat();
 
  },
 
  onReady(){
 
  },
 
})