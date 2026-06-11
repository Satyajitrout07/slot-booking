import { twilioClient } from "../../config/twilio";



export const sendAdminWhatsApp = async (data: any) => {
  try {
    if (
      !process.env.TWILIO_WHATSAPP_NUMBER ||
      !process.env.ADMIN_WHATSAPP
    ) {
      throw new Error(
        "WhatsApp environment variables are missing"
      );
    }

    const message = `
📢 *New Interview Booking*

━━━━━━━━━━━━━━━
👤 *Candidate Details*
━━━━━━━━━━━━━━━

Name: ${data.candidateName}

Email: ${data.candidateEmail}

━━━━━━━━━━━━━━━
📅 *Interview Schedule*
━━━━━━━━━━━━━━━

Date: ${data.interviewDate}

Time: ${data.interviewTime}

━━━━━━━━━━━━━━━
📋 *Interview Details*
━━━━━━━━━━━━━━━

Company Name: ${data.companyName}

Interview Round: ${data.round}

HR Name: ${data.hrName}

HR Mobile Number: ${data.hrPhone}

HR Email: ${data.hrEmail}
`;

    const response =
      await twilioClient.messages.create({
        body: message,
        from:
          process.env.TWILIO_WHATSAPP_NUMBER,
        to:
          process.env.ADMIN_WHATSAPP,
      });

    console.log(
      `WhatsApp sent successfully. SID: ${response.sid}`
    );

    return response;
  } catch (error) {
    console.error(
      "Error sending WhatsApp message:",
      error
    );
    throw error;
  }
};