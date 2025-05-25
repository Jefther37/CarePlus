
import { Calendar, Users, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const DashboardStats = () => {
  const stats = [
    {
      title: "Today's Appointments",
      value: "12",
      change: "+3 from yesterday",
      icon: Calendar,
      color: "text-medical-blue",
      bgColor: "bg-medical-blue-light/10 border-medical-blue/20"
    },
    {
      title: "Active Patients",
      value: "248",
      change: "+12 this week",
      icon: Users,
      color: "text-medical-green",
      bgColor: "bg-medical-green-light/10 border-medical-green/20"
    },
    {
      title: "Pending Reminders",
      value: "8",
      change: "Next in 2 hours",
      icon: Clock,
      color: "text-medical-accent",
      bgColor: "bg-medical-accent/10 border-medical-accent/20"
    },
    {
      title: "Completion Rate",
      value: "85%",
      change: "+5% from last month",
      icon: CheckCircle,
      color: "text-medical-blue-dark",
      bgColor: "bg-medical-blue-dark/10 border-medical-blue-dark/20"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className={`shadow-lg border medical-card-bg hover:shadow-xl transition-all duration-300 hover-scale ${stat.bgColor}`}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium medical-text-secondary mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                <p className="text-xs medical-text-secondary">{stat.change}</p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;
