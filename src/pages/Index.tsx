
import { useState } from 'react';
import { Bell, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import DashboardStats from '@/components/DashboardStats';
import AppointmentsList from '@/components/AppointmentsList';
import AddAppointmentModal from '@/components/AddAppointmentModal';
import WelcomeSection from '@/components/WelcomeSection';
import QuickActions from '@/components/QuickActions';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleScheduleClick = () => {
    console.log('Schedule appointment button clicked');
    setIsAddModalOpen(true);
  };

  const handleAddAppointment = async (appointmentData: any) => {
    setIsLoading(true);
    console.log('New appointment:', appointmentData);
    
    try {
      // Insert the new appointment into the reminders table with all required fields
      const { error } = await supabase
        .from('reminders')
        .insert({
          patient_name: appointmentData.patientName,
          patient_phone: appointmentData.phone,
          patient_email: appointmentData.email,
          appointment_date: appointmentData.appointmentDate,
          appointment_time: appointmentData.appointmentTime,
          appointment_type: appointmentData.appointmentType || 'Follow-up Consultation',
          status: 'scheduled',
          reminder_count: 0,
          last_reminder_sent: null
        });

      if (error) {
        console.error('Error creating appointment:', error);
        toast({
          title: "Error",
          description: "Failed to schedule appointment. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Log the appointment creation
      await supabase
        .from('logs')
        .insert({
          action: 'appointment_created',
          details: `New appointment scheduled for ${appointmentData.patientName}`
        });

      toast({
        title: "Appointment Scheduled",
        description: "Patient will receive reminder notifications as configured."
      });
      
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-medical-blue-light/10 via-white to-medical-accent/10 relative"
      style={{
        backgroundImage: `url('/lovable-uploads/ea0be46f-abbc-4b78-af96-c6ba7a0a5da3.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Background overlay for better content readability */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-sm"></div>
      
      {/* Content wrapper with relative positioning */}
      <div className="relative z-10">
        {/* Mobile-optimized Header */}
        <header className="medical-card-bg border-b border-medical-blue-light/20 sticky top-0 z-50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-3 sm:py-4">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 medical-gradient rounded-lg flex items-center justify-center shadow-lg animate-scale-in">
                  <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-lg sm:text-2xl font-bold medical-text-primary">CarePlus</h1>
                  <p className="text-xs sm:text-sm medical-text-secondary hidden sm:block">Smart Patient Follow-up System</p>
                </div>
              </div>
              <Button 
                onClick={handleScheduleClick}
                className="medical-gradient hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-scale text-xs sm:text-sm px-3 sm:px-4 py-2" 
                disabled={isLoading}
                type="button"
              >
                <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Schedule Appointment</span>
                <span className="sm:hidden">Schedule</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-4 sm:py-8">
          <WelcomeSection />
          <DashboardStats />

          {/* Main Dashboard Grid - Mobile responsive */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-8">
            {/* Appointments List */}
            <div className="xl:col-span-2 order-2 xl:order-1">
              <AppointmentsList />
            </div>

            {/* Quick Actions & Insights */}
            <QuickActions />
          </div>
        </main>
      </div>

      <AddAppointmentModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddAppointment}
        isLoading={isLoading}
      />
    </div>
  );
};

export default Index;
