
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Appointment {
  id: string;
  patient_name: string;
  patient_phone: string;
  patient_email: string;
  appointment_date: string;
  appointment_time: string;
  appointment_type: string;
  status: string;
  reminder_count: number;
  last_reminder_sent: string | null;
  created_at: string;
}

export const useAppointments = () => {
  return useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      console.log('Fetching appointments from Supabase...');
      const { data, error } = await supabase
        .from('appointments_view')
        .select('*')
        .order('appointment_date', { ascending: true });

      if (error) {
        console.error('Error fetching appointments:', error);
        throw error;
      }

      console.log('Fetched appointments:', data);
      return data as Appointment[];
    },
  });
};

export const useSendReminder = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ appointmentId, channel, appointment }: { 
      appointmentId: string; 
      channel: 'sms' | 'whatsapp' | 'email';
      appointment: Appointment;
    }) => {
      console.log(`Sending ${channel} reminder for appointment ${appointmentId}`);
      
      const { data, error } = await supabase.functions.invoke('send-notification', {
        body: {
          appointmentId,
          channel,
          patientName: appointment.patient_name,
          patientPhone: appointment.patient_phone,
          patientEmail: appointment.patient_email,
          appointmentDate: appointment.appointment_date,
          appointmentTime: appointment.appointment_time,
          appointmentType: appointment.appointment_type,
        },
      });

      if (error) {
        console.error('Error calling notification function:', error);
        throw error;
      }

      if (!data.success) {
        throw new Error(data.error || 'Failed to send notification');
      }

      return data;
    },
    onSuccess: (_, { channel }) => {
      toast({
        title: "Reminder Sent",
        description: `${channel.toUpperCase()} reminder sent successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (error: any) => {
      console.error('Error sending reminder:', error);
      
      let errorMessage = "Failed to send reminder. Please try again.";
      
      if (error.message?.includes('credentials not configured')) {
        errorMessage = "Notification service not configured. Please contact support.";
      } else if (error.message?.includes('Missing contact information')) {
        errorMessage = "Missing contact information for this notification type.";
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
};
