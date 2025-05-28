
import { Phone, MessageSquare, Mail, MoreVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useSendReminder } from '@/hooks/useAppointments';
import type { Appointment } from '@/hooks/useAppointments';

interface AppointmentActionsProps {
  appointment: Appointment;
}

const AppointmentActions = ({ appointment }: AppointmentActionsProps) => {
  const sendReminderMutation = useSendReminder();
  const { toast } = useToast();

  const sendReminder = async (type: 'sms' | 'whatsapp' | 'email') => {
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

  return (
    <div className="flex items-center space-x-1">
      <Button
        size="sm"
        variant="outline"
        onClick={() => sendReminder('sms')}
        disabled={sendReminderMutation.isPending}
        className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-blue/20 hover:bg-medical-blue-light/10 hover:scale-110 transition-all"
        title="Send SMS reminder"
      >
        <Phone className="w-3 h-3 text-medical-blue" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => sendReminder('whatsapp')}
        disabled={sendReminderMutation.isPending}
        className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-green/20 hover:bg-medical-green-light/10 hover:scale-110 transition-all hidden sm:flex"
        title="Send WhatsApp reminder"
      >
        <MessageSquare className="w-3 h-3 text-medical-green" />
      </Button>
      <Button
        size="sm"
        variant="outline"
        onClick={() => sendReminder('email')}
        disabled={sendReminderMutation.isPending}
        className="h-7 w-7 sm:h-8 sm:w-8 p-0 border-medical-accent/20 hover:bg-medical-accent/10 hover:scale-110 transition-all hidden sm:flex"
        title="Send email reminder"
      >
        <Mail className="w-3 h-3 text-medical-accent" />
      </Button>

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
            onClick={() => sendReminder('whatsapp')}
          >
            Send WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="text-xs sm:text-sm sm:hidden"
            onClick={() => sendReminder('email')}
          >
            Send Email
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive text-xs sm:text-sm">Cancel</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default AppointmentActions;
