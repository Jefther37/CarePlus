
import { Calendar, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { getStatusColor, formatDateTime } from '@/utils/appointmentHelpers';
import AppointmentActions from './AppointmentActions';
import type { Appointment } from '@/hooks/useAppointments';

interface AppointmentCardProps {
  appointment: Appointment;
  index: number;
}

const AppointmentCard = ({ appointment, index }: AppointmentCardProps) => {
  const { date, time } = formatDateTime(appointment.appointment_date, appointment.appointment_time);

  return (
    <div 
      className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border medical-card-bg hover:shadow-md transition-all duration-200 group animate-slide-in-right"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
        <Avatar className="w-10 h-10 sm:w-12 sm:h-12 medical-gradient shadow-md group-hover:scale-105 transition-transform">
          <AvatarFallback className="text-white font-semibold text-sm">
            {appointment.patient_name?.split(' ').map(n => n[0]).join('') || 'P'}
          </AvatarFallback>
        </Avatar>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground text-sm sm:text-base truncate group-hover:medical-text-primary transition-colors">
            {appointment.patient_name || 'Unknown Patient'}
          </h4>
          <p className="text-xs sm:text-sm medical-text-secondary truncate">{appointment.appointment_type}</p>
          <div className="flex items-center gap-2 sm:gap-4 mt-1">
            <div className="flex items-center gap-1 text-xs medical-text-secondary">
              <Calendar className="w-3 h-3" />
              <span className="hidden sm:inline">{date}</span>
              <span className="sm:hidden">{date.split('/').slice(0,2).join('/')}</span>
            </div>
            <div className="flex items-center gap-1 text-xs medical-text-secondary">
              <Clock className="w-3 h-3" />
              {time}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-3 mt-3 sm:mt-0">
        <Badge className={`${getStatusColor(appointment.status)} text-xs animate-scale-in`}>
          {appointment.status || 'scheduled'}
        </Badge>
        
        <AppointmentActions appointment={appointment} />
      </div>
    </div>
  );
};

export default AppointmentCard;
