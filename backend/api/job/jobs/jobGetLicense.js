const {google} = require('googleapis');
const sequelize = require('../../../config/database');
const OrganizationLicense = require('../../models/OrganizationLicense');
var request = require('request');


class jobUserModule {

    constructor() {
        
    }

    runjob(){
        sequelize.query('select OrganizationToken,OrganizationRefreshToken,organization_id,google_organization_id, from tbl_organization_token tot inner join tbl_organization tbo on tot."OrganizationID"=tbo."organization_id"', { type: sequelize.QueryTypes.SELECT})
        .then(organizations => {
            //let orgid = organizations.google_organization_id; //"C037p6ud8";

            organizations.map(organization=>{
                request.get({
                    headers: {'Authorization' : 'Bearer ' + organization.OrganizationToken},
                    url:     `https://www.googleapis.com/apps/licensing/v1/product/Google-Apps/users?customerId=${organization.google_organization_id}&maxResults=200`,                
                    },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            
                            for (let current_item of JSON.parse(body).items)
                            {
                                                             
                                    sequelize.query(`select record_id from tbl_organization_license where "userId"='${current_item.userId}'`, { type: sequelize.QueryTypes.SELECT} )                               
                                    .then(record_ids=>{
                                            console.log(current_item.userId);
                                            //return record_ids.length;
                                            if(record_ids.length===0){
                                                 var user_license = {};                                               
                                                 user_license.kind = current_item.kind;
                                                 user_license.OrganizationID = organization.OrganizationID;
                                                 user_license.selfLink = current_item.selfLink;
                                                 user_license.userId = current_item.userId;
                                                 user_license.productId = current_item.productId;
                                                 user_license.skuId = current_item.skuId;
                                                 user_license.skuName = current_item.skuName;
                                                 user_license.productName = current_item.productName;
                                                 
                                                
                                                 OrganizationLicense.create(user_license)
                                                 .then(function(data) {
                                                       console.log("create new user with license sucess." );
                                                 })
                                                 .catch(error=>{
                                                     console.log("create new user with license unsucess." );
                                                 });
                                                
                                             }
                                        });                                    
                               
                            }
                            
                        }
                        else{
                            //console.log(body);
                        }
                    }
                );
            });



        });


    }
}



module.exports = jobUserModule;