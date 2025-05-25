
import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface AddAppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const AddAppointmentModal = ({ isOpen, onClose, onSubmit }: AddAppointmentModalProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: '',
    notes: '',
    reminderChannels: {
      sms: true,
      whatsapp: true,
      email: true
    },
    reminderTiming: '24' // hours before
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // Reset form
    setFormData({
      patientName: '',
      phone: '',
      email: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentType: '',
      notes: '',
      reminderChannels: {
        sms: true,
        whatsapp: true,
        email: true
      },
      reminderTiming: '24'
    });
  };

  const updateReminderChannel = (channel: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      reminderChannels: {
        ...prev.reminderChannels,
        [channel]: checked
      }
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Schedule New Appointment
          </DialogTitle>
          <DialogDescription>
            Add a new patient appointment with automated reminder settings
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientName" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Patient Name
                </Label>
                <Input
                  id="patientName"
                  value={formData.patientName}
                  onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                  placeholder="Enter patient's full name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 (555) 123-4567"
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="patient@example.com"
                required
              />
            </div>
          </div>

          {/* Appointment Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Appointment Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="appointmentDate" className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Date
                </Label>
                <Input
                  id="appointmentDate"
                  type="date"
                  value={formData.appointmentDate}
                  onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="appointmentTime" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Time
                </Label>
                <Input
                  id="appointmentTime"
                  type="time"
                  value={formData.appointmentTime}
                  onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appointmentType">Appointment Type</Label>
              <Select value={formData.appointmentType} onValueChange={(value) => setFormData({...formData, appointmentType: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Select appointment type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">General Consultation</SelectItem>
                  <SelectItem value="follow-up">Follow-up Consultation</SelectItem>
                  <SelectItem value="lab-results">Lab Results Review</SelectItem>
                  <SelectItem value="medication-review">Medication Review</SelectItem>
                  <SelectItem value="physical-therapy">Physical Therapy</SelectItem>
                  <SelectItem value="specialist-referral">Specialist Referral</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => setFormData({...formData, notes: e.target.value})}
                placeholder="Additional notes about the appointment..."
                rows={3}
              />
            </div>
          </div>

          {/* Reminder Settings */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Reminder Settings</h3>
            
            <div className="space-y-3">
              <Label>Notification Channels</Label>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sms"
                    checked={formData.reminderChannels.sms}
                    onCheckedChange={(checked) => updateReminderChannel('sms', checked as boolean)}
                  />
                  <Label htmlFor="sms" className="flex items-center gap-2 cursor-pointer">
                    <Phone className="w-4 h-4 text-green-500" />
                    SMS
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="whatsapp"
                    checked={formData.reminderChannels.whatsapp}
                    onCheckedChange={(checked) => updateReminderChannel('whatsapp', checked as boolean)}
                  />
                  <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    WhatsApp
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="email"
                    checked={formData.reminderChannels.email}
                    onCheckedChange={(checked) => updateReminderChannel('email', checked as boolean)}
                  />
                  <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer">
                    <Mail className="w-4 h-4 text-blue-500" />
                    Email
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="reminderTiming">Reminder Timing</Label>
              <Select value={formData.reminderTiming} onValueChange={(value) => setFormData({...formData, reminderTiming: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 hours before</SelectItem>
                  <SelectItem value="24">24 hours before</SelectItem>
                  <SelectItem value="48">48 hours before</SelectItem>
                  <SelectItem value="72">3 days before</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white"
            >
              Schedule Appointment
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointmentModal;
