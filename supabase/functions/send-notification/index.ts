
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.49.8';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface NotificationRequest {
  appointmentId: string;
  channel: 'sms' | 'whatsapp' | 'email';
  patientName: string;
  patientPhone?: string;
  patientEmail?: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { appointmentId, channel, patientName, patientPhone, patientEmail, appointmentDate, appointmentTime, appointmentType }: NotificationRequest = await req.json();

    console.log(`Sending ${channel} notification for appointment ${appointmentId}`);

    let notificationResult;

    if (channel === 'sms' && patientPhone) {
      notificationResult = await sendSMS(patientPhone, patientName, appointmentDate, appointmentTime, appointmentType);
    } else if (channel === 'whatsapp' && patientPhone) {
      notificationResult = await sendWhatsApp(patientPhone, patientName, appointmentDate, appointmentTime, appointmentType);
    } else if (channel === 'email' && patientEmail) {
      notificationResult = await sendEmail(patientEmail, patientName, appointmentDate, appointmentTime, appointmentType);
    } else {
      throw new Error(`Missing contact information for ${channel} notification`);
    }

    // Update reminder count and timestamp
    const { data: currentReminder, error: fetchError } = await supabase
      .from('reminders')
      .select('reminder_count')
      .eq('id', appointmentId)
      .single();

    if (fetchError) {
      console.error('Error fetching current reminder:', fetchError);
      throw fetchError;
    }

    const { error: updateError } = await supabase
      .from('reminders')
      .update({
        last_reminder_sent: new Date().toISOString(),
        reminder_count: (currentReminder?.reminder_count || 0) + 1
      })
      .eq('id', appointmentId);

    if (updateError) {
      console.error('Error updating reminder:', updateError);
      throw updateError;
    }

    // Log the notification
    await supabase
      .from('logs')
      .insert({
        action: `reminder_sent_${channel}`,
        details: `${channel.toUpperCase()} reminder sent to ${patientName} for appointment on ${appointmentDate} at ${appointmentTime}`,
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        channel,
        notificationResult 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );

  } catch (error: any) {
    console.error('Error in send-notification function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false 
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

async function sendSMS(phone: string, patientName: string, date: string, time: string, type: string) {
  const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const fromNumber = Deno.env.get('TWILIO_PHONE_NUMBER');

  if (!accountSid || !authToken || !fromNumber) {
    throw new Error('Twilio credentials not configured');
  }

  const message = `Hi ${patientName}, this is a reminder for your ${type} appointment on ${date} at ${time}. Please confirm your attendance. Reply STOP to opt out.`;

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      To: phone,
      From: fromNumber,
      Body: message,
    }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(`Twilio SMS error: ${result.message}`);
  }

  return result;
}

async function sendWhatsApp(phone: string, patientName: string, date: string, time: string, type: string) {
  const accountSid = Deno.env.get('TWILIO_ACCOUNT_SID');
  const authToken = Deno.env.get('TWILIO_AUTH_TOKEN');
  const fromWhatsApp = Deno.env.get('TWILIO_WHATSAPP_NUMBER');

  if (!accountSid || !authToken || !fromWhatsApp) {
    throw new Error('Twilio WhatsApp credentials not configured');
  }

  const message = `Hi ${patientName}, this is a reminder for your ${type} appointment on ${date} at ${time}. Please confirm your attendance.`;

  const response = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${btoa(`${accountSid}:${authToken}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      To: `whatsapp:${phone}`,
      From: `whatsapp:${fromWhatsApp}`,
      Body: message,
    }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(`Twilio WhatsApp error: ${result.message}`);
  }

  return result;
}

async function sendEmail(email: string, patientName: string, date: string, time: string, type: string) {
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    throw new Error('Resend API key not configured');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'CarePlus <onboarding@resend.dev>',
      to: [email],
      subject: `Appointment Reminder - ${type}`,
      html: `
        <h2>Appointment Reminder</h2>
        <p>Dear ${patientName},</p>
        <p>This is a friendly reminder about your upcoming appointment:</p>
        <ul>
          <li><strong>Type:</strong> ${type}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
        </ul>
        <p>Please make sure to arrive 15 minutes early for your appointment.</p>
        <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
        <p>Best regards,<br>CarePlus Team</p>
      `,
    }),
  });

  const result = await response.json();
  
  if (!response.ok) {
    throw new Error(`Resend email error: ${result.message || 'Unknown error'}`);
  }

  return result;
}

serve(handler);
