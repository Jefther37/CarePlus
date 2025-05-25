import { useState } from 'react';
import { Calendar, Clock, Phone, MessageSquare, Mail, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const AppointmentsList = () => {
  const { toast } = useToast();
  
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

  const sendReminder = (patient: string, type: 'sms' | 'whatsapp' | 'email') => {
    toast({
      title: "Reminder Sent",
      description: `${type.toUpperCase()} reminder sent to ${patient}`,
    });
  };

  const formatDateTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
  };

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
          {appointments.map((appointment) => {
            const { date, time } = formatDateTime(appointment.appointment);
            return (
              <div 
                key={appointment.id}
                className="flex items-center justify-between p-4 rounded-lg border medical-card-bg hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 medical-gradient shadow-md">
                    <AvatarFallback className="text-white font-semibold">
                      {appointment.patient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground">{appointment.patient}</h4>
                    <p className="text-sm medical-text-secondary">{appointment.type}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs medical-text-secondary">
                        <Calendar className="w-3 h-3" />
                        {date}
                      </div>
                      <div className="flex items-center gap-1 text-xs medical-text-secondary">
                        <Clock className="w-3 h-3" />
                        {time}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Badge className={getStatusColor(appointment.status)}>
                    {appointment.status}
                  </Badge>
                  
                  <div className="flex items-center space-x-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(appointment.patient, 'sms')}
                      className="h-8 w-8 p-0 border-medical-blue/20 hover:bg-medical-blue-light/10"
                    >
                      <Phone className="w-3 h-3 text-medical-blue" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(appointment.patient, 'whatsapp')}
                      className="h-8 w-8 p-0 border-medical-green/20 hover:bg-medical-green-light/10"
                    >
                      <MessageSquare className="w-3 h-3 text-medical-green" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(appointment.patient, 'email')}
                      className="h-8 w-8 p-0 border-medical-accent/20 hover:bg-medical-accent/10"
                    >
                      <Mail className="w-3 h-3 text-medical-accent" />
                    </Button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-medical-gray-light/10">
                        <MoreVertical className="h-4 w-4 medical-text-secondary" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="medical-card-bg">
                      <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                      <DropdownMenuItem>View Patient History</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
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
