
import { Calendar, Clock, Phone, MessageSquare, Mail, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAppointments, useSendReminder } from '@/hooks/useAppointments';

const AppointmentsList = () => {
  const { data: appointments, isLoading, error } = useAppointments();
  const sendReminderMutation = useSendReminder();

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'bg-medical-green-light/20 text-medical-green border-medical-green/20';
      case 'pending': return 'bg-medical-accent/20 text-medical-blue border-medical-accent/20';
      case 'missed': return 'bg-destructive/20 text-destructive border-destructive/20';
      case 'scheduled': return 'bg-medical-blue-light/20 text-medical-blue border-medical-blue/20';
      default: return 'bg-medical-gray-light/20 text-medical-gray border-medical-gray/20';
    }
  };

  const sendReminder = async (appointment: any, type: 'sms' | 'whatsapp' | 'email') => {
    console.log(`Sending ${type} reminder to ${appointment.patient_name} for appointment ${appointment.id}`);
    
    // Validate contact information
    if (type === 'sms' || type === 'whatsapp') {
      if (!appointment.patient_phone) {
        toast({
          title: "Missing Information",
          description: `No phone number available for ${appointment.patient_name}`,
          variant: "destructive",
        });
        return;
      }
    } else if (type === 'email') {
      if (!appointment.patient_email) {
        toast({
          title: "Missing Information", 
          description: `No email address available for ${appointment.patient_name}`,
          variant: "destructive",
        });
        return;
      }
    }

    sendReminderMutation.mutate({ 
      appointmentId: appointment.id, 
      channel: type,
      appointment: appointment
    });
  };

  const formatDateTime = (dateStr: string, timeStr: string) => {
    const date = new Date(dateStr);
    const time = timeStr ? timeStr.slice(0, 5) : '00:00'; // Format time as HH:MM
    return {
      date: date.toLocaleDateString(),
      time: time
    };
  };

  if (error) {
    return (
      <Card className="shadow-lg border-0 medical-card-bg">
        <CardContent className="p-6 text-center">
          <p className="text-destructive">Error loading appointments: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

  if (isLoading) {
    return (
      <Card className="shadow-lg border-0 medical-card-bg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-medical-blue" />
            Upcoming Appointments
          </CardTitle>
          <CardDescription className="medical-text-secondary">
            Manage patient appointments and automated reminders
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex items-center justify-between p-3 sm:p-4 rounded-lg border medical-card-bg">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                  <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-full" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-4 w-24 sm:w-32 mb-2" />
                    <Skeleton className="h-3 w-16 sm:w-20 mb-2" />
                    <div className="flex gap-2 sm:gap-4">
                      <Skeleton className="h-3 w-12 sm:w-16" />
                      <Skeleton className="h-3 w-12 sm:w-16" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <Skeleton className="h-6 w-16 sm:w-20 rounded-full" />
                  <div className="hidden sm:flex items-center space-x-1">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                  <Skeleton className="h-8 w-8 rounded" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 medical-card-bg animate-fade-in">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Calendar className="w-5 h-5 text-medical-blue" />
          Upcoming Appointments
        </CardTitle>
        <CardDescription className="medical-text-secondary text-sm">
          Manage patient appointments and automated reminders
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        {!appointments || appointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="medical-text-secondary">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {appointments.map((appointment, index) => {
              const { date, time } = formatDateTime(appointment.appointment_date, appointment.appointment_time);
              return (
                <div 
                  key={appointment.id}
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
                    
                    <div className="flex items-center space-x-1">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendReminder(appointment, 'sms')}
                        disabled={sendReminderMutation.isPending}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-blue/20 hover:bg-medical-blue-light/10 hover:scale-110 transition-all"
                        title="Send SMS reminder"
                      >
                        <Phone className="w-3 h-3 text-medical-blue" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendReminder(appointment, 'whatsapp')}
                        disabled={sendReminderMutation.isPending}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-green/20 hover:bg-medical-green-light/10 hover:scale-110 transition-all hidden sm:flex"
                        title="Send WhatsApp reminder"
                      >
                        <MessageSquare className="w-3 h-3 text-medical-green" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => sendReminder(appointment, 'email')}
                        disabled={sendReminderMutation.isPending}
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-accent/20 hover:bg-medical-accent/10 hover:scale-110 transition-all hidden sm:flex"
                        title="Send email reminder"
                      >
                        <Mail className="w-3 h-3 text-medical-accent" />
                      </Button>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-7 w-7 sm:h-8 sm:w-8 p-0 hover:bg-medical-gray-light/10 hover:scale-110 transition-all">
                          <MoreVertical className="h-3 w-3 sm:h-4 sm:w-4 medical-text-secondary" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="medical-card-bg animate-scale-in">
                        <DropdownMenuItem className="text-xs sm:text-sm">Edit Appointment</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs sm:text-sm">View Patient History</DropdownMenuItem>
                        <DropdownMenuItem className="text-xs sm:text-sm">Reschedule</DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-xs sm:text-sm sm:hidden"
                          onClick={() => sendReminder(appointment, 'whatsapp')}
                        >
                          Send WhatsApp
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          className="text-xs sm:text-sm sm:hidden"
                          onClick={() => sendReminder(appointment, 'email')}
                        >
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive text-xs sm:text-sm">Cancel</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
