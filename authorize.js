import { google } from 'googleapis';
import fs from 'fs';
import open from 'open';

const credentials = JSON.parse(fs.readFileSync('credentials.json', 'utf8'));
const { client_secret, client_id, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log('Authorize this app by visiting this url:', authUrl);
open(authUrl);
