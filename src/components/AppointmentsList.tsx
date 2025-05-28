
import { Calendar } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useAppointments } from '@/hooks/useAppointments';
import AppointmentCard from './appointments/AppointmentCard';

const AppointmentsList = () => {
  const { data: appointments, isLoading, error } = useAppointments();

  if (error) {
    return (
      <Card className="shadow-lg border-0 medical-card-bg">
        <CardContent className="p-6 text-center">
          <p className="text-destructive">Error loading appointments: {error.message}</p>
        </CardContent>
      </Card>
    );
  }

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
        {!appointments || appointments.length === 0 ? (
          <div className="text-center py-8">
            <p className="medical-text-secondary">No appointments found</p>
          </div>
        ) : (
          <div className="space-y-3 sm:space-y-4">
            {appointments.map((appointment, index) => (
              <AppointmentCard 
                key={appointment.id}
                appointment={appointment}
                index={index}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentsList;
