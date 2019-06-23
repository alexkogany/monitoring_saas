const {google} = require('googleapis');
const sequelize = require('../../../config/database');
const OrganizationUser = require('../../models/OrganizationUser');
//const google_config = require('../../../config/google');
var request = require('request');

function getDateIfDate(d) {
    var m = d.match(/\/Date\((\d+)\)\//);
    return m ? (new Date(+m[1])).toLocaleDateString('en-US', {month: '2-digit', day: '2-digit', year: 'numeric'}) : d;
}


const renewdownloadusers = () =>{

    sequelize.query("select * from tbl_organization_token", { type: sequelize.QueryTypes.SELECT})
        .then(organizations => {
            //console.log(organizations);
            if(organizations[0].OrganizationRefreshToken!==null){
                //const oauth2Client = new google.auth.OAuth2(
                //    google_config.CLIENT_ID,
                //    google_config.SECRET_ID,
                //    google_config.REDIRECT_URL
                //);
                //oauth2Client.credentials = {
	            //    access_token: organizations[0].OrganizationToken
	            //};
            
                //oauth2Client.refreshAccessToken(function(err, tokens){
                //const service = google.admin({version: 'directory_v1', auth});
            }

            request.get({
                headers: {'Authorization' : 'Bearer ' + organizations[0].OrganizationToken},
                url:     'https://www.googleapis.com/admin/directory/v1/users?customer=my_customer',                
                },
                function (error, response, body) {
                    if (!error && response.statusCode == 200) {
                        for (user in JSON.parse(body).users)
                        {
                           var org_user = {};
                           org_user.googleID=JSON.parse(body).users[user].id;
                           org_user.googleetag=JSON.parse(body).users[user].etag;
                           org_user.UserEmail=JSON.parse(body).users[user].primaryEmail;
                           org_user.OrganizationID=organizations[0].OrganizationID;
                           org_user.Name=JSON.parse(body).users[user].name.givenName;
                           org_user.FamilyName=JSON.parse(body).users[user].name.familyName;
                           org_user.FullName=JSON.parse(body).users[user].name.fullName;
                           org_user.IsAdmin=JSON.parse(body).users[user].isAdmin;
                           //org_user.LastGoogleLoginTime=new Date();
                           //org_user.CreationGoogleLoginTime=new Date();
                           org_user.LastGoogleLoginTime=new Date(JSON.parse(body).users[user].lastLoginTime);
                           org_user.CreationGoogleLoginTime=new Date(JSON.parse(body).users[user].creationTime);
                           org_user.GoogleSuspended=JSON.parse(body).users[user].suspended;
                           //org_user.GoogleGender=JSON.parse(body).users[user].gender.type;
                           org_user.GoogleCustomerID=JSON.parse(body).users[user].customerId;
                           org_user.ipWhitelisted=JSON.parse(body).users[user].isMailboxSetup

                           try {
                                OrganizationUser.create(org_user)
                                .then(function(data) {
                                    // Return promise here, that will be resolved to 10 after 1 second
                                   //console.log("create" );
                                   //console.log(data);
                                })
                                .catch( error => {
                                    console.error('created function called: ' + error.message );
                                });
                           } catch (error) {
                               console.error(error);
                           }
                           
                        }
                        
                    }
                    else{
                        //console.log(response);
                        console.log(error);
                    }
                }
            );

                

            });
};
      


module.exports = {
    runjob : renewdownloadusers
};