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

            organizations.map(organization=>{
                request.get({
                    headers: {'Authorization' : 'Bearer ' + organization.OrganizationToken},
                    url:     'https://www.googleapis.com/admin/directory/v1/users?customer=my_customer',                
                    },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            for (let user of JSON.parse(body).users)
                            {
                               console.log(user.emails[0].address);
                               sequelize.query(`select record_id FROM public.tbl_organization_users where "UserEmail"='${user.emails[0].address}'`, { type: sequelize.QueryTypes.SELECT} )                               
                               .then(users=>{
                                    if(users.length===0){
                                        var org_user = {};
                                        org_user.googleID=user.id;
                                        org_user.googleetag=user.etag;
                                        org_user.UserEmail=user.primaryEmail;
                                        org_user.OrganizationID=organization.OrganizationID;
                                        org_user.Name=user.name.givenName;
                                        org_user.FamilyName=user.name.familyName;
                                        org_user.FullName=user.name.fullName;
                                        org_user.IsAdmin=user.isAdmin;
                                        org_user.LastGoogleLoginTime=new Date(user.lastLoginTime);
                                        org_user.CreationGoogleLoginTime=new Date(user.creationTime);
                                        org_user.GoogleSuspended=user.suspended;
                                        org_user.GoogleCustomerID=user.customerId;
                                        org_user.ipWhitelisted=user.isMailboxSetup
            
                                        try {
                                            OrganizationUser.create(org_user)
                                            .then(function(data) {
                                            })
                                            .catch( error => {
                                                console.error('created function called: ' + error.message );
                                            });
                                        } catch (error) {
                                            console.error(error);
                                        }
                                    }
                               })
                            
                            }
                            
                        }
                        else{
                            //console.log(response);
                            console.log(error);
                        }
                    }
                );
            });

            

                

            });
};
      


module.exports = {
    runjob : renewdownloadusers
};