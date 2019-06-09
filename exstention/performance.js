$(function(){
  'use strict';

  if (document.readyState === 'complete') {
    console.log("==============performance=================");
    startCollect();
  } else {
    console.log("==============performance=================");
    window.addEventListener('load', startCollect);
  }

  function startCollect() {
    setTimeout(function() {
      // console.log("==============performance=================");
      // console.log(performance);
      // console.log(performance.getEntriesByType('navigation'));
      // console.log(performance.getEntriesByType('navigation')[0]);
      // console.log(performance.getEntriesByType('navigation')[0].toJSON());
      // console.log("==============end_performance=================");
      let username = "";
      try {

        const url = new URL(window.location);
        const domain = url.hostname;

        if(domain.indexOf("google")>1)
            username = document.querySelector(".gb_db").textContent;
                //console.log(document.querySelector(".gb_db").textContent);
      
        //console.log($("div.gb_db").textContent);
        //let tt = 'document.querySelector("div[class='gb_db']")';

        

        /*var sss = setTimeout(() => {
          var xxx = retrieveWindowVariables({
              ensemble: 'document.querySelector(".gb_db").textContent',
          });
          console.log(xxx.ensemble);
       }, 1000);*/

        //console.log($("div.gb_Rd").children[0].children[2]);
      } catch (error) {
        console.log(error);
      }
      

      let l = performance.getEntriesByType('navigation')[0].toJSON();
      l.username = username;
      if (l.duration > 0) {
        // we have only 4 chars in our disposal including decimal point

        console.log("==============DURATION=================");
        var t = (l.duration / 1000).toFixed(2);
        chrome.runtime.sendMessage({time: t, timing: l, message:"performance"});
      }
    }, 0);
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
});