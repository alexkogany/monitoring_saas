const OrganizationToken = require('../../models/OrganizationToken');
const sequelize = require('../../../config/database');
const google_config = require('../../../config/google');
const {google} = require('googleapis');


const renewtoken = () =>{
    //const users = await OrganizationTokens.findAll();

    //OrganizationTokens.findAll({ where: {title: 'aProject'} }).then(function(organizations) {
        
    //})

    sequelize.query("select * from tbl_organization_token tot", { type: sequelize.QueryTypes.SELECT})
        .then(organizations => {
            //console.log(organizations);
            organizations.map(function (org) {
                //return element + 1;
                UpdateToken(org);
              });
            // We don't need spread here, since only the results will be returned for select queries
    })
      
}


function  UpdateToken (organization){
    if(organization.OrganizationRefreshToken!==null){
            const oauth2Client = new google.auth.OAuth2(
                google_config.CLIENT_ID,
                google_config.SECRET_ID,
                google_config.REDIRECT_URL
            );
            oauth2Client.credentials = {
                refresh_token:organization.OrganizationRefreshToken
            };

            oauth2Client.refreshAccessToken(function(err, tokens){
        

                    OrganizationToken.findAll({ where: { OrganizationID: organization.OrganizationID } }).then(function(org) {
                        console.log("found success");

                        if (org) {
                            org[0].update({
                                OrganizationToken: tokens.access_token
                            })

                            global.logger.loggers.get('application').info('Update google token.');
                        }

                    });
            });
        }
     }
module.exports = {
    runjob : renewtoken
};