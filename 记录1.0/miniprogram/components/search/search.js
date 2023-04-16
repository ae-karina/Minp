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
      let cloneHistoryList=[...this.data.historyList];
      cloneHistoryList.unshift(value);
      wx.setStorage({
      key:"searchHistory",
      data:[...new Set(cloneHistoryList)]
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
        
         title:db.RegExp({
            regexp: value,
            options: 'i'
      })
      }).field({
       title:true,
       content:true,
        img:true
      }).get().then((res)=>{

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
      
