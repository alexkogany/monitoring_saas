var fs = require('fs');
var url = require('url');

const tokenController = () => {

    const receiveGoogleToken = async (req, res) => {
        try {
            console.log('Request Received');
            var url_parts = url.parse(req.url, true);
            var query = url_parts.query;

    
            
            var data = JSON.stringify(req.body);
            fs.writeFileSync("file.txt",data,"utf8");
            //fs.writeFileSync("file.txt",query,"utf8");

            Object.keys(url_parts.query).forEach(function (key) {
                //console.log(item); // key
                //console.log(url_parts[item]); // value
                fs.appendFileSync("file.txt",key + ":" + url_parts.query[key] + "\n","utf8");
            });


            //url_parts.searchParams.forEach((value, name, searchParams) => {
            //    console.log(name, value, myURL.searchParams === searchParams);
            //});


            res.end('{"msg": "OK"}');
                


        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    return {       
        receiveGoogleToken
    };

}

module.exports = tokenController;

//receiveGoogleToken