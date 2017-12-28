// pages/mensestart/mensestart.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array1:['提前1天'],
    array2:['20时'],
    array3:['00分'],
    ay1:'提前1天',
    ay2:'20时',
    ay3:'00分',
    showPi:false,
    datase:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
//12:00:00
    wx.setNavigationBarTitle({
      title: '经期开始提醒'
    })
    this.saveFormIds();
    if (options){
      var ar = options.time.split(':');
     
      var two = ar[0] < 10 ? ar[0].substring(1) : ar[0];
      var three = ar[1] < 10 ? ar[1].substring(1) : ar[1];
      this.setData({
        ay1: '提前' + options.d+'天',
        ay2: ar[0]+'时',
        ay3: ar[1] + '分',
        picker_val: [options.d - 1, two,three]
      });

    }
      var array1=[];
      var array2 = [];
      var array3 = [];
      for(var i=1;i<=7;i++){
        var day='提前'+i+'天';
        array1.push(day);
      }
      for (var i = 0; i <= 23; i++) {
        i=i<10?'0'+i:i;
        var hour = i + '时';
        array2.push(hour);
      }
      for (var i = 0; i <= 59; i++) {
        i = i < 10 ? '0' + i : i;
        var fen = i + '分';
        array3.push(fen);
      }
      this.setData({
        array1,
        array2,
        array3,
        showPi:true
      });
      
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
    this.saveFormIds();
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
  onShareAppMessage: function (res) {

    return {
      title: '最简单、好用的贴心小管家',
      path: 'pages/main/main',
      imageUrl: '../../images/share2.png',
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  },

  requestA(type, d, time, valn, valswitch){
    var ticket = wx.getStorageSync('ticket');
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/updateRemindTm.php',
      data: {
        type: type,
        d:d,
        time:time,
        valn:valn,
        valswitch: valswitch,
        ticket_ym:ticket

      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function(res) {

      },
      fail: function(res) {},
      complete: function(res) {},
    })
  },
  piclikc: function (e) {
    this.setData({
      showPi: true,
    });
  },
  piChange: function (e) {
    console.log(e.detail.value);
    
    const val = e.detail.value
    this.setData({
      ac1: val[0],
      ac2: val[1],
      ac3: val[2],
      datase:true,
      picker_val: e.detail.value
    })
  },
  tapPiBtn(e) {
    const type = e.currentTarget.dataset.type;

    var that=this;
    if (type === 'confirm') {
      // console.log(this.data.picker_val[0]);
      // console.log(this.data.arraya.length-1);
      if (this.data.datase==true){
        this.setData({
          ay1: this.data.array1[this.data.ac1],
          ay2: this.data.array2[this.data.ac2],
          ay3: this.data.array3[this.data.ac3]
        })

        console.log(this.data.array1[this.data.ac1]);
        var d = this.data.array1[this.data.ac1];
        var time = this.data.array2[this.data.ac2].match(/\d+/g)[0] + ':' + this.data.array3[this.data.ac3].match(/\d+/g)[0];

        that.requestA('menses_start', d.match(/\d+/g)[0], time, 0, 0);
      }else{
        this.setData({
          ay1: this.data.ay1,
          ay2: this.data.ay2,
          ay3: this.data.ay3 
        })
        that.requestA('menses_start', this.data.ay1, this.data.ay2+':'+this.data.ay3, 0, 0);
      }
        
    }

    this.setData({
      showPi: false
    });
  },
  set(){
    this.setData({
      showPi: true
    });
  },
  formSubmit: function (e) {
    let formId = e.detail.formId;
    this.dealFormIds(formId); //处理保存推送码
    let type = e.detail.target.dataset.type;
    //根据type的值来执行相应的点击事件
    //...
    console.log(formId);
  },
  dealFormIds: function (formId) {
    let formIds = app.globalData.gloabalFomIds;//获取全局数据中的推送码gloabalFomIds数组
    if (!formIds) formIds = [];
    let data = {
      formId: formId,
      expire: parseInt(new Date().getTime() / 1000) + 604800 //计算7天后的过期时间时间戳
    }
    formIds.push(data);//将data添加到数组的末尾
    app.globalData.gloabalFomIds = formIds; //保存推送码并赋值给全局变量
    console.log(app.globalData.gloabalFomIds);
  },
  saveFormIds: function () {
    var formIds = app.globalData.gloabalFomIds; // 获取gloabalFomIds
    var ticket = wx.getStorageSync('ticket');
    console.log(formIds);
    if (formIds.length) {
      formIds = JSON.stringify(formIds);
      app.globalData.gloabalFomIds = '';
      wx.request({//通过网络请求发送openId和formIds到服务器
        url: 'https://www.mizhi.com/minapp/yima/addFormId.php',
        method: 'GET',
        data: {
          ticket_ym: ticket,
          formId: formIds
        },
        success: function (res) {
        }
      });
    }

  }
})