const {google} = require('googleapis');
const sequelize = require('../../../config/database');
const OrganizationGoogleEvent = require('../../models/OrganizationGoogleEvent');
var request = require('request');



class jobUserModule {

    constructor(daysback) {
        this.daysback = daysback;
    }

    runjob(){
        sequelize.query("select * from tbl_organization_token", { type: sequelize.QueryTypes.SELECT})
        .then(organizations => {
            //console.log(organizations);
            if(organizations[0].OrganizationRefreshToken!==null){
                request.get({
                    headers: {'Authorization' : 'Bearer ' + organizations[0].OrganizationToken},
                    url:     'https://www.googleapis.com/admin/reports/v1/activity/users/all/applications/login?maxResults=100',                
                    },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            for (events in JSON.parse(body).users)
                            {
                               
    
                               try {
                                    /*OrganizationUser.create(org_user)
                                    .then(function(data) {
                                        // Return promise here, that will be resolved to 10 after 1 second
                                       console.log("create" );
                                       console.log(data);
                                    })
                                    .catch( error => {
                                        console.error('created function called: ' + error.message );
                                    });*/
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
               
            }
        });


    }
}



module.exports = jobUserModule;