const nodemailer = require("nodemailer");
const ejs= require('ejs');
const path= require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'thethunderbirdus@gmail.com',
      pass: 'na munna na :)'
    }
});

let renderTemplate= (data,relativePath) => {
    let mailHtml;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){console.log('error in rendering template'); return;}
            mailHtml= template;
        }
    )
    return mailHtml;
}

module.exports= {
    transporter: transporter,
    renderTemplate: renderTemplate
}