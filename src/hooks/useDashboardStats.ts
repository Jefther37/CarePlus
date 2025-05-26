
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const useDashboardStats = () => {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      console.log('Fetching dashboard statistics...');
      
      // Get today's appointments
      const today = new Date().toISOString().split('T')[0];
      const { data: todayAppointments, error: todayError } = await supabase
        .from('reminders')
        .select('*')
        .eq('appointment_date', today);

      if (todayError) throw todayError;

      // Get total active patients
      const { data: patients, error: patientsError } = await supabase
        .from('patients')
        .select('id');

      if (patientsError) throw patientsError;

      // Get pending reminders (appointments without recent reminders)
      const { data: pendingReminders, error: pendingError } = await supabase
        .from('reminders')
        .select('*')
        .gte('appointment_date', today)
        .or('last_reminder_sent.is.null,last_reminder_sent.lt.' + new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString());

      if (pendingError) throw pendingError;

      // Calculate completion rate (confirmed vs total appointments this month)
      const firstDayOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0];
      const { data: monthlyAppointments, error: monthlyError } = await supabase
        .from('reminders')
        .select('status')
        .gte('appointment_date', firstDayOfMonth);

      if (monthlyError) throw monthlyError;

      const confirmedCount = monthlyAppointments?.filter(apt => apt.status === 'confirmed').length || 0;
      const totalCount = monthlyAppointments?.length || 1;
      const completionRate = Math.round((confirmedCount / totalCount) * 100);

      const stats = {
        todayAppointments: todayAppointments?.length || 0,
        activePatients: patients?.length || 0,
        pendingReminders: pendingReminders?.length || 0,
        completionRate: completionRate
      };

      console.log('Dashboard stats:', stats);
      return stats;
    },
  });
};
