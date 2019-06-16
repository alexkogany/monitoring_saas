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
                            let eventV;
                            for (eventV in JSON.parse(body).items)
                            {
                               
                               var current_item = JSON.parse(body).items[eventV];

                               try {
                                
                                sequelize.query(`select record_id from tbl_organization_google_events where "eventuniqueQualifier"='${current_item.id.uniqueQualifier}'`, { type: sequelize.QueryTypes.SELECT})                               
                               .then(function (record_ids,lala){
                                    if(record_ids.length===0){
                                        var google_new_event = {};
                                        var username=this.username;
                                        var password=this.password;
                                        console.log(current_item.id.uniqueQualifier);
                                        
                                        google_new_event.kind = current_item.kind;
                                        google_new_event.eventTime = current_item.id.time;
                                        google_new_event.eventuniqueQualifier = current_item.id.uniqueQualifier;
                                        google_new_event.eventApplicationName = current_item.id.applicationName;
                                        google_new_event.eventCustomerID = current_item.id.customerId;
                                        google_new_event.eventActorEmail = current_item.actor.email;
                                        google_new_event.eventActorProfileID = current_item.actor.profileId;
                                        google_new_event.eventIPAddress = current_item.ipAddress;
                                        google_new_event.eventType = current_item.type;
                                        google_new_event.eventName = current_item.name;
                                        
                                        OrganizationGoogleEvent.create(google_new_event)
                                        .then(function(data) {
                                              console.log("create new event sucess." );
                                              console.log(data)
                                        })
                                        .catch(error=>{
                                            console.log("create new event unsucess." );
                                            console.log(error);
                                        });
                                        
                                    }
                                },{alex:1111});
                                //.catch(error=>{
                                //    console.log(data);
                                //});

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