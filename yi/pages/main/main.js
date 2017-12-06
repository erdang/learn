var app = getApp();
Page({
  data: {
    winHeight: "",//窗口高度
    currentTab: 1, //预设当前项的值
    timeicon:'../../images/time.png',
    seticon: '../../images/set.png',
    infos: []

  },
  // 滚动切换标签样式
  switchTab: function (e) {
    this.setData({
      currentTab: e.detail.current
    });
  },
  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  
  onLoad: function () {
    var that = this;
    // 高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 98;
        console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });


    let info = [];
    let list = [
      {
        day: '2017-11-01',
        period: 1,

      }

    ];
    for (var i = 0; i < 28; i++) {
      if (i < 5) {
        info.push({
          id: i,
          reg: 360 / 28 * i,
          class: 'fo red',
          delay: i / 10
        })
      } else {
        info.push(
          {
            id: i,
            reg: 360 / 28 * i,
            class: ''
          }
        );
      }

    }

    this.setData({
      infos: info
    });

  }
})