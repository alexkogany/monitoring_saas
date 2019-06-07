function writeEvent(local_idle_time){
    //console.log("call to sendmessage");    
    chrome.runtime.sendMessage({message: "perfdata"}, function(response) {
        //console.log("response loadeventstart : " + response.perfdata.loadEventStart);
        if(response.error){
            console.log(response.perfdata);    
            return;            
        }
        else{
           console.log(response);
        }
        //console.log(chrome.instanceID);
        var ips_local;
        getLocalIPs(function(ips) { // <!-- ips is an array of local IP addresses.
            console.log(ips.join('\n '));
            ips_local = ips;
            var userInfo;
            chrome.storage.local.get("userinfo" ,function(_userInfo) {
                //console.log('Value is set to ' + _userInfo.email);
                userInfo = _userInfo;
                console.log(userInfo);
                logl = new loggly();
                var obj2Log = {
                    'idle_time':local_idle_time,
                    'url':window.location.href,
                    'ip': ips_local,
                    'loadEventStart':(response.perfdata.loadEventStart === undefined)?"0":response.perfdata.loadEventStart,
                    'loadEventEnd':response.perfdata.loadEventEnd,
                    'connectStart':response.perfdata.connectStart,
                    'connectEnd':response.perfdata.connectEnd,
                    'requestStart':response.perfdata.requestStart,
                    'requestEnd':response.perfdata.requestEnd,
                    'responseStart':response.perfdata.responseStart,
                    'responseEnd':response.perfdata.responseEnd,
                    'domContentLoadedEventStart':response.perfdata.domContentLoadedEventStart,
                    'domContentLoadedEventEnd':response.perfdata.domContentLoadedEventEnd,
                    'email':userInfo.userinfo.email,
                    'pid':response.pid,
                    'siteusername':'dddddd'

                };
                logl.send2server(obj2Log);
            });
        });          

    });
}