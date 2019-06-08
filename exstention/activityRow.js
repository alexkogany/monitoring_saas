class activityRow {
    // class methods
    constructor(key,url = '') {  
        this._key = key;

        if(url!==''){
            var d = new Date();
            const localurl = new URL(url);
            const domain = localurl.hostname;
            this._domain = domain;
            this._url = encodeURI(url);
            this._startactivetime = Math.round(d.getTime() / 1000);
            this._hashcode =this.hashcode(url);
        }

    }
    

    set domain(domain) { 
        this._domain = domain; 
    };

    get domain() { 
        return this._domain;
    };


    set fullurl(url) { 
        this._url = url ;
        this._hashcode =this.hashcode(url);
    };

    get fullurl() { 
        return this._url ;
    };
    

    set key(tabid) { 
        this._key = tabId;
    };

    get key() { 
        return this._key;
    };
    
    set startactivetime(startactivetime) { 
        this._startactivetime = startactivetime;
    };

    get startactivetime() { 
        return this._startactivetime;
    };

    set endactivetime(endactivetime) { 
        this._endactivetime = endactivetime;
    };

    get endactivetime() { 
        return this._endactivetime ;
    };

    
    get hashC() { 
        return this._hashcode ;
    };


    hashcode = function(s){
        return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);              
    };


    validURL =  function(str){
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
    }

    toJSON() {
        // console.log("=======================================================")
        // return Object.getOwnPropertyNames(this).reduce((a, b) => {
        //   console.log(a);
        //   console.log(b);
        //   a[b] = this[b];
        //   console.log("=======================================================")
        //   return a;

        // }, {});
        return {
            domain: this._domain,
            url:this._url,
            startactivetime:this._startactivetime,
            endactivetime:this._endactivetime,
            hashcode:this._hashcode
        };
      }

}