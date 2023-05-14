const db = wx.cloud.database()


Component({
  // 设置组件样式间隔为apply-shared
  options: {
    styleIsolation: 'apply-shared'
  },
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    isFocus:false,
    historyList:[],
    searchList:[],
    value:''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleFocus(){
      wx.getStorage({
        key:"searchHistory",
        success:(res)=> {
          this.setData({
            historyList:res.data
          });
          // console.log(res.data,"ll")
        }
      })
      this.setData({
        isFocus:true
      });
    },
    handleCancel(value){
      this.setData({
        isFocus:false,
      });
    },
    handleConfirm(ev){
      console.log(ev.detail.value);
      let value=ev.detail.value;
      let cloneHistoryList=[...this.data.historyList];//数组转为用逗号分隔的参数序列，并拷贝，浅拷贝
      cloneHistoryList.unshift(value);//在最前一位加 
      wx.setStorage({
        key:"searchHistory",
        data:[...new Set(cloneHistoryList)] //数组去重
      });
      this.changeSearchList(value);
    },     
    handleHistoryDelete(){
      wx.removeStorage({
        key:'searchHistory',
        success:(res)=>{
          console.log(res)
          this.setData({
            historyList :[]
          });
        }
      })
    },
    changeSearchList(value){
      db.collection('createnote').where({
        title:db.RegExp({//正则表达
          regexp: value,
          options: 'i'//大小写不敏感
        })
      }).field({  //用于指定需返回的字段
          title:true,
          content:true,
          img:true
        }).get().then((res)=>{
          console.log(res.data,"kk")
            this.setData({
              searchList : res.data,
              value:''
            });
          });
    },

    handleHistoryItemDel(ev){
      let value=ev.target.dataset.text;
      this.changeSearchList(value);
    }
  },
})
      
