import nodemailer from "nodemailer";
import { config } from "dotenv";

config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: process.env.GMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const resetUrl = `http://localhost:5000/api/auth/user/reset-password?token=${token}`;

  await transporter.sendMail({
    from: "LinkTree Backend",
    to: email,
    subject: "Password Reset Request",
    html: `
     <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Reset Your Password</title>
    <style type="text/css">
        body {
            width: 100% !important;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
            margin: 0;
            padding: 0;
            line-height: 100%;
        }
        a, a:hover {
            color: #007bff;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }
        table {
            border-collapse: collapse !important;
        }
        body, table, td, a {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            font-weight: 400;
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
    </style>
</head>
<body style="margin: 0; padding: 0; mso-padding-alt: 0px 0px 0px 0px; -webkit-text-size-adjust:none; -ms-text-size-adjust:none; background-color:#f4f4f4;">

<table cellpadding="0" cellspacing="0" width="100%" style="background-color:#f4f4f4;">
    <tr>
        <td>
            <table align="center" cellpadding="0" cellspacing="0" width="600" style="margin: 40px auto; border-collapse: collapse;">
                <tr>
                    <td align="center" style="padding: 20px 0; background-color: #ffffff; border-radius: 4px 4px 0 0;">
                        <h1 style="margin: 0; font-size: 24px; color: #333333;">Reset Your Password</h1>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 40px; background-color: #ffffff;">
                        <p style="margin-top: 0; margin-bottom: 20px; font-size: 16px; color: #555555; line-height: 1.5;">Hello,</p>
                        <p style="margin-top: 0; margin-bottom: 20px; font-size: 16px; color: #555555; line-height: 1.5;">You recently requested to reset your password for your account. Please click the button below to reset it:</p>

                        <table cellpadding="0" cellspacing="0" align="center" style="margin: 0 auto;">
                            <tr>
                                <td style="border-radius: 3px; background-color: #007bff;" align="center">
                                    <a href="${resetUrl}" target="_blank" style="font-size: 16px; font-family: Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; text-decoration: none;border-radius: 3px; padding: 12px 25px; border: 1px solid #007bff; display: inline-block;">Reset Password</a>
                                </td>
                            </tr>
                        </table>

                        <p style="margin-top: 25px; margin-bottom: 20px; font-size: 14px; color: #777777; line-height: 1.4;">If you did not request a password reset, please ignore this email.</p>
                        <p style="margin-top: 0; margin-bottom: 0; font-size: 14px; color: #777777; line-height: 1.4;">This password reset link is valid for a limited time. It will expire in 1 hour.</p>

                        <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 30px 0;"
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</table>

</body>
</html>
    `,
  });
};

export const sendVerificationEmail = async (email: string, token: string) => {
  const verificationUrl = `http://localhost:5000/api/auth/user/verify-email?token=${token}`;

  await transporter.sendMail({
    from: "LinkTree Backend",
    to: email,
    subject: "Verify Your Email",
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <title>Verify Your Email</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f2f2f2;
              margin: 0;
              padding: 20px;
            }
            .container {
              background: #ffffff;
              max-width: 600px;
              margin: 0 auto;
              padding: 30px;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            }
            h2 {
              text-align: center;
              color: #333333;
              margin-bottom: 20px;
            }
            p {
              font-size: 16px;
              color: #555555;
              line-height: 1.5;
            }
            .button {
              display: block;
              width: 200px;
              margin: 30px auto;
              background-color: #007BFF;
              color: #ffffff;
              text-align: center;
              padding: 12px 0;
              text-decoration: none;
              border-radius: 4px;
              font-weight: bold;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #aaaaaa;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h2>Verify Your Email</h2>
            <p>
              Welcome! Please verify your email by clicking the button below.
            </p>
            <a href="${verificationUrl}" class="button">Verify Email</a>
            <p>This link expires in 24 hours.</p>
          </div>
          <div class="footer">
            &copy; ${new Date().getFullYear()} LinkTree Backend. All rights reserved.
          </div>
        </body>
      </html>
    `,
  });
};
