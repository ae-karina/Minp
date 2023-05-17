// pages/my/my.js
const db = wx.cloud.database();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    judgedeng: false,
    nick: "", // 名称
    avatarUrl: "/images/my.png", //头像
  },

  onChooseAvatar(e) {
    console.log(e);
    const { avatarUrl } = e.detail;
    this.setData({
      avatarUrl,
    });
    console.log(e, "kk");
  },

  async getUserOpenId(e) {
    let getId = await wx.cloud.callFunction({ name: "openid" }); //云函数名
    if (getId) {
      wx.setStorageSync("openid", getId.result.openid); //将数据存储在本地缓存中指定的 key 中。会覆盖掉原来该 key 对应的内容
      console.log("唯一标识", getId.result.openid);

      let rescheck = await db
        .collection("user")
        .where({ _openid: wx.getStorageSync("openid") })
        .get();
      if (rescheck) {
        console.log(rescheck);
        if (rescheck.data.length == 0) {
          wx.showLoading({
            title: "登录中",
          });
          let time = Date.now();
          let ada = await wx.cloud.uploadFile({
            cloudPath: "avatar.images/" + time, //文件名字
            filePath: this.data.avatarUrl, //文件
          });
          if (ada) {
            console.log(ada);
            this.setData({
              avatarUrl: ada.fileID,
            });
            console.log(this.data.avatarUrl);
            let res = await db.collection("user").add({
              data: {
                nick: e.detail.value.nick,
                avatarUrl: this.data.avatarUrl,
              },
            });
            if (res) {
              this.setData({
                judgedeng: true,
              });
              this.onLoad();
              wx.hideLoading();
              wx.showToast({
                title: "登录成功",
                icon: "none",
              });
            }
          }
        } else {
          console.log("hello");
          wx.showLoading({
            title: "登录中",
          });
          let time = Date.now();
          let ada = await wx.cloud.uploadFile({
            cloudPath: "avatar.images/" + time, //文件名字
            filePath: this.data.avatarUrl, //文件
          });
          if (ada) {
            console.log(ada);
            this.setData({
              avatarUrl: ada.fileID,
            });
            // this.watchDatabaseChange();
            let res1 = await db
              .collection("user")
              .where({ _openid: wx.getStorageSync("openid") })
              .update({
                data: {
                  nick: e.detail.value.nick,
                  avatarUrl: this.data.avatarUrl,
                },
              });
            if (res1) {
              this.onLoad();
              wx.hideLoading();
              this.setData({
                judgedeng: true,
              });
              wx.showToast({
                title: "登录成功",
                icon: "none",
              });
            }
          }
        }
      }
    }
  },

  submit(e) {
    console.log(e, "提交的用户信息");
    // let that = this;
    if (e.detail.value.nick == "") {
      wx.showToast({
        title: "不能为空",
        icon: "none",
      });
    } else {
      wx.getUserProfile({
        desc: "用户完善个人信息", // 声明获取用户个人信息后的用途，后续会展示在弹窗中
        success: (res) => {
          console.log(res);
          console.log("个人信息", res.userInfo);
          this.getUserOpenId(e);
        },
      });
    }
  },

  // async onload() {
  //   let load = await wx.cloud
  //     .database()
  //     .collection("user")
  //     .where({
  //       _openid: wx.getStorageSync("openid"),
  //     })
  //     .get();
  //   if (load) {
  //     console.log(load);
  //     this.setData({
  //       nick: load.data[0].nick,
  //       avatarUrl: load.data[0].avatarUrl,
  //       judgedeng: true,
  //     });
  //     wx.setStorageSync("message", load.data[0]);
  //   }
  // },
  //渲染到页面
  onLoad: function (options) {
    // this.onload();
    var that = this;
    let nick = wx.getStorageSync("openid");
    if (nick) {
      that.setData({
        judgedeng: true,
      });
      wx.cloud
        .database()
        .collection("user")
        .where({
          _openid: nick,
        })
        .get()
        .then((res) => {
          console.log(res.data, "lll");
          console.log(res.data[0].avatarUrl, "lll");
          if (res.data.length != 0) {
            that.setData({
              nick: res.data[0].nick,
              avatarUrl: res.data[0].avatarUrl,
              judgedeng: true,
            });
            wx.setStorageSync("message", res.data[0]);
          }
        });
    }
  },

  // ...
  // 等到需要关闭监听的时候调用 close() 方法
  // watcher.close();

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},

  meidea() {
    wx.navigateTo({
      url: "/pages/xinfen/xinfen",
    });
  },

  shequ() {
    wx.navigateTo({
      url: "/pages/shequ/shequ",
    });
  },

  xuyao() {
    wx.navigateTo({
      url: "/pages/xuyao/xuyao",
    });
  },
  mycount() {
    wx.navigateTo({
      url: "/pages/mycount/mycount",
    });
  },
  logout() {
    this.setData({
      nick: "",
      avatarUrl: "/images/my.png",
      judgedeng: false,
    });
    wx.clearStorageSync();
  },

  //管理员进入
  // guan() {
  //   wx.cloud
  //     .database()
  //     .collection("guanli")
  //     .where({
  //       openid: wx.getStorageSync("openid"),
  //     })
  //     .get()
  //     .then((res) => {
  //       if (res.data.length != 0) {
  //         console.log("hao", res.data);
  //         this.setData({
  //           guanli: true,
  //         });
  //         wx.showToast({
  //           title: "欢迎管理者",
  //           icon: "none",
  //           success: function () {
  //             setTimeout(function () {
  //               wx.navigateTo({
  //                 url: "/pages/yonghu/yonghu",
  //               });
  //             }, 1000);
  //           },
  //         });
  //       } else {
  //         wx.showToast({
  //           title: "没有权限",
  //           icon: "error",
  //         });
  //       }
  //     });
  // },

  // wx.removeStorage({
  //   key: "openid",
  //   success(res) {
  //     console.log(res, "成功清除openid");
  //   },
  // });
  // wx.removeStorage({
  //   key: "message",
  //   success(res) {
  //     console.log(res, "成功清除openid");
  //   },
  // });
  // wx.removeStorage({
  //   key: "searchHistory",
  //   success(res) {
  //     console.log(res, "成功清除openid");
  //   },
  // });
});
