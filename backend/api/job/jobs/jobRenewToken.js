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
            if(organizations[0].OrganizationRefreshToken!==null){
                const oauth2Client = new google.auth.OAuth2(
                    google_config.CLIENT_ID,
                    google_config.SECRET_ID,
                    google_config.REDIRECT_URL
                );
                oauth2Client.credentials = {
	                refresh_token: organizations[0].OrganizationRefreshToken
	            };

                oauth2Client.refreshAccessToken(function(err, tokens){
                //console.log(tokens)
                //oauth2Client.credentials = {access_token : tokens.access_token}
                //callback(oauth2Client);

                OrganizationToken.findAll({ where: { OrganizationID: organizations[0].OrganizationID } }).then(function(org) {
                    console.log("found success");
                    //console.log(org);
                    if (org) {
                        org[0].update({
                            OrganizationToken: tokens.access_token
                        })

                        global.logger.loggers.get('application').info('Update google token.');
                    }

                    // expected output: "foo"
                });

                // OrganizationToken.sequelize.models.OrganizationToken.findAll({ where: { OrganizationID: organizations[0].OrganizationID } })
                //                 .on('success', function (project) {
                //                 // Check if record exists in db
                //                 console.log("found success");
                //                 if (project) {
                //                 project.update({
                //                     OrganizationToken: tokens.access_token
                //                 })
                //                 .success(function () {
                //                     console.log("update success");
                //                 })
                //                 }
                //         })

                 });
            }
            // We don't need spread here, since only the results will be returned for select queries
    })
      
}

module.exports = {
    runjob : renewtoken
};