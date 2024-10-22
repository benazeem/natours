const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //1) Create Transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },

    //Active in gmail "less secure app" option
  });

  //2) Define email options

  const mailOptions = {
    from: 'Azeem Malik <azeem@getMaxListeners.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };

  //3) Actually send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
