const {google} = require('googleapis');
var query = require('cli-interact').getYesNo;



const oauth2Client = new google.auth.OAuth2(
  "842443584401-1nopv0grorn4q606pkbf1n7oooji4btv.apps.googleusercontent.com",
  "5bS1XibNEcxBGj_ifjjm-W-T",
  "https://app.ycell.net/site/afterlogin.html"
);
//oauth2Client.setCredentials("ya29.GlwnB233Wc0ZPucgAW2M9dvgRu1POXApq9O39tJ3ZDyguDKAxH_53UW2y-ybqImDAdkhYrpyMCMQLCtmEn-WvyiXN8YRmeelmy28t6fIPn3yBBY0WLnsYuSTLTJQwQ");

oauth2Client.setCredentials({
  refresh_token: "1/SVmzZb8ofMRld0YbZiS9JRL2acG8yVOiV1kDXkCp4XU0L6rt54zwWe-zpqaeYctm",
  access_token:"ya29.GlwnB233Wc0ZPucgAW2M9dvgRu1POXApq9O39tJ3ZDyguDKAxH_53UW2y-ybqImDAdkhYrpyMCMQLCtmEn-WvyiXN8YRmeelmy28t6fIPn3yBBY0WLnsYuSTLTJQwQ"
});


console.log(listUsers(oauth2Client));


var answer = query('Is it true');
console.log('you answered:', answer);

function listUsers(auth) {
	
	console.log(auth.access_token);

  const service = google.admin({version: 'directory_v1', auth});
  service.users.list({
    customer: 'my_customer',
    maxResults: 10,
    orderBy: 'email',
  }, (err, res) => {
    if (err) return console.error('The API returned an error:', err.message);

    const users = res.data.users;
    if (users.length) {
      console.log('Users:');
      users.forEach((user) => {
        console.log(`${user.primaryEmail} (${user.name.fullName})`);
      });
    } else {
      console.log('No users found.');
    }
  });
}
