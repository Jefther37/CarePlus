
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
  const { toast } = useToast();

  const handleAddAppointment = (appointmentData: any) => {
    console.log('New appointment:', appointmentData);
    toast({
      title: "Appointment Scheduled",
      description: "Patient will receive reminder notifications as configured.",
    });
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-blue-light/10 via-white to-medical-accent/10">
      {/* Header */}
      <header className="medical-card-bg border-b border-medical-blue-light/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 medical-gradient rounded-lg flex items-center justify-center shadow-lg">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold medical-text-primary">
                  HealthVibe Reminders
                </h1>
                <p className="text-sm medical-text-secondary">Smart Patient Follow-up System</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="medical-gradient hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Plus className="w-4 h-4 mr-2" />
              Schedule Appointment
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 text-center animate-fade-in">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Welcome to the Future of 
            <span className="medical-text-primary"> Patient Care</span>
          </h2>
          <p className="text-lg medical-text-secondary max-w-2xl mx-auto">
            Never miss a follow-up again. Our AI-powered reminder system ensures your patients stay connected 
            with automated SMS, WhatsApp, and email notifications.
          </p>
        </div>

        {/* Stats Dashboard */}
        <DashboardStats />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Appointments List */}
          <div className="lg:col-span-2">
            <AppointmentsList />
          </div>

          {/* Quick Actions & Insights */}
          <div className="space-y-6">
            {/* Notification Channels */}
            <Card className="shadow-lg border-0 medical-card-bg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-medical-blue" />
                  Notification Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-medical-green" />
                    <span className="text-sm">SMS Messages</span>
                  </div>
                  <Badge variant="secondary" className="bg-medical-green-light/20 text-medical-green border-medical-green/20">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-medical-green" />
                    <span className="text-sm">WhatsApp</span>
                  </div>
                  <Badge variant="secondary" className="bg-medical-green-light/20 text-medical-green border-medical-green/20">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-medical-blue" />
                    <span className="text-sm">Email</span>
                  </div>
                  <Badge variant="secondary" className="bg-medical-blue-light/20 text-medical-blue border-medical-blue/20">Active</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Completion Rate */}
            <Card className="shadow-lg border-0 medical-card-bg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-medical-accent" />
                  This Month's Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Appointment Completion</span>
                    <span className="font-semibold medical-text-primary">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Response Rate</span>
                    <span className="font-semibold medical-text-primary">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Follow-up Success</span>
                    <span className="font-semibold medical-text-primary">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-lg border-0 medical-gradient-subtle">
              <CardHeader>
                <CardTitle className="text-lg medical-text-primary">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm medical-text-secondary">
                <p>• Send reminders 24-48 hours before appointments for best results</p>
                <p>• Use personalized messages to improve patient engagement</p>
                <p>• Follow up within 2 hours if a patient misses their appointment</p>
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
