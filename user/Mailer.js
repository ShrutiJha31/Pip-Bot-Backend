"use strict";
const nodemailer = require("nodemailer");
async function main() {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
var data={
        from: `"Pip-Bot" <${process.env.SMTP_USER}>`,       
        to: "soniaditi4623@gmail.com",
        subject: "Hello USER,YOUR WEBSITE IS DOWN.",
        text: "Hello USER,YOUR WEBSITE IS DOWN.",
        html: "<b>Hello USER,YOUR WEBSITE IS DOWN.</b>",
      }
   let info = await transporter.sendMail(data);
  console.log("Message sent: %s", info.messageId);
}
main().catch(console.error);