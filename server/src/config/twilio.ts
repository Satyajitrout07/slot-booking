import twilio from "twilio";

//
// TWILIO CLIENT
//
export const twilioClient =
  twilio(
    process.env
      .TWILIO_ACCOUNT_SID!,

    process.env
      .TWILIO_AUTH_TOKEN!
  );