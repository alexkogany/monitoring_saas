// Setting a toolbar badge text
var tabList = [];

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log(request);
    //console.log("request.message->" + request.message);

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
});


chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
  console.log('remove tab ' + tabId);
  
  tabList.splice(tabList.findIndex(x => x.tabId === tabId), 1);
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    //if (changeInfo.status == 'complete' && !tabList.includes(tabId)) {
    //console.log(tab);
    if (changeInfo.status == 'complete') {
      const url = new URL(tab.url);
      const domain = url.hostname;

      //console.log('Navigate->' + domain);
      if(tabList.findIndex(x => x.key === tabId)>-1){
          tabList[tabList.findIndex(x => x.key === tabId)].url = domain;
      }
      else if(domain!=="extensions" && domain!=="newtab")
          tabList.push({key:tabId,url:domain});
    

      //console.log(tabList);
      //console.log("tabid - > " + tabId + " loading complete")
        chrome.tabs.executeScript(tab.ib, { file: 'inject.js'});
    }
});






chrome.identity.getProfileUserInfo(function(userInfo) {
       chrome.storage.local.set({"userinfo":userInfo} ,function() {
          console.log('Value is set to user ' + userInfo.email);
      });
});
