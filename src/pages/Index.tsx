
import { useState } from 'react';
import { Calendar, Bell, Users, BarChart3, Plus, Clock, MessageSquare, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardStats from '@/components/DashboardStats';
import AppointmentsList from '@/components/AppointmentsList';
import AddAppointmentModal from '@/components/AddAppointmentModal';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAddAppointment = async (appointmentData: any) => {
    setIsLoading(true);
    console.log('New appointment:', appointmentData);
    
    try {
      // Insert the new appointment into the reminders table
      const { error } = await supabase
        .from('reminders')
        .insert({
          patient_name: appointmentData.patientName,
          patient_phone: appointmentData.phone,
          patient_email: appointmentData.email,
          appointment_date: appointmentData.date,
          appointment_time: appointmentData.time,
          appointment_type: appointmentData.type || 'Follow-up Consultation',
          status: 'scheduled'
        });

      if (error) {
        console.error('Error creating appointment:', error);
        toast({
          title: "Error",
          description: "Failed to schedule appointment. Please try again.",
          variant: "destructive",
        });
        return;
      }

      // Log the appointment creation
      await supabase
        .from('logs')
        .insert({
          action: 'appointment_created',
          details: `New appointment scheduled for ${appointmentData.patientName}`,
        });

      toast({
        title: "Appointment Scheduled",
        description: "Patient will receive reminder notifications as configured.",
      });
      
      setIsAddModalOpen(false);
    } catch (error) {
      console.error('Unexpected error:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light/10 via-white to-medical-accent/10">
      {/* Mobile-optimized Header */}
      <header className="medical-card-bg border-b border-medical-blue-light/20 sticky top-0 z-50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 medical-gradient rounded-lg flex items-center justify-center shadow-lg animate-scale-in">
                <Bell className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold medical-text-primary">
                  HealthVibe
                </h1>
                <p className="text-xs sm:text-sm medical-text-secondary hidden sm:block">Smart Patient Follow-up System</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="medical-gradient hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover-scale text-xs sm:text-sm px-3 sm:px-4 py-2"
              disabled={isLoading}
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
        {/* Welcome Section - Mobile optimized */}
        <div className="mb-6 sm:mb-8 text-center animate-fade-in">
          <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Welcome to the Future of 
            <span className="medical-text-primary block sm:inline"> Patient Care</span>
          </h2>
          <p className="text-sm sm:text-lg medical-text-secondary max-w-2xl mx-auto px-2">
            Never miss a follow-up again. Our AI-powered reminder system ensures your patients stay connected 
            with automated SMS, WhatsApp, and email notifications.
          </p>
        </div>

        {/* Stats Dashboard */}
        <DashboardStats />

        {/* Main Dashboard Grid - Mobile responsive */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-8 mt-6 sm:mt-8">
          {/* Appointments List */}
          <div className="xl:col-span-2 order-2 xl:order-1">
            <AppointmentsList />
          </div>

          {/* Quick Actions & Insights - Mobile first */}
          <div className="space-y-4 sm:space-y-6 order-1 xl:order-2">
            {/* Notification Channels */}
            <Card className="shadow-lg border-0 medical-card-bg animate-slide-in-right">
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-medical-blue" />
                  Notification Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                <div className="flex items-center justify-between group hover:bg-medical-blue-light/5 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-medical-green" />
                    <span className="text-xs sm:text-sm">SMS Messages</span>
                  </div>
                  <Badge variant="secondary" className="bg-medical-green-light/20 text-medical-green border-medical-green/20 text-xs animate-scale-in">Active</Badge>
                </div>
                <div className="flex items-center justify-between group hover:bg-medical-green-light/5 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4 text-medical-green" />
                    <span className="text-xs sm:text-sm">WhatsApp</span>
                  </div>
                  <Badge variant="secondary" className="bg-medical-green-light/20 text-medical-green border-medical-green/20 text-xs animate-scale-in">Active</Badge>
                </div>
                <div className="flex items-center justify-between group hover:bg-medical-accent/5 p-2 rounded-lg transition-colors">
                  <div className="flex items-center gap-2">
                    <Bell className="w-3 h-3 sm:w-4 sm:h-4 text-medical-blue" />
                    <span className="text-xs sm:text-sm">Email</span>
                  </div>
                  <Badge variant="secondary" className="bg-medical-blue-light/20 text-medical-blue border-medical-blue/20 text-xs animate-scale-in">Active</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Completion Rate */}
            <Card className="shadow-lg border-0 medical-card-bg animate-slide-in-right" style={{ animationDelay: '0.1s' }}>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-medical-accent" />
                  This Month's Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 sm:space-y-4 pt-0">
                <div className="group">
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span>Appointment Completion</span>
                    <span className="font-semibold medical-text-primary">85%</span>
                  </div>
                  <Progress value={85} className="h-2 transition-all duration-500 hover:h-3" />
                </div>
                <div className="group">
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span>Response Rate</span>
                    <span className="font-semibold medical-text-primary">92%</span>
                  </div>
                  <Progress value={92} className="h-2 transition-all duration-500 hover:h-3" />
                </div>
                <div className="group">
                  <div className="flex justify-between text-xs sm:text-sm mb-2">
                    <span>Follow-up Success</span>
                    <span className="font-semibold medical-text-primary">78%</span>
                  </div>
                  <Progress value={78} className="h-2 transition-all duration-500 hover:h-3" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-lg border-0 medical-gradient-subtle animate-slide-in-right" style={{ animationDelay: '0.2s' }}>
              <CardHeader className="pb-3 sm:pb-6">
                <CardTitle className="text-base sm:text-lg medical-text-primary">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 sm:space-y-3 text-xs sm:text-sm medical-text-secondary pt-0">
                <p className="flex items-start gap-2 hover:medical-text-primary transition-colors">
                  <span className="mt-1">•</span>
                  <span>Send reminders 24-48 hours before appointments for best results</span>
                </p>
                <p className="flex items-start gap-2 hover:medical-text-primary transition-colors">
                  <span className="mt-1">•</span>
                  <span>Use personalized messages to improve patient engagement</span>
                </p>
                <p className="flex items-start gap-2 hover:medical-text-primary transition-colors">
                  <span className="mt-1">•</span>
                  <span>Follow up within 2 hours if a patient misses their appointment</span>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Add Appointment Modal */}
      <AddAppointmentModal 
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddAppointment}
      />
    </div>
  );
};

export default Index;
