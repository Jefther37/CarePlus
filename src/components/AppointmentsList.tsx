
import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';

const AppointmentsList = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [sendingReminder, setSendingReminder] = useState<string | null>(null);
  
  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const appointments = [
    {
      id: 1,
      patient: "Sarah Johnson",
      phone: "+1 234-567-8901",
      email: "sarah.j@email.com",
      appointment: "2024-05-26T10:00:00",
      type: "Follow-up Consultation",
      status: "confirmed",
      remindersSent: 2,
      lastReminder: "2024-05-25T08:00:00"
    },
    {
      id: 2,
      patient: "Michael Chen",
      phone: "+1 234-567-8902",
      email: "m.chen@email.com",
      appointment: "2024-05-26T14:30:00",
      type: "Blood Test Results",
      status: "pending",
      remindersSent: 1,
      lastReminder: "2024-05-24T15:00:00"
    },
    {
      id: 3,
      patient: "Emma Davis",
      phone: "+1 234-567-8903",
      email: "emma.davis@email.com",
      appointment: "2024-05-27T09:15:00",
      type: "Medication Review",
      status: "confirmed",
      remindersSent: 0,
      lastReminder: null
    },
    {
      id: 4,
      patient: "James Wilson",
      phone: "+1 234-567-8904",
      email: "j.wilson@email.com",
      appointment: "2024-05-27T16:00:00",
      type: "Physical Therapy",
      status: "missed",
      remindersSent: 3,
      lastReminder: "2024-05-26T07:00:00"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-medical-green-light/20 text-medical-green border-medical-green/20';
      case 'pending': return 'bg-medical-accent/20 text-medical-blue border-medical-accent/20';
      case 'missed': return 'bg-destructive/20 text-destructive border-destructive/20';
      default: return 'bg-medical-gray-light/20 text-medical-gray border-medical-gray/20';
    }
  };

  const sendReminder = async (patient: string, type: 'sms' | 'whatsapp' | 'email') => {
    const reminderId = `${patient}-${type}`;
    setSendingReminder(reminderId);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Reminder Sent",
      description: `${type.toUpperCase()} reminder sent to ${patient}`,
    });
    
    setSendingReminder(null);
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

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
        <div className="space-y-3 sm:space-y-4">
          {appointments.map((appointment, index) => {
            const { date, time } = formatDateTime(appointment.appointment);
            return (
              <div 
                key={appointment.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 rounded-lg border medical-card-bg hover:shadow-md transition-all duration-200 group animate-slide-in-right"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1 min-w-0">
                  <Avatar className="w-10 h-10 sm:w-12 sm:h-12 medical-gradient shadow-md group-hover:scale-105 transition-transform">
                    <AvatarFallback className="text-white font-semibold text-sm">
                      {appointment.patient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-foreground text-sm sm:text-base truncate group-hover:medical-text-primary transition-colors">
                      {appointment.patient}
                    </h4>
                    <p className="text-xs sm:text-sm medical-text-secondary truncate">{appointment.type}</p>
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
                    {appointment.status}
                  </Badge>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(appointment.patient, 'sms')}
                      disabled={sendingReminder === `${appointment.patient}-sms`}
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-blue/20 hover:bg-medical-blue-light/10 hover:scale-110 transition-all"
                    >
                      <Phone className="w-3 h-3 text-medical-blue" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(appointment.patient, 'whatsapp')}
                      disabled={sendingReminder === `${appointment.patient}-whatsapp`}
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-green/20 hover:bg-medical-green-light/10 hover:scale-110 transition-all hidden sm:flex"
                    >
                      <MessageSquare className="w-3 h-3 text-medical-green" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(appointment.patient, 'email')}
                      disabled={sendingReminder === `${appointment.patient}-email`}
                      className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-accent/20 hover:bg-medical-accent/10 hover:scale-110 transition-all hidden sm:flex"
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
                      <DropdownMenuItem className="text-xs sm:text-sm sm:hidden">Send WhatsApp</DropdownMenuItem>
                      <DropdownMenuItem className="text-xs sm:text-sm sm:hidden">Send Email</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive text-xs sm:text-sm">Cancel</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
