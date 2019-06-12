const https = require('https');

function send2server (data = {'hh':'hjgdsas'}) {
      try {
        const options = {
            hostname: 'logs-01.loggly.com',
            //mode: 'cors',
            cache: 'no-cache',
            //port: 443,
            path: '/inputs/87e0f319-d36d-423c-8148-4aab45169ba4/tag/http/',
            method: 'POST',
            //body: JSON.stringify(data), // body data type must match "Content-Type" header
            headers: {
              'Content-Type': 'application/json',
            },
        };

        

        var req =https.request(options,(res)=>{
            // eslint-disable-next-line no-console
            console.log('STATUS: ' + res.statusCode);
            
            res.on('data', (data) => {
              // eslint-disable-next-line no-console
              console.log('BODY: ' + data);
            });
        })
        
        req.on('information', (info) => {
            // eslint-disable-next-line no-console
            console.log(`Got information prior to main response: ${info.statusCode}`);
        });

        req.on('error', (e) => { 
            // eslint-disable-next-line no-console
            console.error(e);
        });
        
        req.write(JSON.stringify(data));
        req.end();
    } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
    }
    
}


module.exports = {
    send2server : send2server
};
