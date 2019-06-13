var fs = require('fs');
var url = require('url');
const OrganizationToken = require('../models/OrganizationToken');
const google_config = require('../../config/google');
const {google} = require('googleapis');
var request = require('request');

const tokenController = () => {

    const receiveGoogleToken = async (req, res) => {
        try {

            let organizationID = req.body.state;

            //var requestobject = {};
            //requestobject.code = req.body.access_token;
            //requestobject.client_id = google_config.CLIENT_ID;
            //requestobject.client_secret = google_config.SECRET_ID;
            //requestobject.grant_type="authorization_code";
            //requestobject.redirect_uri = google_config.REDIRECT_URL;

            //var newToken = {};
            //newToken.OrganizationID = req.body.state;
            //newToken.OrganizationToken = req.body.access_token;
            //newToken.scope = req.body.scope;
            //newToken.expired = req.body.expires_in;
            
            
            
            //OrganizationToken.create(newToken);
            //const apis = google.getSupportedAPIs();
            //console.log(apis);


            request.post({
                headers: {'content-type' : 'application/x-www-form-urlencoded'},
                url:     'https://www.googleapis.com/oauth2/v4/token',
                body:    `code=${req.body.access_token}&client_id=${google_config.CLIENT_ID}&client_secret=${google_config.SECRET_ID}&grant_type=authorization_code&redirect_uri=${google_config.REDIRECT_URL}`
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                      


                                    var newToken = {};
                                    newToken.OrganizationID = organizationID;
                                    newToken.OrganizationToken = JSON.parse(body).access_token;
                                    newToken.OrganizationRefreshToken = JSON.parse(body).refresh_token;
                                    newToken.Scope = JSON.parse(body).scope;
                                    newToken.Expired = JSON.parse(body).expires_in;

                                    OrganizationToken.create(newToken);
                    }
                    else{
                        //console.log(response);
                        console.log(error);
                    }
                }
            );

            return res.status(200).json({status:"success"});
 
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
    };


    const getGoogleAuthURL = async (req, res) => {
        try {

            
 
            const oauth2Client = new google.auth.OAuth2(
                google_config.CLIENT_ID,
                google_config.SECRET_ID,
                google_config.REDIRECT_URL
            );
            
            // generate a url that asks permissions for Blogger and Google Calendar scopes
            const scopes = google_config.SCOPE;
            
            const url = oauth2Client.generateAuthUrl({
            // 'online' (default) or 'offline' (gets refresh_token)
            access_type: 'offline',
            state:"12345678",
            // If you only need one scope you can pass it as a string
            scope: scopes
            });
            return res.status(200).json({redirect_url:url});
 
        } catch (err) {
          
          console.error(err);
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
    };

    return {       
        receiveGoogleToken,
        getGoogleAuthURL
    };
}

module.exports = tokenController;

//receiveGoogleToken