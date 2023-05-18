// pages/biji2/biji2.js
let tishi=''
Page({

    /**
     * 页面的初始数据
     */
    data: {
        lines:[],
        tishi:""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        tishi=options.tishi
        console.log(options,"ooo")
        var that = this;
        const db = wx.cloud.database()
        db.collection("createnote").where({
            tishi:tishi,
            _openid: wx.getStorageSync("openid")
        }).orderBy('ts','desc').get({
                success:function(res) {
                    console.log('获取成功！',res.data)
                    that.setData({
                        lines: res.data,
                        tishi:tishi
                    })
                }
            })    
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    onNewItem:function(e){
        wx.navigateTo({
            url: '../create/create'
          })
    },
    onEditItem:function(e){
        // console.log(e.currentTarget.dataset.nid)
        wx.navigateTo({
            url: '../edit/edit?edkey=' + e.currentTarget.dataset.nid
          })
    },


    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
      // this.onLoad()
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