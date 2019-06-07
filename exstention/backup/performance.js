(function(){
  'use strict';

  if (document.readyState === 'complete') {
    startCollect();
  } else {
    window.addEventListener('load', startCollect);
  }

  function startCollect() {
    setTimeout(function() {
      console.log("==============performance=================");
      console.log(performance);
      console.log(performance.getEntriesByType('navigation'));
      console.log(performance.getEntriesByType('navigation')[0]);
      console.log(performance.getEntriesByType('navigation')[0].toJSON());
      console.log("==============end_performance=================");
      const l = performance.getEntriesByType('navigation')[0].toJSON();
      if (l.duration > 0) {
        // we have only 4 chars in our disposal including decimal point
        var t = (l.duration / 1000).toFixed(2);
        chrome.runtime.sendMessage({time: t, timing: l, message:"performance"});
      }
    }, 0);
  }
})();