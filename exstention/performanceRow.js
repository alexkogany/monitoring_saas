class performanceRow {
    // class methods
    constructor(data,url = '') {  
        this.localdata = data;        
        console.table(data);
        if(url!==''){
           
            const localurl = new URL(url);
            const domain = localurl.hostname;
            this._domain = domain;
            this._url = encodeURI(url);            
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


    set userExternalIP(ip) { 
        this._externalIP =  ip;
    };

    get userExternalIP() { 
        return this._externalIP ;
    };



    set userIP(ip) { 
        this._ip =  ip;
    };

    get userIP() { 
        return this._ip ;
    };


    set cUserEmail(cEmail) { 
        this._cEmail =  cEmail;
    };

    get cUserEmail() { 
        return this._cEmail ;
    };

    set cUserName(cUserName) { 
        this._cUserName =  cUserName;
    };

    get cUserName() { 
        return this._cUserName;
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


    toJSON = function() {
        try {
            return {
                connectStart: this.localdata.connectStart,
                connectEnd:this.localdata.connectEnd,
                requestStart:this.localdata.requestStart,
                requestEnd:0,
                responseStart:this.localdata.responseStart,
                responseEnd:this.localdata.responseEnd,
                domContentLoadedEventStart:this.localdata.domContentLoadedEventStart,
                domContentLoadedEventEnd:this.localdata.domContentLoadedEventEnd,
                loadEventStart:this.localdata.loadEventStart,
                loadEventEnd:this.localdata.loadEventEnd,
                loadEventEnd:this.localdata.loadEventEnd,
                PageLoadTime:this.localdata.duration,
                userExternalIP:this._externalIP,
                userIP:this._ip,
                Hashcode:this._hashcode,
                URL:this._url,
                domain:this._domain,
                susername:this.username,
                cUserName:this._cUserName,
                cEmail:this._cEmail,
            };
        } catch (error) {
            console.error(error);
        }
        
    }
}