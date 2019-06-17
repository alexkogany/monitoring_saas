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
                            for (let current_item of JSON.parse(body).items)
                            {
                               
                               //const someFunction = (current_item) => {
                                    sequelize.query(`select record_id from tbl_organization_google_events where "eventuniqueQualifier"='${current_item.id.uniqueQualifier}'`, { type: sequelize.QueryTypes.SELECT} )                               
                                    .then(record_ids=>{
                                            console.log(current_item.id.uniqueQualifier);
                                            //return record_ids.length;
                                            if(record_ids.length===0){
                                                 var google_new_event = {};
                                                 
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
                                    });
                                        //.then(records=>{
                                        //        console.log(records);
                                        //});
                                //};
                              
                                //someFunction(current_item);//.then(uid => {
                                    /* stuff */
                                //;});
                            }
                            
                        }
                        else{
                            //console.log(response);
                            console.log(body);
                        }
                    }
                );
               
            }
        });


    }
}



module.exports = jobUserModule;