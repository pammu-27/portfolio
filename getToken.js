import { google } from 'googleapis';
import fs from 'fs';

// Load OAuth 2.0 credentials
const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
const { client_secret, client_id, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

// Replace with your authorization code
const code = '4/0AcvDMrBhqQlP0XkAwstuM_kIfBaMb4AnfzwBF8rtfwQxDLDfkwMluWlK-9kHX2EANIMeYw&scope=https://www.googleapis.com/auth/spreadsheets';

oAuth2Client.getToken(code, (err, token) => {
    if (err) {
        console.error('Error retrieving access token', err);
        return;
    }
    oAuth2Client.setCredentials(token);
    fs.writeFileSync('token.json', JSON.stringify(token));
    console.log('Token stored to token.json');
});
