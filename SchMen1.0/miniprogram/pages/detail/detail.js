// 已检查
// 未完全优化
import utill from '../utils/utill'
let speak=''
let id=''
const db = wx.cloud.database()
const _ = db.command;
Page({
  data: {
    action:[],
    plcaceHolder:'',
    speak:'',
    openid:null,
    isPubShow:false,
    speaklist:[],
    toReid:0,
    toNickname:'',
    isFocus:false,
  },


  //删除
  dete(){
    wx.showModal({
      title:"删除",
      content:"确定删除吗？",
      success(res){
        if(res.confirm==true){
          db.collection("speak").where({idt:id}).remove()
          db.collection("friends").doc(id).remove()
          .then(res=>{
            wx.showToast({
              title:'删除成功',
              icon:'none',
              duration:10000,
              success:function(){
                // console.log(getCurrentPages(),"跳转的页面")
                setTimeout(function(){
                  wx.reLaunch({ //关闭所有页面，打开到应用内的某个页面
                    url:'/pages/shequ/shequ',
                  })
                  // console.log(setCurrentPages(),"跳转的页面2")
                },1000);
              } 
            })
          })
        }
      }
    })
  },

 
  time:function(e){
    // console.log('打印第一个'+e ) 
    var time = Date.now();
    // console.log('打印第一个',time) 
    // console.log(time)        
    // console.log(time - e)
    var timecha = time - e

    // var date1 = new Date(e); //time是你数据的时间戳
    // var year = date1.getFullYear();
    // var month = date1.getMonth() + 1;
    // var date = date1.getDate();
    // var hour = date1.getHours();
    // var mm = date1.getMinutes(); 

    console.log("测试string:"+typeof e);
    
    //  根据自己需要通过判断timecha/1000的区间值来进行return赋值
    if( typeof e == 'string'){
      return e
    }
    else if(timecha/1000 <86400){
      console.log('时间为今天')
      return utill.formatD(new Date(e))
      // let  e =  
      // console.log(e)
    }
    else if(timecha/1000 >86400){
      console.log('时间为以前')
      return utill.formatM(new Date(e))
      // let e = 
    }
  },
  // 打开图片
  
  previewImg(event){
    var that = this;
    console.log(event)
    wx.previewImage({
      current: event.currentTarget.dataset.src,//当前显示图片的路径
      urls: that.data.action.contentsrc,
    })
  },

  onLoad: function (options) {
    console.log(options,"id")
    this.setData({
      openid:wx.getStorageSync('openid')
    })
    id=options.id
    console.log(id)
    this.getDetail()
  },
  // 获取点击事件用户的动态
  getDetail(){
    var that = this;
    wx.cloud.database().collection('friends').doc(id).get({
      success(res){
        console.log(res)
        let list =res.data
        list.time =  that.time(list.time);
        console.log(list.time,"listtime")
        that.setData({
          action:list
        })
        // console.log(that.data.action,"action")
        // console.log(that.data.action.speaklist,"kkkkk")
      }
    })
    wx.cloud.database().collection('speak').where({idt:id})
    .orderBy('time','asc').get({
      success(res){
        console.log(res,"kun")
        let talk=res.data
         for (var i=0 ;i < talk.length ; i++) {  
            talk[i].time =  that.time(talk[i].time);
            console.log(talk[i].time,"TALKTIME")
          }
        that.setData({
          speaklist:talk
        })
      }
    })
  },
 
  // 获取评论信息
  getInputValue(event){
    // speak=this.data.plcaceHolder + event.detail.value  
    speak=event.detail.value  
  },



  // 发送评论信息
  publishComment(){
    let that=this
    let nick=wx.getStorageSync('message')
      if(!wx.getStorageSync('message')){
        wx.showModal({
          title:"失败",
          content:"未登录",
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
        db.collection("speak").add({
            data:{
              idt:id,
              nick:nick.nick,
              openid:wx.getStorageSync('openid'),
              src:nick.avatarUrl,
              speak:speak,
              toReid:that.data.toReid,
              toNickname:that.data.toNickname,
              time: Date.now(),
            }
          }).then(res=>{
            that.setData({
              speak:'',
              isPubShow:false
            })
            that.getDetail() 
            wx.showToast({
              title:'已评论',
              icon:'none'
            })
          })
        db.collection("friends").doc(id).update({
          data:{
            speaklist:_.inc(1)
          }
        })
        .then(res=>{
          console.log("成功自增")
        })
        // if(!that.data.speaklist){
        //   let speaklist=[{
        //     nick:nick.nick,
        //     openid:wx.getStorageSync('openid'),
        //     src:nick.avatarUrl,
        //     speak:speak,
        //   }]
        //   db.collection("friends").doc(id).update({
        //     data:{
        //       speaklist:speaklist
        //     }
        //   })
          
        // }
        // else{
        //   let newspeaklist=that.data.action.speaklist
        //   newspeaklist.push({
        //     nick:nick.nick,
        //     openid:wx.getStorageSync('openid'),
        //     src:nick.avatarUrl,
        //     speak:speak,
        //   })
        //   console.log(newspeaklist)
        //   db.collection("friends").doc(id).update({
        //     data:{
        //       speaklist:newspeaklist
        //     }
        //   })
        //   .then(res=>{
        //     that.setData({
        //       speak:'',
        //       isPubShow:false
        //     })
        //     that.getDetail()
        //     wx.showToast({
        //       title:'已评论',
        //       icon:'none'
        //     })
        //   })
        // }
    }
  },


  //回复评论
  huifuComment(event){
      var index = event.currentTarget.dataset.index
      this.setData({
        plcaceHolder : '回复' + this.data.speaklist[index].nick+':',
        toNickname:this.data.speaklist[index].nick,
        toReid:1
      })
    if(this.data.isPubShow==false){
      console.log("xiangshi")
       this.setData({
        isPubShow:true,
        isFocus:true
      })
      console.log(this.data.isPubShow)
    }
     else{
      console.log(this.data.isPubShow)
      console.log("quxiao")
      this.setData({
        isPubShow:false,
        isFocus:false,
      })
     }
  },

  showPub(){
    // const query = wx.createSelectorQuery()
    // query.select('.pub-comment')
    // wx.createSelectorQuery().in(this).select
    // const pub=document.querySelector('.pub-comment')
    // const pub=query.in(this).select('.pub-comment')
    // const pub=query.select('.pub-comment')
    // console.log(pub.classList.add)
    // pub.style.bottom='0'
  //  const query=wx.createSelectorQuery().in(this).select('.pub-comment').boundingClientRect(function(rect){
  //     rect.bottom   
  //     rect.classList
  //     console.log(rect.bottom,"b")
  //     console.log(rect.classList,"l")
    
  //   }).exec()
    // console.log(query)
    // var that=this
    if(this.data.isPubShow==false){
      console.log("xiangshi")
       this.setData({
        isPubShow:true,
        plcaceHolder :'',
        toNickname:'',
        toReid:0,
        isFocus:true,
      })
      console.log(this.data.isPubShow)
    }
     else{
      console.log(this.data.isPubShow)
      console.log("quxiao")
      this.setData({
        isPubShow:false,
        plcaceHolder :'',
        toNickname:'',
        toReid:0,
        isFocus:false
      })
     }
    // console.log("llll")
  }

})