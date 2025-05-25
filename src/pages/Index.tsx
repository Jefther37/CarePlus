
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  HealthVibe Reminders
                </h1>
                <p className="text-sm text-gray-600">Smart Patient Follow-up System</p>
              </div>
            </div>
            <Button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to the Future of 
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent"> Patient Care</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-500" />
                  Notification Channels
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-green-500" />
                    <span className="text-sm">SMS Messages</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-500" />
                    <span className="text-sm">WhatsApp</span>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Email</span>
                  </div>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">Active</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Completion Rate */}
            <Card className="shadow-lg border-0 bg-white/70 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-purple-500" />
                  This Month's Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Appointment Completion</span>
                    <span className="font-semibold">85%</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Response Rate</span>
                    <span className="font-semibold">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Follow-up Success</span>
                    <span className="font-semibold">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Tips */}
            <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-green-50">
              <CardHeader>
                <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
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
