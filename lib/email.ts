import nodemailer from 'nodemailer'

export function mailer() {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  })
  return transporter
}

export async function sendOrderEmails(params: {
  customerEmail: string
  ownerEmail: string
  subject: string
  htmlCustomer: string
  htmlOwner: string
}) {
  const transporter = mailer()
  const { customerEmail, ownerEmail, subject, htmlCustomer, htmlOwner } = params

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: customerEmail,
    subject,
    html: htmlCustomer
  })

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: ownerEmail,
    subject: `[ADMIN] ${subject}`,
    html: htmlOwner
  })
}