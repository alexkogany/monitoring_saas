const {google} = require('googleapis');
const sequelize = require('../../../config/database');
const OrganizationLicense = require('../../models/OrganizationLicense');
var request = require('request');


class jobUserModule {

    constructor() {
        
    }

    runjob(){
        sequelize.query("select * from tbl_organization_token", { type: sequelize.QueryTypes.SELECT})
        .then(organizations => {
            let orgid = "C037p6ud8";
            if(organizations[0].OrganizationRefreshToken!==null){
                request.get({
                    headers: {'Authorization' : 'Bearer ' + organizations[0].OrganizationToken},
                    url:     `https://www.googleapis.com/apps/licensing/v1/product/Google-Apps/users?customerId=${orgid}&maxResults=50`,                
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
                                                 
                                                 //console.log(current_item.userId);
                                                
                                                 user_license.kind = current_item.kind;
                                                 user_license.OrganizationID = organizations[0].OrganizationID;
                                                 user_license.selfLink = current_item.selfLink;
                                                 user_license.userId = current_item.userId;
                                                 user_license.productId = current_item.productId;
                                                 user_license.skuId = current_item.skuId;
                                                 user_license.skuName = current_item.skuName;
                                                 user_license.productName = current_item.productName;
                                                 
                                                
                                                 OrganizationLicense.create(user_license)
                                                 .then(function(data) {
                                                       console.log("create new user with license sucess." );
                                                       //console.log(data)
                                                 })
                                                 .catch(error=>{
                                                     console.log("create new user with license unsucess." );
                                                     //console.log(error);
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
               
            }
        });


    }
}



module.exports = jobUserModule;