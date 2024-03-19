import { createReadStream } from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'

const attachments = [
  {
    filename: 'linkedIn.csv',
    content: createReadStream(path.join(__dirname, '../../public/linkedIn.csv'))
  }
]
export async function sendMail(): Promise<void> {
  if (typeof process.env.G_USERNAME === 'undefined') {
    return
  }
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.G_USERNAME,
      pass: process.env.G_PASSWORD
    }
  })
  const message = {
    from: 'toto@toto.com',
    to: process.env.RECIPIENTS,
    subject: 'Derniers jobs linkedIn',
    attachments
  }
  try {
    await transporter.sendMail(message)
  } catch (err) {
    console.error('Error occured', err)
  }
}
void sendMail()
