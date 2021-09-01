const { SMTP_EMAIL, ADMIN_EMAIL } = require("../../config/env/keys");

const sendEmail = (user, slug) => {
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    host: SMTP_EMAIL,
    port: 587,
    auth: {
      user: ADMIN_EMAIL,
      pass: "Ebu20002005",
    },
  });

  const mailOptions = {
    from: ADMIN_EMAIL,
    to: user.email,
    subject: "Welcome to EcommerceApp",
    html: `<body>
                <div style="text-align:center">
                    <h3>EcommerceApp</h3>
                    <p>Welcome to EcommerceApp</p>
                    <div>
                        <a href="localhost:8000/api/user/${slug}">Confirm</a>
                    </div>
                </div>
      </body>`,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
