
import { useState } from 'react';
import { Calendar, Clock, User, Phone, Mail, MessageSquare, Loader2 } from 'lucide-react';
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
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    reminderTiming: '24'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call with loading animation
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    onSubmit(formData);
    setIsSubmitting(false);
    setCurrentStep(1);
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

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedToStep2 = formData.patientName && formData.phone && formData.email;
  const canProceedToStep3 = formData.appointmentDate && formData.appointmentTime && formData.appointmentType;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden bg-white/95 backdrop-blur-md border-0 shadow-2xl">
        <div className="animate-fade-in">
          <DialogHeader className="pb-6">
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Calendar className="w-6 h-6 text-blue-500 animate-scale-in" />
              Schedule New Appointment
            </DialogTitle>
            <DialogDescription className="text-base">
              Add a new patient appointment with automated reminder settings
            </DialogDescription>
            
            {/* Progress Steps */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                      step === currentStep 
                        ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white scale-110 shadow-lg' 
                        : step < currentStep
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {step}
                    </div>
                    {step < 3 && (
                      <div className={`w-8 h-1 mx-2 transition-all duration-300 ${
                        step < currentStep ? 'bg-green-500' : 'bg-gray-200'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </DialogHeader>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[70vh] pr-2">
          {/* Step 1: Patient Information */}
          <div className={`space-y-4 transition-all duration-500 transform ${
            currentStep === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute'
          }`}>
            {currentStep === 1 && (
              <div className="animate-slide-in-right">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 group">
                    <Label htmlFor="patientName" className="flex items-center gap-2 transition-colors group-focus-within:text-blue-500">
                      <User className="w-4 h-4" />
                      Patient Name
                    </Label>
                    <Input
                      id="patientName"
                      value={formData.patientName}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      placeholder="Enter patient's full name"
                      className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <Label htmlFor="phone" className="flex items-center gap-2 transition-colors group-focus-within:text-blue-500">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                      className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2 group">
                  <Label htmlFor="email" className="flex items-center gap-2 transition-colors group-focus-within:text-blue-500">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="patient@example.com"
                    className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                    required
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 2: Appointment Details */}
          <div className={`space-y-4 transition-all duration-500 transform ${
            currentStep === 2 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'
          }`}>
            {currentStep === 2 && (
              <div className="animate-slide-in-right">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 group">
                    <Label htmlFor="appointmentDate" className="flex items-center gap-2 transition-colors group-focus-within:text-blue-500">
                      <Calendar className="w-4 h-4" />
                      Date
                    </Label>
                    <Input
                      id="appointmentDate"
                      type="date"
                      value={formData.appointmentDate}
                      onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                      className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2 group">
                    <Label htmlFor="appointmentTime" className="flex items-center gap-2 transition-colors group-focus-within:text-blue-500">
                      <Clock className="w-4 h-4" />
                      Time
                    </Label>
                    <Input
                      id="appointmentTime"
                      type="time"
                      value={formData.appointmentTime}
                      onChange={(e) => setFormData({...formData, appointmentTime: e.target.value})}
                      className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="appointmentType">Appointment Type</Label>
                  <Select value={formData.appointmentType} onValueChange={(value) => setFormData({...formData, appointmentType: value})}>
                    <SelectTrigger className="transition-all duration-200 hover:shadow-md">
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent className="animate-fade-in">
                      <SelectItem value="consultation">General Consultation</SelectItem>
                      <SelectItem value="follow-up">Follow-up Consultation</SelectItem>
                      <SelectItem value="lab-results">Lab Results Review</SelectItem>
                      <SelectItem value="medication-review">Medication Review</SelectItem>
                      <SelectItem value="physical-therapy">Physical Therapy</SelectItem>
                      <SelectItem value="specialist-referral">Specialist Referral</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2 group">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    placeholder="Additional notes about the appointment..."
                    rows={3}
                    className="transition-all duration-200 focus:scale-[1.02] focus:shadow-md resize-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Step 3: Reminder Settings */}
          <div className={`space-y-4 transition-all duration-500 transform ${
            currentStep === 3 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full absolute'
          }`}>
            {currentStep === 3 && (
              <div className="animate-slide-in-right">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Reminder Settings</h3>
                
                <div className="space-y-3">
                  <Label>Notification Channels</Label>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center space-x-2 group">
                      <Checkbox
                        id="sms"
                        checked={formData.reminderChannels.sms}
                        onCheckedChange={(checked) => updateReminderChannel('sms', checked as boolean)}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                      <Label htmlFor="sms" className="flex items-center gap-2 cursor-pointer transition-colors hover:text-green-600">
                        <Phone className="w-4 h-4 text-green-500" />
                        SMS
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 group">
                      <Checkbox
                        id="whatsapp"
                        checked={formData.reminderChannels.whatsapp}
                        onCheckedChange={(checked) => updateReminderChannel('whatsapp', checked as boolean)}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                      <Label htmlFor="whatsapp" className="flex items-center gap-2 cursor-pointer transition-colors hover:text-green-600">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        WhatsApp
                      </Label>
                    </div>
                    
                    <div className="flex items-center space-x-2 group">
                      <Checkbox
                        id="email"
                        checked={formData.reminderChannels.email}
                        onCheckedChange={(checked) => updateReminderChannel('email', checked as boolean)}
                        className="transition-transform duration-200 group-hover:scale-110"
                      />
                      <Label htmlFor="email" className="flex items-center gap-2 cursor-pointer transition-colors hover:text-blue-600">
                        <Mail className="w-4 h-4 text-blue-500" />
                        Email
                      </Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="reminderTiming">Reminder Timing</Label>
                  <Select value={formData.reminderTiming} onValueChange={(value) => setFormData({...formData, reminderTiming: value})}>
                    <SelectTrigger className="transition-all duration-200 hover:shadow-md">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="animate-fade-in">
                      <SelectItem value="2">2 hours before</SelectItem>
                      <SelectItem value="24">24 hours before</SelectItem>
                      <SelectItem value="48">48 hours before</SelectItem>
                      <SelectItem value="72">3 days before</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button 
              type="button" 
              variant="outline" 
              onClick={currentStep === 1 ? onClose : prevStep}
              className="transition-all duration-200 hover:scale-105 hover:shadow-md"
              disabled={isSubmitting}
            >
              {currentStep === 1 ? 'Cancel' : 'Previous'}
            </Button>
            
            {currentStep < 3 ? (
              <Button 
                type="button"
                onClick={nextStep}
                disabled={(currentStep === 1 && !canProceedToStep2) || (currentStep === 2 && !canProceedToStep3)}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                Next Step
              </Button>
            ) : (
              <Button 
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white transition-all duration-200 hover:scale-105 hover:shadow-lg disabled:opacity-50 min-w-[140px]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Scheduling...
                  </div>
                ) : (
                  'Schedule Appointment'
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAppointmentModal;
