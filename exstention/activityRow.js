class activityRow {
    // class methods
    constructor(key,uuid='',url = '') {  
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
        if(uuid===''){
            chrome.storage.local.get('uuid', function (result) {
                this._uuid = result.uuid;
                //console.log("uuid->" + this._uuid);
            });
        }
        else{
            this._uuid = uuid;
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

    set uuid(uuid) { 
        this._uuid =  uuid;
    };

    get uuid() { 
        return this._uuid;
    };
    
    set username(username) { 
        this._username =  username;
    };

    get username() { 
        return this._username;
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
        return {
            domain: this._domain,
            sRealURL:this._url,
            sStartTime:this._startactivetime,
            sEndTime:this._endactivetime,
            uuid:this._uuid,
            sUserName:this._username,
            Hashcode:this._hashcode
        };
      }

}