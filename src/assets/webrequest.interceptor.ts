export class WebRequestInterceptor {
  mockResponseArray: any = {
    '/contacts': 'assets/contacts.json'
  };


  constructor() {
    const func = (XHR: any): any => {
      const that = this;
      let senderUrl: string;
      const open = XHR.prototype.open;
      XHR.prototype.open = function(method: string, url: string, async: boolean, user: string, pass: string): void {
        senderUrl = url;
        const response = that.mockResponse(senderUrl);
        if (response && that.islocalHost()) {
          open.call(this, 'GET', response, true, user, pass);
        } else {
          open.apply(this, arguments);
        }
      };
    };
    func.apply(null, [XMLHttpRequest]);
  }

  mockResponse(url: string): string {
    for (const key in this.mockResponseArray) {
      if (url.indexOf(key) !== -1) {
        return this.mockResponseArray[key];
      }
    }
  }

  islocalHost(): boolean {
    return window.location.hostname === 'localhost';
  }

}
