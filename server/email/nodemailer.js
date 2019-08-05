const mailer = require("nodemailer");
const { welcomeTemplate } = require("./mail-template/welcome")
require("dotenv").config();


// EMAIL TEMPLATE
const getEmailTemplate = (to, name, lastname, token, template) => {
  let data = null;

  switch(template){
    case "welcome" :
      data = {
        from: "Snapoutfit Store <snapoutfit.store.id@gmail.com>",
        to,
        subject: `Welcome ${name}`,
        html: welcomeTemplate(to, name, lastname)
      }
    break;
    default: 
      data
  }

  return data
}


const sendEmail = (to, name, lastname, token, type) => {
  // TRANSPORTER
  const smtpTransport = mailer.createTransport({
    service: "Gmail",
    auth: {
      user: "snapoutfit.store.id@gmail.com",
      pass: process.env.EMAIL_PASS
    }
  });

  const mail = getEmailTemplate(to, name, lastname, token, type)

  smtpTransport.sendMail(mail, function(err, response) {
    if (err) {
      console.log("Failed to sending email", err);
    } else {
      console.log("Email sent");
    }
    smtpTransport.close();
  });

}

module.exports = { sendEmail }


