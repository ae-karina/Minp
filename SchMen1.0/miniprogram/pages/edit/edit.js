// pages/edit/edit.js
import utill from '../utils/utill'

// var utill=require('../utills/utilll.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    edlist:{},
    images:[],

    index:0,
    array: ['旅游','个人','生活','工作'],
  },

  update:function(e){
    var that=this
    var key = that.data.edlist._id
    const db = wx.cloud.database()
    db.collection('createnote').doc(key).update({
      data:{
        title:e.detail.value.title,
        content:e.detail.value.content,
        cTime:utill.formatDay(new Date()),
        ts:(new Date()).valueOf(),
        img:that.data.images,
        tishi:that.data.inputbiaoqian
      },
      success: function(res) {
        // console.log(res.data)
        // that.setData({
        //   edlist: res.data
        // }),
        wx.showToast({
          title: '保存成功！',
          duration: 3000
        })
      },
      fail: console.error
    })
  },

  delete:function(e){
    var key = this.data.edlist._id
     wx.showModal({
        title: '提示',
        content: '确定要删除吗？',
        success: function (sm) {
          if (sm.confirm) {
            const db = wx.cloud.database()
            db.collection('createnote').doc(key).remove()
            wx.showToast({
              title:'删除成功',
              icon:'none',
              duration:10000,
              success:function(){
                setTimeout(function(){
                  wx.switchTab({
                    url: '/pages/biji/biji',
                  })
                },1000);
              }
            })
          } else if (sm.cancel) {
              console.log('用户点击取消')
            }
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const edkey = options.edkey;
    const that = this
    const db = wx.cloud.database()
    db.collection('createnote').doc(edkey).get({  //接受一个 id 参数，指定需引用的记录的 _id
      success: function (res) {
        that.setData({
          edlist: res.data,
          images:res.data.img,
          index:that.data.array.indexOf(res.data.tishi)
        })
      }
    })
  },

  bindPickerChange: function(e) {
      this.setData({
        index: e.detail.value,
        inputbiaoqian:this.data.array[e.detail.value]
      })
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