// Setting a toolbar badge text
var tabList = [];
var tabPerformanceData = [];
let lastActiveTabID = 0;
let remoteAPIURL = "http://127.0.0.1:2017/public/";

let localIP = "";
let remoteIP = "";
let cUserName ;
let cUserEmail;
let uuid;
//let emitter = new EventEmitter();
// getLocalIPs(function(ips) {


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    
    if (request.message === "gettabid"){ 
      sendResponse({"tabid":sender.tab.id});
    }
    else if (request.message === "gettabs_array"){ 
      sendResponse(tabList);
    }
    else if (request.message === "perfdata")
    {
      chrome.storage.local.get('cache', function(data) {
      
        var currentTabID = 'tab' + sender.tab.id;
        //console.log('tab' + sender.tab.id); 
        let pid;
        chrome.webNavigation.getAllFrames({
          tabId: sender.tab.id,
          }, function(details) {
              

              for (var i = 0; i < details.length; ++i) {
                  var frame = details[i];
                  // The top-level frame has frame ID 0.
                  
                  if (frame.frameId === 0) {
                      //console.log(frame);
                      pid = frame.processId;
                      //console.log('Tab info:\n' +
                      //      'PID: ' + frame.processId + '\n' +
                      //      'URL: ' + frame.url);
                      
                  }
              }
              
              
            
              //console.log(data.cache[currentTabID]);
              //console.log(data.cache);

              if(!(data.cache[currentTabID]===undefined))
              {
                
                  let returnValues = data.cache[currentTabID];
                  returnValues.pid = pid;
                  returnValues.tabid = sender.tab.id;
                  if (request.message == "perfdata"){   
                    //console.log(sender.tab.id,returnValues);     
                    
                    if(!(returnValues===undefined)){
                      
                      sendResponse({perfdata:returnValues});
                    }
                    else{
                      console.log("empty response");
                    }
      
                    data.cache[currentTabID] = returnValues;
                    chrome.storage.local.set(data);

                  }
              }
              else {
                console.log("empty");     
                sendResponse({perfdata:"empty",error:true});
              }     


            });
  
        });

    }
    else if(request.message === "performance"){
      chrome.storage.local.get('cache', function(data) {
        if (!data.cache) data.cache = {};       
        data.cache['tab' + sender.tab.id] = request.timing;
        chrome.storage.local.set(data);
      });

      console.log("=========performance incoming message==============");
      
      chrome.browserAction.setBadgeText({text: request.time, tabId: sender.tab.id});

      //Get tab for receive url data
      chrome.tabs.get(sender.tab.id, function(tab){
        //console.log(tabList);
        //console.log(sender.tab.id);
        if(tabList.findIndex(x => x.key === sender.tab.id)>-1){
          tabList[tabList.findIndex(x => x.key === sender.tab.id)].username = request.timing.username;
          console.log(request.timing.username);
        }
        
        //console.log(tabList);

        let performance = new performanceRow(request.timing,tab.url);
            performance.userIP = localIP;
            performance.userExternalIP = remoteIP;
            performance.cUserName = cUserName;
            performance.cUserEmail = cUserEmail;
        //debugger;
            send_performanceData2Server(performance.toJSON());
      });
      
    }
      
    return true;
  }
);


chrome.tabs.onCreated.addListener(function (tab){
      
      tabList.push(new activityRow(tab.id));
      if(localIP===""){
        getLocalIPs(function(ips) {
          console.log(ips.join('\n '));
          localIP = ips[0];
        });
      }
      
      if(remoteIP===""){
        $.getJSON('https://json.geoiplookup.io/api?callback=?', function(data) {
          console.log(data.ip);
          remoteIP = data.ip;
        });
       
          
      }
});


chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  console.log('remove tab ' + tabId);
  console.table(tabList);

  var d = new Date();
  tabList[tabList.findIndex(x => x.key === tabId)].endactivetime = Math.round(d.getTime() / 1000);

  //let connect = new connector();
  //connect.send(remoteAPIURL,tabList[tabList.findIndex(x => x.key === tabId)]);    
  send_activityData2Server(tabList.findIndex(x => x.key === tabId));

  tabList.splice(tabList.findIndex(x => x.tabId === tabId), 1);

  chrome.storage.local.get('cache', function(data) {
    if (data.cache) delete data.cache['tab' + tabId];
      chrome.storage.local.set(data);
  });  
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  var d = new Date();
  console.groupCollapsed("onActivated");
    console.log('active tab ' + activeInfo.tabId);
    console.log('lastActiveTabID ' + lastActiveTabID);
    console.log('activeInfo.tabId ' + activeInfo.tabId);
  console.groupEnd();


  if(lastActiveTabID!==activeInfo.tabId && lastActiveTabID!==0){
      chrome.tabs.executeScript(activeInfo.tabId, { file: 'activetab.js'});
      if(tabList.findIndex(x => x.key === lastActiveTabID)>-1){
          tabList[tabList.findIndex(x => x.key === lastActiveTabID)].endactivetime = Math.round(d.getTime() / 1000);
          //send(tabList[tabList.findIndex(x => x.key === lastActiveTabID)]);
          //let connect = new connector();
          //connect.send(remoteAPIURL,tabList[tabList.findIndex(x => x.key === lastActiveTabID)]);
          send_activityData2Server(tabList.findIndex(x => x.key === lastActiveTabID));
          
      }
      tabList[tabList.findIndex(x => x.key === activeInfo.tabId)].startactivetime = Math.round(d.getTime() / 1000);
      //tabList[tabList.findIndex(x => x.key === activeInfo.tabId)].fullurl = encodeURI(tab.url);
      lastActiveTabID = activeInfo.tabId;
      
  }
  else{
    chrome.tabs.executeScript(activeInfo.tabId, { file: 'activetab.js'});
    lastActiveTabID = activeInfo.tabId;
  }
  console.table(tabList);
});


chrome.tabs.onReplaced.addListener(function(addedTabId, removedTabId){
  console.groupCollapsed("OnReplaced");
    console.log('current active tab ' + lastActiveTabID);
    console.log('added tab ' + addedTabId);
    console.log('remove tab ' + removedTabId);
  console.groupEnd();
  if(lastActiveTabID!==addedTabId){
      chrome.tabs.executeScript(addedTabId, { file: 'replacetab.js'});
      if(tabList.findIndex(x => x.key === removedTabId)>-1){
        tabList[tabList.findIndex(x => x.key === removedTabId)].endactivetime = Math.round(d.getTime() / 1000);  
        //let connect = new connector();
        //connect.send(remoteAPIURL,tabList[tabList.findIndex(x => x.key === removedTabId)]);  
        send_activityData2Server(tabList.findIndex(x => x.key === removedTabId));
      }
      tabList[tabList.findIndex(x => x.key === addedTabId)].startactivetime = Math.round(d.getTime() / 1000);
      tabList[tabList.findIndex(x => x.key === addedTabId)].fullurl = encodeURI(tab.url);
      lastActiveTabID = addedTabId;      
  }
});




chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //if (changeInfo.status == 'complete' && !tabList.includes(tabId)) {
    //console.log(tab);


    if (changeInfo.status == 'complete') {
      console.log('current update tab ' + tabId);
      console.log(changeInfo);

      const url = new URL(tab.url);
      const domain = url.hostname;
      var d = new Date();
      
      if(tabList.findIndex(x => x.key === tabId)>-1){
          if(tabList[tabList.findIndex(x => x.key === tabId)].hashC!==tabList[tabList.findIndex(x => x.key === tabId)].hashcode(tab.url)){
                        
            console.log("new url on tab");

            //update activity row regarding url replace
              tabList[tabList.findIndex(x => x.key === tabId)].endactivetime = Math.round(d.getTime() / 1000);
              send_activityData2Server(tabList.findIndex(x => x.key === tabId));
            
            //update memory table with tabs about new url and new start time
              tabList[tabList.findIndex(x => x.key === tabId)].url = domain;
              tabList[tabList.findIndex(x => x.key === tabId)].startactivetime = Math.round(d.getTime() / 1000);
              tabList[tabList.findIndex(x => x.key === tabId)].fullurl = encodeURI(tab.url);
            
          }
          else{
            console.log("old url on tab");
          }
      }
      else if(domain!=="extensions" && domain!=="newtab"){                
        tabList.push(new activityRow(tabId,tab.url));
      }

      console.table(tabList);
      //chrome.tabs.executeScript(tab.ib, { file: 'inject.js'});
    }
});






chrome.identity.getProfileUserInfo(function(userInfo) {
       console.log("userInfo - > " + userInfo);
       chrome.storage.local.set({"userinfo":userInfo} ,function() {
          console.log('Value is set to user ' + userInfo.email);
      });
});


chrome.runtime.onInstalled.addListener(function(details){
  var thisVersion = chrome.runtime.getManifest().version;
  if(details.reason == "install"){
      console.log("This is a first install!");
      let ut = new utils();
      uuid = ut.generateUUID();
      chrome.storage.local.set({'uuid': uuid , 'version': thisVersion}, function() {
        console.log('Settings saved');
      });

      chrome.identity.getProfileUserInfo(function(info) {
        console.log(info);
        chrome.storage.local.set({'chromeuserid': info.id , 'chromeuseremail': info.email}, function() {
          console.log('Settings saved');
        });
      });
  }
  else if(details.reason == "update"){
      console.clear();

      //let p = new activityRow();
      //p.domain = 'Alex';
      //console.log(p.domain);

      console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
      //console.log(chrome.identity);

      chrome.identity.getProfileUserInfo(function(info) {
        //console.log(info)
        cUserEmail = info.email;
        cUserName = info.id;
        chrome.storage.local.set({'chromeuserid': info.id , 'chromeuseremail': info.email}, function() {
          //console.log('Settings saved');
        });
      });  
      
      chrome.storage.local.get('uuid', function (result) {
        if(result==undefined || result === "")
        {
          let ut = new utils();
          uuid = ut.generateUUID();

          chrome.storage.local.set({'uuid': uuid , 'version': thisVersion}, function() {
            //console.log('Settings saved');
          });
        }
        else
          uuid = result.uuid;

        console.log(result.uuid);
    });

      chrome.storage.local.set({'version': thisVersion}, function() {
        console.log('Version saved');
      });

      
  }
});

function send_activityData2Server(rowIndex){

          let connect = new connector();
          let activityAPIURL = remoteAPIURL + "addDailyActivityRecord"; 
          if(tabList[rowIndex]!=undefined){
              var localobj = tabList[rowIndex].toJSON();
              localobj.localip = localIP;
              if(tabList[rowIndex].validURL(tabList[rowIndex].fullurl))
                //connect.send(remoteAPIURL,tabList[rowIndex].toJSON());
                connect.send(activityAPIURL,localobj);
          }
          else{
              console.error(`Row index ${rowIndex} not exists.`)
          }
}


function send_performanceData2Server(data){

  let connect = new connector();
  let performanceAPIURL = remoteAPIURL + "addperformanceRecord";


  connect.send(performanceAPIURL,data);
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