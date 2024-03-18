import { createReadStream } from 'fs'
import nodemailer from 'nodemailer'
import path from 'path'

const attachments = [
  {
    filename: 'linkedIn.csv',
    content: createReadStream(path.join(__dirname, '../../public/linkedIn.csv'))
  }
]
async function sendMail(): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'cedric.ngoune@gomindfactory.com',
      pass: 'rrde ojvc krzb vuoz'
    }
  })
  const message = {
    from: 'toto@toto.com',
    to: 'gabyngoune@yahoo.fr',
    subject: 'Jobs linkedIn',
    attachments
  }
  try {
    const info = await transporter.sendMail(message)
    console.log('Message sent', info.messageId)
  } catch (err) {
    console.error('Error occured', err)
  }
}
void sendMail()
