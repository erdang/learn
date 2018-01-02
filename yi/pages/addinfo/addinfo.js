// pages/addinfo/addinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    showB1: false,//pickerview 显示
    showB2: false,//pickerview 显示
    showB3: false,//pickerview 显示
    picker_a: [10],
    picker_a2: [44],
    picker_a3: [5],
    daynum: 10,
    daynum2: 44,
    daynum3: 5,
    showMan: false,
    showMan2: false
  },
  onShow(){
    this.saveFormIds();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
   
    wx.setNavigationBarTitle({
      title: '完善信息'
    })
    this.saveFormIds();
     let Dat=new Date();
     let ayy=[];
     let yeab=[];
     let nowd = Dat.getTime() - (44 * 24 * 3600 * 1000);
     for(let i=0;i<=44;i++){
       let gDate = new Date(parseInt(nowd) + i  * 24 * 3600 * 1000);
       let gd = add((gDate.getMonth() + 1)) + '月' + add(gDate.getDate()) + '日';
     
       let yea = gDate.getFullYear();
       yeab.push(yea);
       ayy.push(gd);
     }
     let listobj={
       comeday:'',
       cycle: '',
       menses: ''
     };
     //wx.clearStorage();
     

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
      jnum: 0,
      yeab:yeab
    });
  },

  pitap: function (e) {
    this.setData({
      showB1: true,
      showB2: false,
      showB3: false
    });
  },
  pitap2: function (e) {
    this.setData({
      showB1: false,
      showB2: true,
      showB3: false
    });
  },
  pitap3: function (e) {
    this.setData({
      showB1: false,
      showB2: false,
      showB3: true
    });
  },
  piGet: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_a: e.detail.value
    })
  },
  piGet2: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_a2: e.detail.value
    })
  },
  piGet3: function (e) {
    console.log(e.detail.value);

    this.setData({
      picker_a3: e.detail.value
    })
  },
  tapcBtn(e) {
    const type = e.currentTarget.dataset.type;


    if (type === 'confirm') {
      // console.log(this.data.picker_a[0]);
      // console.log(this.data.arraya.length-1);
      var daynum = 0;
      daynum = this.data.picker_a;
    }

    this.setData({
      daynum: daynum,
      showB1: false
    });
  },
  tapcBtn2(e) {
    const type = e.currentTarget.dataset.type;


    if (type === 'confirm') {
      // console.log(this.data.picker_a[0]);
      // console.log(this.data.arraya.length-1);
      var daynum2 = 0;
      daynum2 = this.data.picker_a2;
    }

    this.setData({
      daynum2: daynum2,
      showB2: false
    });
  },
  tapcBtn3(e) {
    const type = e.currentTarget.dataset.type;


    if (type === 'confirm') {
      // console.log(this.data.picker_a[0]);
      // console.log(this.data.arraya.length-1);
      var daynum3 = 0;
      daynum3 = this.data.picker_a3;
    }

    this.setData({
      daynum3: daynum3,
      showB3: false
    });
  },
  nextto:function(){
    let Dat = new Date();
    let year = this.data.yeab[this.data.daynum2];
    let montth = this.data.array[this.data.daynum2].substring(0, 2);
    let day = this.data.array[this.data.daynum2].substring(3, 5);
  
    wx.setStorage({
      key: "lista",
      data: {
        listb: year + '-' + montth + '-' + day,
        listc: this.data.arraynum[this.data.daynum],
        listd: this.data.jarray[this.data.daynum3],
        liste:''
      }
    })
    var ticket = wx.getStorageSync('ticket');
    
    this.requestD(this.data.arraynum[this.data.daynum], this.data.jarray[this.data.daynum3], year + '-' + montth + '-' + day, ticket,'');
    
    wx.navigateTo({
      url: '../main/main'
    })
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
  requestD(cycle, menses, come_day, ticket,goday) {
    var that = this;
    wx.request({
      url: 'https://www.mizhi.com/minapp/yima/setParam.php',
      data: {
        cycle: cycle,
        menses: menses,
        come_day: come_day,
        ticket_ym: ticket,
        go_day:goday
      },
      header: {},
      method: 'GET',
      dataType: 'json',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
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
    if (formIds.length) {//gloabalFomIds存在的情况下 将数组转换为JSON字符串
      formIds = JSON.stringify(formIds);
      app.globalData.gloabalFomIds = '';
    }
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
  },
  tapyes() {
    var that = this;
    console.log(this.data.wobj);
    this.bindN(this.data.wobj.ticket, this.data.wobj.nickName, this.data.wobj.avatarUrl);
    this.setData({
      showMan: true,
      showMan2: false
    });

  },
  taperror() {
    console.log(111);
    wx.navigateBack({
      delta: 1
    })
  }
  
})