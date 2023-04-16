// pages/my/my.js
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
     
      judgedeng:false,
      nick:'',  // 名称
      avatarUrl:'/images/my.png',  //头像
     
  
       
       
    },
  

  

      onChooseAvatar(e) {
        const { avatarUrl } = e.detail 
        this.setData({
          avatarUrl
        })
        console.log(e,"kk")
      },

      submit(e){
         console.log()


      let that=this
      if(e.detail.value.nick==''){

        wx.showToast({
          title: '不能为空',
          icon:'none'
        })
      }else{

   
      
      wx.getUserProfile({
      desc:'用户完善个人信息',
      success:(res)=>{
  
      console.log("个人信息",res.userInfo)
      
      wx.cloud.callFunction({
        name:"openid",
      success(res){
          wx.setStorageSync('openid', res.result.openid)
          console.log("唯一标识",res.result.openid)
        }
      })

      wx.cloud.database().collection('user').where({
          _openid:wx.getStorageSync('openid')
      }).get()
      .then((res) => {
           console.log(res.data,"hhhh")


         if(res.data.length==0){
     wx.showLoading({
         title:'登录中'
         })
     
        
     db.collection("user").add({
      data:{
        
        nick:e.detail.value.nick,
        avatarUrl:that.data.avatarUrl,
       
      }
     }).then((res)=>{
       that.setData({
          judgedeng:true
       })
       this.onLoad()
         wx.hideLoading();
         wx.showToast({
         title:'登录成功',
         icon:'none',
        
         });
     })
         
         }else{
               
            db.collection("user").where({
                _openid:wx.getStorageSync('openid')
            }).update({
                data:{
                  
                  nick:e.detail.value.nick,
                  avatarUrl:that.data.avatarUrl,
                 
                }
               }).then((res)=>{ 
                 
               this.onLoad()
                that.setData({
                  judgedeng:true
               })
                   wx.showToast({
                   title:'登录成功',
                   icon:'none',
                  
                   });
               })

        
         }
  
      
      })
     

    
    
     
      
       }
      
      })
      
         }
      },
     

   
     
  //渲染到页面
      onLoad:function(options){
        
        var that=this
        let nick=wx.getStorageSync('openid')
        wx.cloud.database().collection('user').where({
            _openid:nick
        }).get()
        .then((res) => {
            console.log(res.data[0].avatarUrl,"lll")
           if(res.data.length!=0){
        that.setData({
        nick:res.data[0].nick,
        avatarUrl:res.data[0].avatarUrl,
        judgedeng:true,
  
        })
        wx.setStorageSync('message',res.data[0])
            
        }
      
        })
       
        
      
        }, 
       
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
  
    },
 
  
  
  
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
     
    },
    
  

 
 
   

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {
  
    },
  
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
  
    },
  
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {
     
    },
  
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () { 
     
    },
  
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {
  
    },
   
   
    //管理员进入
  guan(){
    wx.cloud.database().collection('guanli').where({
    openid:wx.getStorageSync('openid')
      }).get()
      .then(res=>{
  if(res.data.length!=0){
      console.log("hao",res.data)
      this.setData({
     guanli:true
      })
      wx.showToast({
        title:'欢迎管理者',
        icon:'none',
       
        success:function(){
          setTimeout(function(){
            wx.navigateTo({
              url: '/pages/yonghu/yonghu'
            })
          },1000);
        }
     
    
    })
    }else{
      wx.showToast({
        title: '没有权限',
        icon:'error'
      })
    }
   
      })
  
   },
 

    

   meidea(){

   
    wx.navigateTo({
        url: '/pages/xinfen/xinfen'
      })
 
   },
    
 

 shequ(){

   
    wx.navigateTo({
        url: '/pages/shequ/shequ'
      })
 
   },

   xuyao(){

   
    wx.navigateTo({
        url: '/pages/xuyao/xuyao'
      })
 
   },


  })