
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
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'missed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
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
    <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-500" />
          Upcoming Appointments
        </CardTitle>
        <CardDescription>
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
                className="flex items-center justify-between p-4 rounded-lg border bg-white/50 hover:bg-white/80 transition-all duration-200"
              >
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500">
                    <AvatarFallback className="text-white font-semibold">
                      {appointment.patient.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
                    <p className="text-sm text-gray-600">{appointment.type}</p>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Calendar className="w-3 h-3" />
                        {date}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
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
                      className="h-8 w-8 p-0"
                    >
                      <Phone className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(appointment.patient, 'whatsapp')}
                      className="h-8 w-8 p-0"
                    >
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => sendReminder(appointment.patient, 'email')}
                      className="h-8 w-8 p-0"
                    >
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                      <DropdownMenuItem>Edit Appointment</DropdownMenuItem>
                      <DropdownMenuItem>View Patient History</DropdownMenuItem>
                      <DropdownMenuItem>Reschedule</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Cancel</DropdownMenuItem>
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
