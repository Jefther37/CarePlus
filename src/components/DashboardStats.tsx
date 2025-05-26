
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useDashboardStats } from '@/hooks/useDashboardStats';

const DashboardStats = () => {
  const { data: stats, isLoading, error } = useDashboardStats();

  const statsData = [
    {
      title: "Today's Appointments",
      value: stats?.todayAppointments?.toString() || "0",
      change: "+3 from yesterday",
      icon: Calendar,
      color: "text-medical-blue",
      bgColor: "bg-medical-blue-light/10 border-medical-blue/20",
      delay: "0ms"
    },
    {
      title: "Active Patients",
      value: stats?.activePatients?.toString() || "0",
      change: "+12 this week",
      icon: Users,
      color: "text-medical-green",
      bgColor: "bg-medical-green-light/10 border-medical-green/20",
      delay: "100ms"
    },
    {
      title: "Pending Reminders",
      value: stats?.pendingReminders?.toString() || "0",
      change: "Next in 2 hours",
      icon: Clock,
      color: "text-medical-accent",
      bgColor: "bg-medical-accent/10 border-medical-accent/20",
      delay: "200ms"
    },
    {
      title: "Completion Rate",
      value: `${stats?.completionRate || 0}%`,
      change: "+5% from last month",
      icon: CheckCircle,
      color: "text-medical-blue-dark",
      bgColor: "bg-medical-blue-dark/10 border-medical-blue-dark/20",
      delay: "300ms"
    }
  ];

  if (error) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        <Card className="shadow-lg border medical-card-bg">
          <CardContent className="p-4 sm:p-6 text-center">
            <p className="text-destructive text-sm">Error loading stats</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
        {statsData.map((_, index) => (
          <Card key={index} className="shadow-lg border medical-card-bg">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Skeleton className="h-3 sm:h-4 w-24 sm:w-32 mb-2" />
                  <Skeleton className="h-6 sm:h-8 w-12 sm:w-16 mb-2" />
                  <Skeleton className="h-2 sm:h-3 w-20 sm:w-28" />
                </div>
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 animate-fade-in">
      {statsData.map((stat, index) => (
        <Card 
          key={index} 
          className={`shadow-lg border medical-card-bg hover:shadow-xl transition-all duration-300 hover-scale group cursor-pointer ${stat.bgColor} animate-scale-in`}
          style={{ animationDelay: stat.delay }}
        >
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium medical-text-secondary mb-1 truncate group-hover:medical-text-primary transition-colors">
                  {stat.title}
                </p>
                <p className="text-2xl sm:text-3xl font-bold text-foreground mb-1 group-hover:scale-105 transition-transform">
                  {stat.value}
                </p>
                <p className="text-xs medical-text-secondary truncate">
                  {stat.change}
                </p>
              </div>
              <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${stat.bgColor} group-hover:scale-110 transition-transform`}>
                <stat.icon className={`w-5 h-5 sm:w-6 sm:h-6 ${stat.color} group-hover:animate-pulse`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
