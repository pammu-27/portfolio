import express from 'express';
import bodyParser from 'body-parser';
import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Load OAuth 2.0 credentials and tokens
const credentials = JSON.parse(fs.readFileSync(path.join(__dirname, 'credentials.json'), 'utf8'));
const token = JSON.parse(fs.readFileSync(path.join(__dirname, 'token.json'), 'utf8'));
const { client_secret, client_id, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
);

oAuth2Client.setCredentials(token);

const sheets = google.sheets({ version: 'v4', auth: oAuth2Client });

// Handle form submission
app.post('/submit-form', async (req, res) => {
    const { name, email, message } = req.body;

    // Define the range where the data will be added in Google Sheets
    const spreadsheetId = '1IARxdv2R4zT5pPx-A_buTCJqwETHFVkf7ym1RfSSVk0';
    const range = 'Sheet1!A:C';
    
    const values = [
        [name, email, message]
    ];

    const resource = {
        values,
    };

    try {
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'RAW',
            resource,
        });
        res.json({ success: true, message: 'Form submission successful!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Error submitting form.' });
    }
});

// Serve the index.html on the root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
    console.log('Server started on http://localhost:3000');
});
