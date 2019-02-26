const app = getApp();
const rows = 25;

Page({
  data: {
    scrollindex: 0,  //当前页面的索引值
    totalnum: 8,  //总共页面数
    starty: 0,  //开始的位置x
    endy: 0, //结束的位置y
    critical: 80, //触发翻页的临界值

    page: 1,
    list:[],

    more: false,
    showComment:false,
  },
  close() {
    this.setData({
      showComment:false
    })
  },
  open() {
    this.setData({
      showComment:true
    })
  },
  more() {
    this.setData({
      more: !this.data.more
    })
  },
  scrollTouchstart (e) {
    let py = e.touches[0].pageY;
    console.log(py);
    this.setData({
      starty: py
    })
  },
  scrollTouchend (e) {
    let py = e.changedTouches[0].pageY;
    let d = this.data;
    this.setData({
      endy: py,
    })
    console.log(e.changedTouches[0].pageY, d.starty);
    if (py - d.starty > d.critical && d.scrollindex > 0) { // 上拉
      this.setData({
        scrollindex: d.scrollindex - 1,
        more: false
      })
    } else if (py - d.starty < -(d.critical) && d.scrollindex < this.data.totalnum - 1) { // 下拉
      this.setData({
        scrollindex: d.scrollindex + 1,
        more: false
      })
    }
    this.setData({
      starty: 0,
      endy: 0
    })
  },
  loadPageData () {
    let that = this;
    app.globalData.tool.http('/api_wx/api/get_clip.php?vod_id=1&user_id=1&page='+ that.data.page +'&rows=' + rows, 'GET', {}, data => {
      if (data.code === 1) {
        that.setData({
          list: data.data
        });
      } else {
        wx.showModal({
          content: 'get_clip接口异常',
          showCancel: false
        })
      }
    });
  },
  onLoad () {
    let that = this;
    that.loadPageData();
  },
});