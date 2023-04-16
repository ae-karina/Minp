// pages/demo04/demo04.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0
  },
  //输入框的input时间的执行逻辑
  handleInput(e){
    //console.log(e.detail.value);
    this.setData({
      num:e.detail.value
  })
  },
  //加减按钮的事件
  handletap(e){
    //console.log(e);
    //1 获取自定义属性 operation
    const operation=e.currentTarget.dataset.operation;
    this.setData({
      num:this.data.num + operation
  })
  }
})