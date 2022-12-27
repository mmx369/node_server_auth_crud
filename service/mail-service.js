import * as dotenv from 'dotenv'
dotenv.config()

import nodemailer from 'nodemailer'

class MailService {
  constructor() {
    console.log(777, process.env.SMTP_HOST)
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }

  async sendActivationMail(to, link) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: `Account activation ${process.env.API_URL}`,
      text: '',
      html: `
      <div>
      <h1>Activation link</h1>
      <a href="${link}">${link}</a>
      </div>
      `,
    })
  }
}

export default new MailService()
