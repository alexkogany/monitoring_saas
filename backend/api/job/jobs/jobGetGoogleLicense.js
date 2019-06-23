const {google} = require('googleapis');
const sequelize = require('../../../config/database');
const OrganizationGoogleLicenseStatus = require('../../models/OrganizationGoogleLicenseStatus');
var request = require('request');
var format = require('date-format');


class jobGetGoogleLicense {

    constructor(daysback) {
        this.daysback = daysback;
    }

    runjob(){
        sequelize.query("select * from tbl_organization_token", { type: sequelize.QueryTypes.SELECT})
        .then(organizations => {
            //console.log(organizations);
            organizations.map(function (organization) {
                var d = new Date();
                d.setDate(d.getDate()-7);
                let report_date = format.asString('yyyy-MM-dd',  d);
                if(organization.OrganizationRefreshToken!==null){
                    request.get({
                        headers: {'Authorization' : 'Bearer ' + organization.OrganizationToken},
                        url:     `https://www.googleapis.com/admin/reports/v1/usage/dates/${report_date}?parameters=accounts:gsuite_basic_total_licenses,accounts:gsuite_basic_used_licenses`,                
                        },
                        function (error, response, body) {
                            if (!error && response.statusCode == 200) {
                                 let body2 = JSON.parse(body);
                                
                                   
                                   //const someFunction = (current_item) => {
                                        sequelize.query(`select record_id from tbl_organization_google_license_status where "OrganizationID"='${organization.OrganizationID}'`, { type: sequelize.QueryTypes.SELECT} )                               
                                        .then(record_ids=>{
                                                //console.log(current_item.id.uniqueQualifier);
                                                //return record_ids.length;
                                                if(record_ids.length===0){
                                                     var google_license = {};
                                                     
                                                     google_license.OrganizationID = organization.OrganizationID;
                                                     google_license.gsuite_basic_total_licenses = body2.usageReports[0].parameters[0].intValue;
                                                     google_license.gsuite_basic_used_licenses = body2.usageReports[0].parameters[1].intValue;
                                                     
                                                     OrganizationGoogleLicenseStatus.create(google_license)
                                                     .then(function(data) {
                                                           console.log("create new event sucess." );                                                
                                                     })
                                                     .catch(error=>{
                                                         console.log("create new event unsucess." );                                                
                                                     });
                                                    
                                                 }
                                                 else{
                                                    OrganizationGoogleLicenseStatus.update(
                                                        {
                                                            gsuite_basic_total_licenses: body2.usageReports[0].parameters[0].intValue,
                                                            gsuite_basic_used_licenses: body2.usageReports[0].parameters[1].intValue,
                                                        },
                                                        { where: { OrganizationID: organization.OrganizationID } }
                                                    );
                                                      
        
                                                     
                                                    google_license.OrganizationID = organization.OrganizationID;
                                                    google_license.gsuite_basic_total_licenses = body2.usageReports[0].parameters[0].intValue;
                                                    google_license.gsuite_basic_used_licenses = body2.usageReports[0].parameters[1].intValue;
                                                    
                                                    OrganizationGoogleLicenseStatus.create(google_license)
                                                    .then(function(data) {
                                                          console.log("create new event sucess." );                                                
                                                    })
                                                    .catch(error=>{
                                                        console.log("create new event unsucess." );                                                
                                                    });
                                                
                                                 }
                                        });
                                     
                                
                                
                            }
                            else{
                                //console.log(response);
                                console.log(body);
                            }
                        }
                    );
                   
                }
                
              });
        });


    }


   
}



module.exports = jobGetGoogleLicense;