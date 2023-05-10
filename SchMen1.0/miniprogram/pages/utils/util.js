const formatTime = (date, hasTime) => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
  
    let result = [year, month, day].map(formatNumber).join('-')
    if (hasTime) {
      result = result + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }
    return result
  }
  
  // utils文件夹: 存放全局的一些.js文件,公共用到的一些事件处理代码文件可以放到该文件夹下,用于全局调用
  
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n //处理月份和天的日期字符串，就是个位数前面加0的截取处理，或者两位数的截取处理
  }
  
  const uuid = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  }
  
  
  function getColor() {
    var str = '#';
    var arr = ['1', '2', '3', '4', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    for (var i = 0; i < 6; i++) {
       var num = parseInt(Math.random() * 16);
       str += arr[num];
    }
    return str;
  }
  
  module.exports = {
    formatTime: formatTime,
  
    uuid: uuid
  }
  