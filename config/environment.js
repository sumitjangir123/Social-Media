const fs= require('fs');
const rfs= require('rotating-file-stream');
const path= require('path');

const logDirectory= path.join(__dirname, '../production_logs');
//if logDirectory is not exist than create it 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream= rfs.createStream('access.log',{
  interval: '1d',
  path: logDirectory
});

const development= {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'something_something',
    db: 'multimedia',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: '',
          pass: ''
        }
    },
    google_client_id: "",
    google_client_secret: "",
    google_call_back_url: "",

    facebook_client_id: "",
    facebook_client_secret: "",
    facebook_call_back_url: "",

    jwt_secret: 'codeial',
    morgan: {
      mode: 'dev',
      options: {stream: accessLogStream}
    } 

}


const production= {
    name: 'production',
    asset_path: process.env.THUNDER_ASSET_PATH,
    session_cookie_key: process.env.THUNDER_SESSION_COOKIE_KEY,
    db:process.env.THUNDER_DB,
    // process.env.THUNDER_DB
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.THUNDER_GMAIL_USERNAME,
          pass: process.env.THUNDER_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALLBACK_URL,

    facebook_client_id: process.env.FACEBOOK_CLIENT_ID,
    facebook_client_secret: process.env.FACEBOOK_CLIENT_SECRET,
    facebook_call_back_url: process.env.FACEBOOK_CALLBACK_URL,

    jwt_secret: process.env.THUNDER_JWT_SECRET,
    morgan: {
      mode: 'combined',
      options: {stream: accessLogStream}
    } 
}

// eval(process.env.THUNDER_ENVIRONMENT)==undefined ? development : eval(process.env.THUNDER_ENVIRONMENT)
module.exports= production;