var vm = new Vue({
  el: '#app',
  data: {
    url: 'https://api.kserve.cc/api/v1/activity',
    // url: 'http://127.0.0.1:18888/api/v1/activity',
    now: new Date(),
    interval: 3600 * 24 * 1000
  },
  methods: {
    constructHeader (r) {
      return {
        'x-rfm': r,
        'x-href': window.location.href,
        'x-lang': navigator.language || navigator.userLanguage || navigator.browserLanguage || navigator.systemLanguage || '',
        'x-cdep': window.screen.colorDepth || -1,
        'x-res': window.screen.width + ',' + window.screen.height,
        'x-ares': window.screen.availWidth + ',' + window.screen.availHeight,
        'x-tzos': new Date().getTimezoneOffset()
      }
    },
    checkRef () {
      console.log('nice to meet you!')
      let uri = window.location.search.substring(1);
      let params = new URLSearchParams(uri);
      if (params.get('r')) {
        if (window.localStorage) {
          window.localStorage.setItem('r', params.get('r'))
          window.localStorage.setItem('ex', this.now.getTime() + this.interval)
        }
        this.pushData(params.get('r'))
      } else {
        if (window.localStorage) {
           var r = window.localStorage.getItem('r') || 'null'
           var ex = window.localStorage.getItem('ex') || 0
           if (r !== 'null' && this.now.getTime() < ex) {
             this.pushData(r)
           }
        }
      }
    },
    pushData (r) {
      var headers = this.constructHeader(r)
      // console.log('Headers - ', headers)
      axios.get(this.url, {headers: headers})
      .then(response => {
        return
      }).catch(error => {
        var msg = 'Requset Fail, ' + 'error message - ' + String(error)
        console.log(msg)
      })
    }
  },
  mounted: function () {
    this.checkRef()
  }
})
