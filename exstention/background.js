// Setting a toolbar badge text
var tabList = [];
let lastActiveTabID = 0;
//let emitter = new EventEmitter();

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
        //console.log('tab' + sender.tab.id , request.timing)
        
        data.cache['tab' + sender.tab.id] = request.timing;
        chrome.storage.local.set(data);
      });

      chrome.browserAction.setBadgeText({text: request.time, tabId: sender.tab.id});
      
    }
      
    return true;
  }
);

// cache eviction
chrome.tabs.onRemoved.addListener(function(tabId) {
  chrome.storage.local.get('cache', function(data) {
    if (data.cache) delete data.cache['tab' + tabId];
      chrome.storage.local.set(data);
  });
});


chrome.tabs.onCreated.addListener(function (tab){
      //console.log('open new tab ' + tab.id);
      tabList.push({key:tab.id});
});


chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  console.log('remove tab ' + tabId);
  
  tabList.splice(tabList.findIndex(x => x.tabId === tabId), 1);
});

chrome.tabs.onActivated.addListener(function(activeInfo){
  var d = new Date();
  console.groupCollapsed("onActivated");
    console.log('active tab ' + activeInfo.tabId);
    console.log('lastActiveTabID ' + lastActiveTabID);
    console.log('activeInfo.tabId ' + activeInfo.tabId);
  console.groupEnd();
  if(tabList[tabList.findIndex(x => x.key === activeInfo.tabId)]==undefined){
        chrome.tabs.get(activeInfo.tabId, function(tab){
        console.log('New active tab: ' + tab.id);
        console.warn('New active tab: ' + tab.id);
        const url = new URL(tab.url);
        const domain = url.hostname;
        tabList.push({key:tab.id,url:domain,startactivetime:Math.round(d.getTime() / 1000)});
      });
  }

  if(lastActiveTabID!==activeInfo.tabId && lastActiveTabID!==0){
      chrome.tabs.executeScript(activeInfo.tabId, { file: 'activetab.js'});
      if(tabList.findIndex(x => x.key === lastActiveTabID)>-1){
          tabList[tabList.findIndex(x => x.key === lastActiveTabID)].endactivetime = Math.round(d.getTime() / 1000);
          //send(tabList[tabList.findIndex(x => x.key === lastActiveTabID)]);
          let connect = new connector();
          connect.send("http://127.0.0.1:2017/public/addDailyActivityRecord",tabList[tabList.findIndex(x => x.key === lastActiveTabID)]);
          
      }
      tabList[tabList.findIndex(x => x.key === activeInfo.tabId)].startactivetime = Math.round(d.getTime() / 1000);
      lastActiveTabID = activeInfo.tabId;
      
  }
  else{
    chrome.tabs.executeScript(activeInfo.tabId, { file: 'activetab.js'});
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
        let connect = new connector();
        connect.send("http://127.0.0.1:2017/public/addDailyActivityRecord",tabList[tabList.findIndex(x => x.key === removedTabId)]);  
      }
      tabList[tabList.findIndex(x => x.key === addedTabId)].startactivetime = Math.round(d.getTime() / 1000);
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

      //console.log('Navigate->' + domain);
      if(tabList.findIndex(x => x.key === tabId)>-1){
          tabList[tabList.findIndex(x => x.key === tabId)].url = domain;
      }
      else if(domain!=="extensions" && domain!=="newtab")
          tabList.push({key:tabId,url:domain});
    

      console.table(tabList);
      //console.log("tabid - > " + tabId + " loading complete")
        chrome.tabs.executeScript(tab.ib, { file: 'inject.js'});
    }
});






chrome.identity.getProfileUserInfo(function(userInfo) {
       chrome.storage.local.set({"userinfo":userInfo} ,function() {
          console.log('Value is set to user ' + userInfo.email);
      });
});


chrome.runtime.onInstalled.addListener(function(details){
  var thisVersion = chrome.runtime.getManifest().version;
  if(details.reason == "install"){
      console.log("This is a first install!");
      let ut = new utils();
      let uuid = ut.uuid();
      chrome.storage.local.set({'uuid': uuid , 'version': thisVersion}, function() {
        console.log('Settings saved');
      });
  }
  else if(details.reason == "update"){
      console.clear();


      console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
      
      //loggl = new loggly();
      //let connect = new connector();
      //connect.send("http://127.0.0.1:2017/public/addDailyActivityRecord",tabList[tabList.findIndex(x => x.key === lastActiveTabID)]);

      
      

      chrome.storage.local.set({'version': thisVersion}, function() {
        console.log('Settings saved');
      });

      
  }
});


// function send(data){
  //console.log("emiter fire");
  //let _utils = new utils();
  //let _be = new be("http://127.0.0.1:2017/public/addDailyActivityRecord");
  //_be.send2server(data);
//};
