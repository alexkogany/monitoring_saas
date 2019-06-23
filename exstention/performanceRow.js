class performanceRow {
    // class methods
    constructor(data,uuid ='',url = '') {  
        this.localdata = data;        
        this._requestid = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36);
        if(url!==''){
           
            const localurl = new URL(url);
            const domain = localurl.hostname;
            this._domain = domain;
            this._url = encodeURI(url);            
            this._hashcode =this.hashcode(url);

        }

        if(uuid!=='')
            this._uuid = uuid;
        else
            chrome.storage.local.get('uuid', function (result) {
                this._uuid = result.uuid;
                //console.log("uuid->" + this._uuid);
            });
    }
    

    set domain(domain) { 
        this._domain = domain; 
    };

    get domain() { 
        return this._domain;
    };


    get requestid() { 
        return this._requestid;
    };


    set fullurl(url) { 
        this._url = url ;
        this._hashcode =this.hashcode(url);
        const localurl = new URL(url);
        this._domain = localurl.hostname;
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

    set uuid(uuid) { 
        this._uuid =  uuid;
    };

    get uuid() { 
        return this._uuid;
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
                Domain:this._domain,
                sUserName:this.localdata.username,
                cUserName:this._cUserName,
                cEmail:this._cEmail,
                uuid:this._uuid,
                requestid:this._requestid,
            };
        } catch (error) {
            console.error(error);
        }
        
    }
}