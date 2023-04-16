// pages/edit/edit.js
var util=require('../utils/utill.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edcontent:{},
    title:"",
    content:"",
    images:[],

   
    array: ['旅游','个人','生活','工作'],
  },
  title:function(e){
    console.log(e.detail.value)
    this.setData({
      title: e.detail.value
    })
    },
    content: function (e) {
      console.log(e.detail.value)
      this.setData({
        content: e.detail.value
      })
    },
  update:function(e){
    var that=this
    var key = this.data.edcontent._id
    var cTime=util.formatDay(new Date())
    const db = wx.cloud.database()
    db.collection('createnote').doc(key).update({
      data: {
        title:that.data.title,
        content:that.data.content,
        cTime:cTime,
        img:that.data.images,
        tishi:that.data.inputbiaoqian
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          edcontent: res.data
        }),
        wx.showToast({
          title: '保存成功！',
          duration: 3000
        })
      },
      fail: console.error
    })

  },
  delete:function(e){
    var key = this.data.edcontent._id
    const db = wx.cloud.database()
    db.collection('createnote').doc(key).remove({
      success: function(res) {
        console.log(res.data)
      }
    })
   wx.switchTab({
     url: '/pages/biji/biji',
   })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    var that = this
    var edkey = options.edkey;
    const db = wx.cloud.database()
    db.collection('createnote').doc(edkey).get({
      success: function (res) {
        console.log(res.data.tishi)
        that.setData({
          edcontent: res.data,
          images:res.data.img,
         tishi:res.data.tishi
        })
        
      }
    })
  },

  bindPickerChange: function(e) {
    
    console.log(e.detail)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (e.detail.value==0) {
      this.setData({
        index: e.detail.value,
        inputbiaoqian:this.data.array[0]

      })
    }else{
      this.setData({
        index: e.detail.value,
        inputbiaoqian:this.data.array[e.detail.value]
      })
    }
      
      console.log(this.data.inputbiaoqian)
  },
 
     
  //上传到云存储
  upimages(){
    let that=this
    wx.showActionSheet({
    itemList:['上传图片'],
    success(res){
     
  
  
    console.log(res.tapIndex)
    if(res.tapIndex==0){
    wx.chooseImage({
    count:9,
    sizeType:['original'],
    sourceType:['album','camera'],
    success(res){
      wx.showLoading({
        title:'上传中',
        })
    console.log(res.tempFilePaths)
    let time=Date.now()
    for(var i=0;i<res.tempFilePaths.length;i++){
    wx.cloud.uploadFile({
    cloudPath:"friends.images/"+time+i,//文件名字
    filePath:res.tempFilePaths[i] //文件
    
    })
    .then(res=>{
    that.setData({
    images:that.data.images.concat(res.fileID)
    })
    wx.hideLoading()
  wx.showToast({
  title:'成功添加',
  icon:'none'
  })
    })
    }
    }
    })
    }
   
    }
  })
    },
  
    //删除图片
    deleteimage(e){
      console.log(e)
      let that=this
      let dele=e.currentTarget.dataset.src
      let images=that.data.images
      for(var i=0;i<images.length;i++){
      if(images[i]==dele){
      images.splice(i,1)
      that.setData({
      images:images
      })
      }
      }
      },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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

  }
})