// Email service using Resend
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

interface AppointmentEmailData {
  clientName: string;
  clientEmail: string;
  barberName: string;
  serviceName: string;
  date: string;
  time: string;
  confirmationCode: string;
}

export async function sendAppointmentConfirmation(data: AppointmentEmailData) {
  const { clientName, clientEmail, barberName, serviceName, date, time, confirmationCode } = data;

  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1A1A1A; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A0A0A; color: #D4AF37; padding: 30px; text-align: center; }
          .content { padding: 30px; background: #F5F1ED; }
          .details { background: white; padding: 20px; margin: 20px 0; border-left: 4px solid #D4AF37; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          .code { font-size: 24px; font-weight: bold; color: #D4AF37; letter-spacing: 2px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>A Cut Above the Rest</h1>
            <p>Your Appointment is Confirmed</p>
          </div>
          <div class="content">
            <p>Hi ${clientName},</p>
            <p>Thank you for booking with us! We're looking forward to seeing you.</p>

            <div class="details">
              <h2>Appointment Details</h2>
              <p><strong>Barber:</strong> ${barberName}</p>
              <p><strong>Service:</strong> ${serviceName}</p>
              <p><strong>Date:</strong> ${date}</p>
              <p><strong>Time:</strong> ${time}</p>
              <p><strong>Confirmation Code:</strong><br><span class="code">${confirmationCode}</span></p>
            </div>

            <p><strong>What to bring:</strong></p>
            <ul>
              <li>Your confirmation code</li>
              <li>Please arrive 5 minutes early</li>
            </ul>

            <p><strong>Cancellation Policy:</strong> Please provide at least 24 hours notice if you need to cancel or reschedule.</p>
          </div>
          <div class="footer">
            <p>A Cut Above the Rest<br>
            Premium Grooming for the Modern Man<br>
            Questions? Contact us at ${process.env.NOTIFICATIONS_EMAIL_TO}</p>
          </div>
        </div>
      </body>
    </html>
  `;

  try {
    await resend.emails.send({
      from: process.env.NOTIFICATIONS_EMAIL_FROM || 'bookings@acutabovetherest.com',
      to: clientEmail,
      subject: `Appointment Confirmed - ${date} at ${time}`,
      html: emailHtml,
    });

    // Send notification to shop
    await resend.emails.send({
      from: process.env.NOTIFICATIONS_EMAIL_FROM || 'bookings@acutabovetherest.com',
      to: process.env.NOTIFICATIONS_EMAIL_TO || 'shop@acutabovetherest.com',
      subject: `New Appointment: ${clientName}`,
      html: `
        <h2>New Appointment Booked</h2>
        <p><strong>Client:</strong> ${clientName} (${clientEmail})</p>
        <p><strong>Barber:</strong> ${barberName}</p>
        <p><strong>Service:</strong> ${serviceName}</p>
        <p><strong>Date/Time:</strong> ${date} at ${time}</p>
        <p><strong>Confirmation Code:</strong> ${confirmationCode}</p>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email send error:', error);
    return { success: false, error };
  }
}
