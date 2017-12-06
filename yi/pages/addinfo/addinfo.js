// pages/addinfo/addinfo.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: [],
    index:0,
    arraynum: [],
    indexnum: 0,
    jarray: [],
    jnum: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let Dat=new Date();
     let ayy=[];
     let nowd = Dat.getTime() - (44 * 24 * 3600 * 1000);
     for(let i=0;i<=44;i++){
       let gDate = new Date(parseInt(nowd) + i  * 24 * 3600 * 1000);
       let gd = add((gDate.getMonth() + 1)) + '月' + add(gDate.getDate()) + '日';
       ayy.push(gd);
     }

     let anum=[];
     for(let i=20;i<=45;i++){
        anum.push(i);
     }
     let bnum = [];
     for (let i = 2; i <= 7; i++) {
       bnum.push(i);
     }
     console.log(anum);
     function add(n){
       return n < 10 ? '0' + n : '' + n;
     }
    this.setData({
      array: ayy,
      index:44,
      arraynum: anum,
      indexnum: 0,
      jarray: bnum,
      jnum: 0
    });
  },

  bindNumChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      indexnum: e.detail.value
    })
  },
  bindJiChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      jnum: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  nextto:function(){

    wx.navigateTo({
      url: '../main/main'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})