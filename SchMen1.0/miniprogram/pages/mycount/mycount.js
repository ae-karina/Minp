// pages/mycount/mycount.js
const db = wx.cloud.database();

Page({

    /**
     * 页面的初始数据
     */
    data: {
      nick: '', // 名称
      avatarUrl: '', //头像
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
      db.collection("user").where({
        _openid:wx.getStorageSync('openid')
      }).get().then((res) => {
          console.log(res.data, "data");
            this.setData({
              nick: res.data[0].nick,
              avatarUrl: res.data[0].avatarUrl
            });
           
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    changepro(){
      var that=this
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        camera: 'back',
        success(res) {
          console.log(res.tempFiles[0].tempFilePath)
          that.setData({
              avatarUrl: res.tempFiles[0].tempFilePath
            });
        }
      })
    },
     getInputValue(event){
      this.setData({
        nick:event.detail.value 
      })
    },
    phonecall(){
      wx.makePhoneCall({
        phoneNumber: '001-415-578-7342' //仅为示例，并非真实的电话号码
      })
    },

 async submit() {
  // console.log(e, "提交的用户信息");
    let time = Date.now();
    let up= await wx.cloud.uploadFile({
              cloudPath: "avatar.images/" + time, //文件名字
              filePath: this.data.avatarUrl, //文件
            });
    if (up) {
      console.log(up);
      this.setData({
        avatarUrl: up.fileID,
      });
      console.log(this.data.avatarUrl);
      db.collection('user').where({_openid:wx.getStorageSync('openid')}).update({
        data: {
          nick: this.data.nick,
          avatarUrl:this.data.avatarUrl
        },success:function (res) {
            console.log("更改成功"+res),
            wx.showToast({
              title: '更改成功！',
              duration: 1000
            })
          },
        fail: console.error
      }) 
    }
  },
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

    }
})