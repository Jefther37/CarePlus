
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
    mutationFn: async ({ appointmentId, channel }: { appointmentId: string; channel: string }) => {
      console.log(`Sending ${channel} reminder for appointment ${appointmentId}`);
      
      // Update reminder count and last sent timestamp
      const { error } = await supabase
        .from('reminders')
        .update({
          last_reminder_sent: new Date().toISOString(),
          reminder_count: supabase.sql`reminder_count + 1`
        })
        .eq('id', appointmentId);

      if (error) throw error;

      // Log the reminder action
      await supabase
        .from('logs')
        .insert({
          action: `reminder_sent_${channel}`,
          details: `Reminder sent via ${channel} for appointment ${appointmentId}`,
        });

      return { success: true };
    },
    onSuccess: (_, { channel }) => {
      toast({
        title: "Reminder Sent",
        description: `${channel.toUpperCase()} reminder sent successfully`,
      });
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
    onError: (error) => {
      console.error('Error sending reminder:', error);
      toast({
        title: "Error",
        description: "Failed to send reminder. Please try again.",
        variant: "destructive",
      });
    },
  });
};
