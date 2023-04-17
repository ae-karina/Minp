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
  
  
  
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
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
  