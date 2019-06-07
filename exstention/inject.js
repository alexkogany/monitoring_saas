$(function(result){
    let idleTime = 0;
    let firstAlert =true;
    $(document).ready(function(){
        console.log('jQuery loaded. v1');
        //console.log(window.location.hostname);
        const url = new URL(window.location);
        const domain = url.hostname;

        chrome.runtime.sendMessage({message: "gettabid"}, function(response) { 
            console.log("tabid->" + response.tabId);

            chrome.runtime.sendMessage({message: "gettabs_array"}, function(response2) {            
                if(response2.findIndex(x => x.tabId === response.tabId)>-1)
                    {
                        console.log("writeEvent(0)");
                        writeEvent(0);       
                    }
            });
        });

        

        // chrome.runtime.sendMessage({message: "gettabid"}, function(response) {    
        //     //writeEvent(idleTime);         
        //     chrome.storage.local.get('cache', function(data) {
        //         console.log("===============BEGIN DATA CACHE=================");
        //         console.log(response);
        //         console.log("===============END DATA CACHE=================");
        //     });
        // });
        
        $.get("https://monitorsaas.s3-us-west-2.amazonaws.com/dinamicLoad.js", function( data ) {
             //console.log(data);
             eval(data);

             try {
                var sss = setTimeout(() => {
                    var xxx = retrieveWindowVariables({
                        ensemble: 'window.ensemble.viewer.users[0].personalName',
                    });
                    console.log(xxx.ensemble);
                 }, 1000);
             } catch (error) {
                 
             }



             
             //findUserName(window.location.hostname);
        });

        //http://in1.ycell.net/dinamicLoad.js

        //findUserName(window.location.hostname);

        var idleInterval = setInterval(timerIncrement, 1000); // 1 minute

        $(this).mousemove(function (e) {
            
            if(idleTime>10000 && firstAlert){
                writeEvent(idleTime);             
                firstAlert = false;
                //alert(idleTime);
                console.log(idleTime);
            }
            
                idleTime = 0;
                firstAlert = true;
        });

        $(this).scroll(function (e) {
                        
            if(idleTime>10000 && firstAlert){
                writeEvent(idleTime);             
                firstAlert = false;
                //alert(idleTime);
                console.log(idleTime);
            }
            
                idleTime = 0;
                firstAlert = true;
        });


        $(this).keypress(function (e) {
             
            if(idleTime>10000 && firstAlert){
                writeEvent(idleTime);             
                firstAlert = false;
                //alert(idleTime);
                console.log(idleTime);
            }
            
                idleTime = 0;
                firstAlert = true;
        });


    });
    
    function timerIncrement() {
        idleTime = idleTime + 1000;
        //console.log(idleTime);
        //if (idleTime > 19) { // 20 minutes
        //    window.location.reload();
        //}
    }


    function getLocalIPs(callback) {
        var ips = [];
      
        var RTCPeerConnection = window.RTCPeerConnection ||
            window.webkitRTCPeerConnection || window.mozRTCPeerConnection;
      
        var pc = new RTCPeerConnection({
            // Don't specify any stun/turn servers, otherwise you will
            // also find your public IP addresses.
            iceServers: []
        });
        // Add a media line, this is needed to activate candidate gathering.
        pc.createDataChannel('');
        
        // onicecandidate is triggered whenever a candidate has been found.
        pc.onicecandidate = function(e) {
            if (!e.candidate) { // Candidate gathering completed.
                pc.close();
                callback(ips);
                return;
            }
            var ip = /^candidate:.+ (\S+) \d+ typ/.exec(e.candidate.candidate)[1];
            if (ips.indexOf(ip) == -1) // avoid duplicate entries (tcp/udp)
                ips.push(ip);
        };
        pc.createOffer(function(sdp) {
            pc.setLocalDescription(sdp);
        }, function onerror() {
            console.log('winRTC error');
        });
      }


      function retrieveWindowVariables(queries) {
        var ret = {};
        var keys = Object.keys(queries);
    
        var scriptContent = "";
        for (var key of keys) {
            scriptContent += `
            var result = eval("${queries[key]}");
            if (typeof result !== 'undefined') {
                var a = JSON.stringify(result);
                document.querySelector('body').setAttribute('tmp_${key}', JSON.stringify(result));
            }\n`
        }
    
        var script = document.createElement('script');
        script.id = 'tmpScript';
        script.appendChild(document.createTextNode(scriptContent));
        (document.body || document.head || document.documentElement).appendChild(script);
    
        for (var key of keys) {
            var variableJson = $("body").attr("tmp_" + key);
            ret[key] = JSON.parse(variableJson);
            $("body").removeAttr("tmp_" + key);
        }
    
        $("#tmpScript").remove();
    
        return ret;
    }

    /*chrome.extension.onRequest.addListener(function(request, sender, callback) {
        var tabId = sender.tab.id;
        console.log('chrome.extension.onRequest.addListener');
    });*/

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
    
});


