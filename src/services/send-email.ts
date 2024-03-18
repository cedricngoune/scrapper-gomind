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
    to: ['antoine.guillaud@gomindfactory.com', 'charles.azevedo@gomindfactory.com'],
    subject: 'Derniers jobs linkedIn',
    attachments
  }
  try {
    await transporter.sendMail(message)
  } catch (err) {
    console.error('Error occured', err)
  }
}
