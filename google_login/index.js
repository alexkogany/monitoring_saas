const {google} = require('googleapis');
const readline = require('readline');
var query = require('cli-interact').getYesNo;

 
const oauth2Client = new google.auth.OAuth2(
  "842443584401-1nopv0grorn4q606pkbf1n7oooji4btv.apps.googleusercontent.com",
  "5bS1XibNEcxBGj_ifjjm-W-T",
  "https://app.ycell.net/auth/back"
);
 
// generate a url that asks permissions for Blogger and Google Calendar scopes
const scopes = [
  'https://www.googleapis.com/auth/admin.directory.user',
  'https://www.googleapis.com/auth/admin.reports.usage.readonly'
];
 
const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'offline',
 
  // If you only need one scope you can pass it as a string
  scope: scopes
});

console.log(url);


var answer = query('Is it true');
console.log('you answered:', answer);